import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Complaints from "./pages/Complaints";
import AdminLogin from "./pages/AdminLogin";
import FaceCapturePage from "./pages/FaceCapturePage";
import QRverify from "./pages/ORverify";
import UserLogin from "./pages/UserLogin";
import VerificationResultPage from "./pages/VerificationResultPage";
import AIScalePage from "./pages/AIScalePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/face-capture" element={<FaceCapturePage />} />
        <Route path="/qrverify" element={<QRverify />} />
        <Route path="/verification-result" element={<VerificationResultPage />} />
        <Route path="/ai-scale/:rationCardNumber" element={<AIScalePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
