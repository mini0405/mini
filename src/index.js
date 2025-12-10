import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AwsRum } from 'aws-rum-web';

try {
  const config = {
    sessionSampleRate: 1,
    identityPoolId: "us-east-1:f096d922-29de-464c-938e-abbee6209349",
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false, // Disable X-Ray for now
    signing: false, // Try unsigned requests first
    guestRoleArn: "arn:aws:iam::491085402488:role/RUM-Monitor-us-east-1-312812f0-680b-433d-9078-635695fda9af-unauth"
  };

  const APPLICATION_ID = '312812f0-680b-433d-9078-635695fda9af';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-1';

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
  
  console.log('CloudWatch RUM initialized successfully');
} catch (error) {
  console.error('CloudWatch RUM initialization failed:', error);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);