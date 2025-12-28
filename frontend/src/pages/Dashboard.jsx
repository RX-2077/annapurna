import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  History, 
  AlertCircle, 
  QrCode, 
  ScanLine, 
  UserCheck, 
  ShieldCheck, 
  LogIn, 
  Lock 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Annapurna
              </h2>
            </div>
            <p className="text-slate-500 font-medium ml-11">
              Smart PDS <span className="text-emerald-600">Leakage Reduction</span> System
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Status</p>
            <p className="text-sm font-semibold text-emerald-500 flex items-center justify-end gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Operational
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Welcome Card */}
          <div className="md:col-span-2 relative overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">System Overview</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                Welcome to the future of distribution. This platform ensures 
                <span className="font-semibold text-slate-900"> fair ration distribution</span> using 
                digital verification, AI validation, and immutable digital logs to prevent leakage.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-slate-500">
                  ⚡ Real-time Tracking
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-slate-500">
                  🛡️ Secure Bio-Auth
                </div>
              </div>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Features Card */}
          <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
              <span className="bg-emerald-500 text-[10px] px-2 py-1 rounded-md uppercase tracking-tighter">New</span> 
              Core Features
            </h4>
            <ul className="space-y-4">
              <FeatureItem text="QR-based verification" />
              <FeatureItem text="Face authentication" />
              <FeatureItem text="Transparent logs" />
              <FeatureItem text="Submit complaints" />
            </ul>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-3 mt-4">
            <div className="flex items-center gap-3 mb-8">
              <h4 className="text-xl font-bold text-slate-800">Quick Navigation</h4>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <NavLink to="/transactions" label="Transactions" icon={<History size={20}/>} color="bg-blue-600" />
              <NavLink to="/complaints" label="Complaints" icon={<AlertCircle size={20}/>} color="bg-rose-500" />
              <NavLink to="/qrgenerate" label="Generate QR" icon={<QrCode size={20}/>} color="bg-emerald-600" />
              <NavLink to="/qrverify" label="Verify QR" icon={<ScanLine size={20}/>} color="bg-teal-600" />
              <NavLink to="/face-capture" label="Face Capture" icon={<UserCheck size={20}/>} color="bg-indigo-600" />
              <NavLink to="/verification-result" label="Status" icon={<ShieldCheck size={20}/>} color="bg-amber-500" />
              <NavLink to="/user-login" label="User Login" icon={<LogIn size={20}/>} color="bg-slate-700" />
              <NavLink to="/adminlogin" label="Admin Portal" icon={<Lock size={20}/>} color="bg-slate-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-slate-300 group">
      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
        <span className="text-[10px]">✓</span>
      </div>
      <span className="text-sm font-medium">{text}</span>
    </li>
  );
}

function NavLink({ to, label, color, icon }) {
  return (
    <Link
      to={to}
      className={`${color} text-white p-5 rounded-2xl font-semibold transition-all 
      hover:translate-y-[-4px] active:scale-95 shadow-lg shadow-inherit/20 flex flex-col items-start justify-between min-h-[120px] group`}
    >
      <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
        {icon}
      </div>
      <span className="text-base tracking-tight">{label}</span>
    </Link>
  );
}