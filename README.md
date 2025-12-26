# annapurna AI (Web Platform)

**Smart, fair, and leakage-resistant ration distribution monitoring system built as a website using Google technologies & AI.**

---

## 🌍 Problem
Local ration distribution systems (community PDS/college/campus food support) face:
- Manual entry fraud  
- Tampered distribution logs  
- Duplicate or fake claims  
- Unfair distribution vs actual need  

This leads to **leakage, inefficiency, and loss of trust**.
---

## 🧠 AI Integration on Web
| Module | Use |
|---|---|
| Google Gemini API | OCR from images, anomaly explanation, fraud reasoning |
| ML Model (hosted on GCP) | Detect abnormal consumption/distribution behavior |

---

## 🛠 Google Tech Used
- **Google Gemini API** → OCR & anomaly reasoning  
- **Firebase** → Authentication & real-time database  
- **Google Cloud (Cloud Functions or Vertex AI)** → Host ML model, run inference  
- *(Optional if time allows)* BigQuery → Analytics logs  

