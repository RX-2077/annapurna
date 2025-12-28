import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function QRverify() {
  const hasScanned = useRef(false);
  const [verifiedData, setVerifiedData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 280 },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (hasScanned.current) return;
        hasScanned.current = true;
        setLoading(true);

        try {
          await scanner.clear();
          const rationNumber = decodedText.trim();

          // 1️⃣ USER QUERY
          const userQuery = query(
            collection(db, "users"),
            where("rationCardNumber", "==", rationNumber)
          );
          const userSnap = await getDocs(userQuery);

          if (userSnap.empty) {
            setError("Ration Card not found in our database.");
            setLoading(false);
            return;
          }

          const user = userSnap.docs[0].data();

          // 2️⃣ QUOTA QUERY
          const quotaQuery = query(
            collection(db, "quotas"),
            where("rationCardNumber", "==", rationNumber)
          );
          const quotaSnap = await getDocs(quotaQuery);

          if (quotaSnap.empty) {
            setError("Allocation data missing for this card.");
            setLoading(false);
            return;
          }

          const quota = quotaSnap.docs[0].data();

          setVerifiedData({
            name: user.name,
            phone: user.pone || user.phone, // fallback for the typo
            rationCardNumber: rationNumber,
            grainKg: quota.allocatedGrainKg,
            oilKg: quota.allocatedOilKg
          });
        } catch (err) {
          setError("Failed to process QR. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-6 font-semibold group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-teal-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100">
              <span className="text-2xl text-white">🔍</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              QR <span className="text-teal-600">Verification</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-1">Authenticate user eligibility via secure QR scan.</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Scanner Viewport */}
          {!verifiedData && !error && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
                <p className="text-slate-600 font-bold uppercase tracking-widest text-xs mb-2">Camera Feed</p>
                <h3 className="text-xl font-bold text-slate-800">Scan Member QR Code</h3>
              </div>
              
              <div className="p-6 md:p-12 flex flex-col items-center">
                <div id="reader" className="w-full max-w-sm rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-2xl"></div>
                <div className="mt-8 flex items-center gap-3 text-slate-500 bg-slate-100 px-6 py-3 rounded-full text-sm font-semibold">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Waiting for valid QR code...
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-200">
               <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
               <p className="font-bold text-slate-700">Fetching Secure Records...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-white rounded-3xl p-10 text-center shadow-lg border-2 border-rose-100 animate-in zoom-in-95">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Verification Failed</h3>
              <p className="text-rose-600 font-medium mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Try Scanning Again
              </button>
            </div>
          )}

          {/* Verification Result Card */}
          {verifiedData && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="bg-emerald-600 rounded-t-3xl p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Identity Verified</h3>
                <p className="text-emerald-100">Member details successfully retrieved</p>
              </div>

              <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-slate-200 overflow-hidden">
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Information</h4>
                    <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
                      <span className="text-slate-500 font-medium">Name</span>
                      <span className="font-bold text-slate-900">{verifiedData.name}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
                      <span className="text-slate-500 font-medium">Phone</span>
                      <span className="font-bold text-slate-900">{verifiedData.phone}</span>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-2xl flex justify-between items-center border border-emerald-100">
                      <span className="text-emerald-700 font-medium">Card No.</span>
                      <span className="font-black text-emerald-800 font-mono">{verifiedData.rationCardNumber}</span>
                    </div>
                  </div>

                  {/* Quota Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Quota</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-5 rounded-2xl text-center border-2 border-amber-200 shadow-sm">
                        <div className="text-3xl mb-2">🌾</div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Grains</p>
                        <p className="text-2xl font-black text-slate-800">{verifiedData.grainKg} <span className="text-xs uppercase">kg</span></p>
                      </div>
                      <div className="bg-white p-5 rounded-2xl text-center border-2 border-blue-200 shadow-sm">
                        <div className="text-3xl mb-2">🛢️</div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Oil</p>
                        <p className="text-2xl font-black text-slate-800">{verifiedData.oilKg} <span className="text-xs uppercase">kg</span></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.reload()}
                      className="w-full mt-2 py-4 border-2 border-slate-200 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                    >
                      New Scan
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}