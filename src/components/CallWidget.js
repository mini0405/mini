import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Phone, PhoneOff, MessageCircle, Mic, MicOff, X, Send } from 'lucide-react';
import './CallWidget.css';

const CallWidget = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Mute State
  const [isMuted, setIsMuted] = useState(false);

  // Refs
  const socketRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const userInfoRef = useRef({});
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    const gatherContext = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userInfoRef.current = {
          country: data.country_name,
          region: data.region_code,
          city: data.city,
          browser: getBrowserName(),
          os: getOS(),
          timestamp: Date.now()
        };
      } catch (e) {
        console.log('Could not fetch location');
        userInfoRef.current = { browser: getBrowserName(), os: getOS() };
      }
    };
    gatherContext();

    socketRef.current = io('https://socket.minentle.co.za');

    socketRef.current.on('connect', () => {
      socketRef.current.emit('check-status');
    });

    socketRef.current.on('status-change', (data) => {
       setIsOnline(data.isOnline);
       
       // 🆕 IF ADMIN DISCONNECTS WHILE CALLING -> STOP RECORDING
       if (!data.isOnline && callStatus === 'connected') {
           console.log("Admin disconnected remotely. Saving recording...");
           // This triggers the upload automatically via mediaRecorder.onstop
           if (mediaRecorderRef.current) mediaRecorderRef.current.stop(); 
           setCallStatus('idle');
           cleanup();
       }
    });

    socketRef.current.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, { sender: 'admin', text: msg.text }]);
      setShowChat(true);
    });

    // 5. LISTEN FOR UPLOAD URL
    socketRef.current.on('upload-url', async ({ url, fileName }) => {
      console.log('Uploading recording to:', fileName);
      const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
      
      try {
        await fetch(url, {
          method: 'PUT',
          body: blob,
          headers: { 'Content-Type': 'audio/webm' }
        });
        console.log('✅ Upload Complete!');
        recordedChunksRef.current = [];
      } catch (err) {
        console.error('Upload Failed:', err);
      }
    });

    socketRef.current.on('call-accepted', async ({ answer }) => {
      if (pcRef.current) {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        setCallStatus('connected');
        startRecording();
      }
    });

    socketRef.current.on('ice-candidate', async ({ candidate }) => {
      if (pcRef.current && candidate) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => cleanup();
  }, []);

  // --- Helper Functions for "RUM-like" Data ---
  const getBrowserName = () => {
    const agent = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf('chrome') > -1) return 'Chrome';
    if (agent.indexOf('safari') > -1) return 'Safari';
    if (agent.indexOf('firefox') > -1) return 'Firefox';
    return 'Web Browser';
  };
  const getOS = () => {
    if (window.navigator.userAgent.indexOf('Win') !== -1) return 'Windows';
    if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'MacOS/iOS';
    if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android';
    return 'Unknown OS';
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
        const audioTrack = localStreamRef.current.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
        }
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach(track => track.stop());
    if (pcRef.current) pcRef.current.close();
    if (socketRef.current) socketRef.current.disconnect();
    
    // Stop Recorder if running
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
    }
  };

  // 🎙️ RECORDING LOGIC
  const startRecording = () => {
    if (!localStreamRef.current || !remoteAudioRef.current.srcObject) return;

    // We need to mix the streams (My Voice + Remote Voice)
    const audioContext = new AudioContext();
    const dest = audioContext.createMediaStreamDestination();
    
    // Add Local Stream (My Mic)
    const localSource = audioContext.createMediaStreamSource(localStreamRef.current);
    localSource.connect(dest);

    // Add Remote Stream (Phone Audio)
    const remoteSource = audioContext.createMediaStreamSource(remoteAudioRef.current.srcObject);
    remoteSource.connect(dest);

    // Start Recorder on the "Mixed" Destination
    const mixedStream = dest.stream;
    mediaRecorderRef.current = new MediaRecorder(mixedStream);
    recordedChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    // When recording stops -> Ask Server for Upload Link
    mediaRecorderRef.current.onstop = () => {
       socketRef.current.emit('request-upload-url');
    };

    mediaRecorderRef.current.start();
    console.log('🔴 Recording Started');
  };

  const handleCall = async () => {
    if (callStatus !== 'idle') {
      // END CALL
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
      setCallStatus('idle');
      cleanup();
      socketRef.current.connect();
      return;
    }

    try {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        pcRef.current = new RTCPeerConnection({
          iceServers: [
            // 1. Google STUN (Low latency check)
            { urls: 'stun:stun.l.google.com:19302' },

            // 2. YOUR EC2 TURN SERVER (The engineered solution)
            {
              urls: "turn:13.246.203.12:3478", // <--- REPLACE 'YOUR_ELASTIC_IP'
              username: "minentle",
              credential: "minipassword123"
            }
          ],
          iceTransportPolicy: 'all', 
          bundlePolicy: 'max-bundle'
        });
        
        localStreamRef.current.getTracks().forEach(track => pcRef.current.addTrack(track, localStreamRef.current));

        pcRef.current.ontrack = (event) => {
            if (remoteAudioRef.current) remoteAudioRef.current.srcObject = event.streams[0];
        };

        pcRef.current.onicecandidate = (event) => {
            if (event.candidate) socketRef.current.emit('ice-candidate', { to: 'admin', candidate: event.candidate });
        };

        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        
        socketRef.current.emit('call-user', { offer, userInfo: userInfoRef.current });
        setCallStatus('calling');

    } catch(e) { console.error(e); alert('Mic Error'); }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const msg = { text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, msg]);
    socketRef.current.emit('chat-message', { to: 'admin', text: inputText });
    setInputText('');
  };

  return (
    <>
      <audio ref={remoteAudioRef} autoPlay />
      
      {/* CHAT WINDOW */}
      {showChat && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '450px',
          background: 'rgba(17, 18, 21, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Chat with Minentle</span>
            <button onClick={() => setShowChat(false)} style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              <X size={16} />
            </button>
          </div>
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '80%',
                fontSize: '14px',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                background: m.sender === 'user' ? 'linear-gradient(135deg, #f50, #fc9)' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff'
              }}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '12px'
          }}>
            <input 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px 16px',
                outline: 'none'
              }}
            />
            <button onClick={sendMessage} style={{
              background: 'linear-gradient(135deg, #f50, #fc9)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING CALL BUTTON */}
      <div className="floating-call-btn">
        <div className="cyber-btn">
          <div className="cyber-btn-border">
            <button
              className="cyber-btn-content"
              onClick={handleCall}
              disabled={!isOnline}
            >
              {callStatus === 'idle' ? (
                <><Phone size={20} style={{marginRight: '8px'}} /> Call Me</>
              ) : (
                <><PhoneOff size={20} style={{marginRight: '8px'}} /> End Call</>
              )}
            </button>
          </div>
          <div className="cyber-spin cyber-spin-blur"></div>
          <div className="cyber-spin cyber-spin-intense"></div>
        </div>
      </div>

      {/* FLOATING CONTROLS */}
      {callStatus === 'connected' && (
        <div className="widget-container">
          <div className="control-group">
            <button className="control-btn" onClick={() => setShowChat(!showChat)}>
              <MessageCircle size={20} />
            </button>
            <button className={`control-btn ${isMuted ? 'muted' : ''}`} onClick={toggleMute}>
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CallWidget;