  import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { ArrowLeft, History, CheckCircle2, XCircle, Package } from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "transactions"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-4 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
              <History className="text-white w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Transaction <span className="text-slate-400 font-light">History</span>
            </h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Fetching secure records...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-20 text-center">
              <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No transactions found in the ledger.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Item Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Quota</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Actual Weight</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">AI Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{tx.item || "Unknown Item"}</p>
                            <p className="text-xs text-slate-400 font-mono">ID: {tx.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="font-semibold text-slate-700">{tx.quotaKg}</span>
                        <span className="text-slate-400 text-xs ml-1 font-medium">kg</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`font-bold ${tx.weighedKg > tx.quotaKg ? 'text-rose-500' : 'text-slate-700'}`}>
                          {tx.weighedKg}
                        </span>
                        <span className="text-slate-400 text-xs ml-1 font-medium">kg</span>
                      </td>
                      <td className="px-6 py-5">
                        {tx.aiApproved ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <CheckCircle2 size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Approved</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                            <XCircle size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* System Footer info */}
        <p className="mt-6 text-center text-slate-400 text-xs italic">
          All records are digitally signed and verified by the Annapurna AI Engine.
        </p>
      </div>
    </div>
  );
}