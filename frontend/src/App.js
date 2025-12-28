// import React from 'react';
// import AIScale from './components/AIScale.jsx';
// import './App.css';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from './firebase/firebaseConfig';

// // Function to add test data
// async function addTestData() {
//   console.log('🧪 Adding test data to Firebase...');
//   try {
//     const docRef = await addDoc(collection(db, 'quotas'), {
//       rationCardNumber: 'RC6574',
//       allocatedGrainKg: 2,
//       allocatedOilKg: 1
//     });
//     console.log('✅ Test data added with ID:', docRef.id);
//     alert('✅ Test data added successfully! Refresh the page now.');
//   } catch (error) {
//     console.error('❌ Failed to add data:', error);
//     alert('❌ Error: ' + error.message);
//   }
// }

// function App() {
//   const testRationCardNumber = 'RC6574';

//   return (
//     <div className="App">
//       <header style={{ 
//         background: '#2c3e50', 
//         color: 'white', 
//         padding: '20px', 
//         textAlign: 'center' 
//       }}>
//         <h1>🌾 Annapurna - Smart PDS System</h1>
//         <p>AI-Powered Ration Distribution</p>
//         <button 
//           onClick={addTestData}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             background: '#e74c3c',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: 'bold'
//           }}
//         >
//           🧪 Add Test Data to Firebase
//         </button>
//       </header>
      
//       <main>
//         <AIScale rationCardNumber={testRationCardNumber} />
//       </main>
      
//       <footer style={{ 
//         textAlign: 'center', 
//         padding: '20px', 
//         color: '#7f8c8d',
//         marginTop: '40px',
//         borderTop: '1px solid #ecf0f1'
//       }}>
//         <p>🤖 Member 3: AI Weighing & Transaction Logging Module</p>
//         <p style={{ fontSize: '12px', marginTop: '10px' }}>
//           Hackathon Project - Annapurna Team
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default App;
import React, { useRef, useState } from 'react';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const testCamera = async () => {
    console.log('🎥 Starting camera...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('✅ Camera stream obtained!');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStarted(true);
      }
    } catch (error) {
      console.error('❌ Camera error:', error);
      alert('Camera failed: ' + error.message);
    }
  };

  const captureImage = () => {
    console.log('📸 CAPTURE: Button clicked!');
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) {
      console.error('❌ Canvas or video not ready');
      return;
    }
    
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('✅ CAPTURE: Image captured! Length:', imageData.length);
    
    setCapturedImage(imageData);
  };

  const analyzeWithAI = async () => {
    console.log('🤖 AI: Starting analysis...');
    
    if (!capturedImage) {
      alert('❌ No image captured!');
      return;
    }

    setIsAnalyzing(true);
    setAiResult(null);

    try {
      // Extract base64 (remove "data:image/jpeg;base64," prefix)
      const base64Image = capturedImage.split(',')[1];
      console.log('✂️ AI: Base64 extracted, length:', base64Image.length);

      console.log('📡 AI: Sending to backend...');
      const response = await fetch('http://localhost:5000/api/analyze-weight', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          image: base64Image,
          allocatedQuota: 2  // Testing with 2 kg
        })
      });

      console.log('📥 AI: Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ AI: Backend error:', errorData);
        throw new Error(errorData.message || 'Backend failed');
      }

      const result = await response.json();
      console.log('✅ AI: Result received:', result);
      
      setAiResult(result);
      alert(result.approved ? '✅ APPROVED!' : '❌ REJECTED!');

    } catch (error) {
      console.error('💥 AI: Error:', error);
      alert('❌ AI Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🧪 Full Test: Camera → Capture → AI</h1>
      
      <button 
        onClick={testCamera}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          background: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        📷 START CAMERA
      </button>

      {cameraStarted && (
        <button 
          onClick={captureImage}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          📸 CAPTURE IMAGE
        </button>
      )}

      {capturedImage && (
        <button 
          onClick={analyzeWithAI}
          disabled={isAnalyzing}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: isAnalyzing ? '#95a5a6' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isAnalyzing ? 'not-allowed' : 'pointer',
            margin: '10px'
          }}
        >
          {isAnalyzing ? '⏳ ANALYZING...' : '🤖 ANALYZE WITH AI'}
        </button>
      )}

      <div style={{ marginTop: '20px' }}>
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '640px',
            height: '480px',
            border: '3px solid black',
            background: '#000'
          }}
        />
      </div>

      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>📸 Captured Image:</h3>
          <img 
            src={capturedImage} 
            alt="Captured" 
            style={{
              width: '320px',
              border: '3px solid blue'
            }}
          />
        </div>
      )}

      {aiResult && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: aiResult.approved ? '#d5f4e6' : '#fadbd8',
          border: `3px solid ${aiResult.approved ? '#27ae60' : '#e74c3c'}`,
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '20px auto'
        }}>
          <div style={{ fontSize: '60px' }}>
            {aiResult.approved ? '✅' : '❌'}
          </div>
          <h2>{aiResult.approved ? 'APPROVED' : 'REJECTED'}</h2>
          <p><strong>Detected:</strong> {aiResult.detectedWeight} kg</p>
          <p><strong>Expected:</strong> {aiResult.allocatedQuota} kg</p>
          <p><strong>Reason:</strong> {aiResult.reason}</p>
          <p><strong>Confidence:</strong> {(aiResult.confidence * 100).toFixed(0)}%</p>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;
// ✅ CAPTURE: Image captured! Length: 50000