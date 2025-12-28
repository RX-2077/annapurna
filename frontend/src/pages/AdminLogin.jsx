import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigating back to home/dashboard after admin login
    } catch (err) {
      setError("Invalid administrative credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 font-sans">
      
      {/* Logo/Header Section */}
      <div className="mb-8 text-center">
        <div className="bg-slate-900 w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl mx-auto mb-4">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Admin <span className="text-emerald-600">Portal</span>
        </h2>
        <p className="text-slate-500 font-medium mt-1">Authorized Personnel Only</p>
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

          <div className="relative z-10 space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@annapurna.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 active:scale-[0.98] shadow-slate-200"}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In to System"
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="text-rose-500">⚠️</span>
                <p className="text-rose-700 text-xs font-bold uppercase tracking-tight">
                  {error}
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-slate-400 hover:text-emerald-600 font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span> Return to Public Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}