// src/pages/UserLogin.jsx
import { useNavigate, Link } from 'react-router-dom';
import UserLoginForm from '../components/auth/UserLoginForm';

function UserLogin() {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    navigate('/face-capture', { state: { userData } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl">
        
        {/* Navigation - Return to Home */}
        <div className="mb-8 flex justify-start">
           <Link to="/" className="text-slate-400 hover:text-emerald-600 font-bold text-sm transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Public Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-[2rem] mb-6 shadow-xl shadow-emerald-100">
            <span className="text-4xl">🛡️</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Annapurna <span className="text-emerald-600">Secure</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Public Distribution System Authentication Gateway
          </p>
        </div>

        {/* Login Form Container */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-2 overflow-hidden">
            <UserLoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>

        {/* How it Works Section - Redesigned for Emerald Theme */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 p-10">
            <h3 className="text-xl font-black text-slate-800 mb-8 text-center uppercase tracking-widest">
              Three-Step <span className="text-emerald-600 font-black">Verification</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <span className="text-2xl font-black group-hover:hidden">01</span>
                  <span className="text-2xl hidden group-hover:block">🔑</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Digital Login</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Secure access using your registered ration credentials
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <span className="text-2xl font-black group-hover:hidden">02</span>
                  <span className="text-2xl hidden group-hover:block">👤</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Face Identity</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  AI-powered biometric validation to prevent fraud
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <span className="text-2xl font-black group-hover:hidden">03</span>
                  <span className="text-2xl hidden group-hover:block">✅</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Safe Access</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Verified distribution of your allocated food grains
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center pb-10">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            © 2025 Annapurna PDS System • Fair Distribution
          </p>
        </footer>
      </div>
    </div>
  );
}

export default UserLogin;