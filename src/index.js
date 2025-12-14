import { AwsRum } from 'aws-rum-web';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


try {
  const config = {
    sessionSampleRate: 1 ,
    identityPoolId: "us-east-1:f096d922-29de-464c-938e-abbee6209349" ,
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com" ,
    telemetries: ["performance","errors","http"] ,
    allowCookies: true ,
    enableXRay: true ,
    signing: true // If you have a public resource policy and wish to send unsigned requests please set this to false
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
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);