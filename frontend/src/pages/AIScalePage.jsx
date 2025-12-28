import { useParams, useNavigate } from "react-router-dom";
import AIScale from "../components/AIScale";

export default function AIScalePage() {
  const { rationCardNumber } = useParams();
  const navigate = useNavigate();

  // Prevent opening without verification
  if (!rationCardNumber) {
    return (
      <div style={styles.center}>
        <h2>❌ Access Denied</h2>
        <p>Ration card number not found.</p>
        <p>Please complete QR & Face verification first.</p>

        <button style={styles.btn} onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Page Header */}
      <div style={styles.header}>
        <h1>⚖️ AI Weighing Verification</h1>
        <p>
          Step 3 of the verification process.  
          Capture the written weight and let AI verify it.
        </p>

        <div style={styles.cardBox}>
          <strong>Ration Card:</strong> {rationCardNumber}
        </div>
      </div>

      {/* AI Scale Component */}
      <AIScale rationCardNumber={rationCardNumber} />

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

/* Simple inline styles */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f4f6f8"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px"
  },
  cardBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#e3f2fd",
    display: "inline-block",
    borderRadius: "6px",
    fontSize: "15px"
  },
  footer: {
    textAlign: "center",
    marginTop: "30px"
  },
  btn: {
    padding: "10px 18px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  secondaryBtn: {
    padding: "10px 18px",
    backgroundColor: "#7f8c8d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  center: {
    padding: "50px",
    textAlign: "center"
  }
};
