import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function Complaints() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus({ text: "Please enter your grievance details.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "complaints"), {
        userId: "demo-user",
        message,
        timestamp: serverTimestamp(),
        status: "open",
      });

      setMessage("");
      setStatus({ text: "Grievance logged successfully ✅", type: "success" });
    } catch (err) {
      console.error(err);
      setStatus({ text: "Error submitting complaint ❌", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors mb-6 font-semibold group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-rose-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100">
              <span className="text-2xl text-white">📢</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Complaint <span className="text-rose-600">Portal</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-1">Transparent grievance redressal for the PDS network.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
              <form onSubmit={submitComplaint} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                    Issue Description
                  </label>
                  <textarea
                    rows="8"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition-all resize-none text-slate-700 text-lg placeholder:text-slate-300"
                    placeholder="Describe the issue in detail (e.g., shop availability, ration quality, or technical errors)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all 
                    ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-700 active:scale-[0.98] shadow-rose-100"}`}
                >
                  {loading ? "Processing Submission..." : "🚀 Submit Complaint"}
                </button>
              </form>

              {/* Status Notifications */}
              {status.text && (
                <div className={`mt-8 p-5 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 
                  ${status.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}
                >
                  <span className="text-xl">{status.type === "success" ? "✔" : "⚠️"}</span>
                  <p className="font-bold text-sm">{status.text}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h4 className="text-slate-900 font-bold text-xl mb-4 flex items-center gap-2">
                <span>⚖️</span> Guidelines
              </h4>
              <ul className="text-sm text-slate-500 space-y-4 font-medium leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-emerald-500">✔</span>
                  Specify the Fair Price Shop location.
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✔</span>
                  Include the date and time.
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✔</span>
                  Keep descriptions clear and factual.
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-xl">
                📜
              </div>
              <h4 className="font-bold text-lg mb-2">Track Status</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your complaint is logged with a unique ID. Check your history to see resolution updates.
              </p>
              <Link to="/transactions" className="text-emerald-400 font-bold hover:underline">
                View History →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}