# 🏥 MedAI — AI-Powered Medical Report Simplification

MedAI is an AI-powered healthcare application that helps patients understand complex medical reports in simple, easy-to-understand language. The platform supports English, Hindi, and Marathi, making medical information more accessible to a wider audience.

---

## 🌐 Live Demo

👉 https://medical-report-simplifier-theta.vercel.app

---

## 🎯 Problem Statement

Medical reports often contain technical terminology that can be difficult for patients and their families to understand.

MedAI addresses this challenge by analyzing medical reports, extracting important medical entities, and generating simplified explanations in user-friendly language.

---

## ✨ Key Features

- 📄 Upload medical reports as text or PDF
- 🌐 Multi-language support (English, Hindi, Marathi)
- 🧠 Medical entity extraction using BioBERT
- 🤖 AI-powered report simplification using Llama 3.1
- ⚠️ Risk level identification (Low / Medium / High)
- 🔊 Text-to-Speech support
- 📋 Copy and share simplified reports
- 📱 Responsive and user-friendly interface

---

## 🛠️ Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js, Tailwind CSS, Framer Motion |
| Backend | FastAPI (Python) |
| Medical NER | BioBERT (d4data/biomedical-ner-all) |
| Large Language Model | Meta Llama 3.1 8B via Groq API |
| PDF Processing | PyMuPDF |
| Frontend Hosting | Vercel |
| Backend Hosting | Hugging Face Spaces |

---

## 🔄 System Workflow

```text
Medical Report (Text / PDF)
            │
            ▼
      BioBERT Model
(Medical Entity Extraction)
            │
            ▼
      Llama 3.1 Model
   (Report Simplification)
            │
            ▼
 Simplified Explanation
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Risk     Entities    Audio
Level    Extracted  Support
```

---

## 🚀 Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 🤖 AI Models Used

### BioBERT

BioBERT is a biomedical language model trained on large-scale medical and scientific literature. It is used in MedAI for extracting diseases, medicines, symptoms, and other medical entities from reports.

### Llama 3.1 8B

Llama 3.1 is used to convert complex medical terminology into patient-friendly explanations, making reports easier to understand.

---

## ⚠️ Disclaimer

MedAI provides AI-generated explanations for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment.

Always consult a qualified healthcare professional regarding medical concerns or treatment decisions.

---

## 👨‍💻 Developer

**Om Thakur**

Master of Computer Applications (AI & Data Science)

GitHub: https://github.com/Om-Thakur-22

LinkedIn: https://www.linkedin.com/in/om-thakur-ab015235b?utm_source=share_via&utm_content=profile&utm_medium=member_ios