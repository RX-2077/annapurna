// src/pages/FaceCapturePage.jsx
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import FaceCapture from '../components/verification/FaceCapture';

function FaceCapturePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  useEffect(() => {
    if (!userData) {
      navigate('/user-login');
    }
  }, [userData, navigate]);

  const handleCaptureComplete = (verificationData) => {
    console.log('Face capture complete:', verificationData);
    navigate('/verification-result', {
      state: { verificationData }
    });
  };

  const handleBack = () => {
    navigate('/user-login');
  };

  if (!userData) return null;

  return (
    // Replaced indigo/pink gradient with the standard light slate background
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-6 font-semibold group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Login
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Changed icon box to emerald to match main theme */}
              <div className="bg-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <span className="text-2xl text-white">👤</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Face <span className="text-emerald-600">Verification</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm">Biometric Security Check</p>
              </div>
            </div>

            {/* User Info Tag - Simplified styling */}
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs">🆔</div>
              <div className="text-xs">
                <p className="font-bold text-slate-700">{userData.email}</p>
                <p className="text-slate-400 font-mono">{userData.userId.slice(0, 12)}...</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Capture Area */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">AI Camera Feed</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-700 text-[10px] font-black uppercase tracking-widest">Active Scan</span>
              </div>
            </div>
            
            <div className="p-4 md:p-10 bg-white">
              <FaceCapture
                userId={userData.userId}
                onCaptureComplete={handleCaptureComplete}
              />
            </div>

            <div className="p-6 bg-emerald-50/50 border-t border-slate-100">
              <p className="text-slate-600 text-sm font-medium flex items-center gap-2 italic">
                <span>💡</span> Tip: Center your face and avoid wearing hats or sunglasses.
              </p>
            </div>
          </div>

          {/* Progress Indicator - Consistent with Dashboard colors */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm">
              {/* Step 1 - Completed */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-md shadow-emerald-100">
                  ✓
                </div>
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Login</span>
              </div>

              <div className="w-8 h-1 bg-emerald-200 rounded-full"></div>

              {/* Step 2 - Active (Now Emerald instead of Indigo) */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-emerald-200 ring-4 ring-emerald-50 animate-pulse">
                  2
                </div>
                <span className="text-xs font-bold text-slate-800">Verify</span>
              </div>

              <div className="w-8 h-1 bg-slate-200 rounded-full"></div>

              {/* Step 3 - Pending */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xs">
                  3
                </div>
                <span className="text-xs font-bold text-slate-300 hidden sm:inline">Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceCapturePage;