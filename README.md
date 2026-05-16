# 🏥 MedAI — Medical Report Simplification

An AI-powered web application that simplifies complex medical reports into easy-to-understand language for patients in English, Hindi, and Marathi.

## 🌐 Live Demo
👉 [https://medical-report-simplifier-theta.vercel.app](https://medical-report-simplifier-theta.vercel.app)

## 🎯 Problem Statement
Most patients in India cannot understand their medical reports due to complex medical terminology. MedAI solves this by converting reports into simple, patient-friendly language.

## ✨ Features
- 📄 Upload medical report as text or PDF
- 🌐 3 language support — English, Hindi, Marathi
- 🧠 BioBERT for medical entity extraction
- 🤖 Llama 3.1 for text simplification
- ⚠️ Risk scoring — Low / Medium / High
- 🔊 Text-to-Speech support
- 📋 Copy simplified report

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Framer Motion |
| Backend | FastAPI (Python) |
| NER Model | BioBERT (d4data/biomedical-ner-all) |
| LLM | Meta Llama 3.1 8B via Groq API |
| PDF Processing | PyMuPDF |
| Frontend Hosting | Vercel |
| Backend Hosting | HuggingFace Spaces |

## 🔄 Workflow
User uploads report (Text/PDF)
↓
BioBERT extracts medical entities
↓
Llama 3.1 simplifies the report
↓
Result shown with Risk Score + Entities + Explanation

## 🚀 Run Locally

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Environment Variables:**

Create `.env` file in `backend` folder:

GROQ_API_KEY=your_groq_api_key

## 🤖 AI Models Used
- **BioBERT** — Pre-trained on 29M PubMed biomedical articles. Achieves 91% accuracy on medical NER tasks.
- **Llama 3.1 8B** — Meta's powerful LLM accessed via Groq API for fast, free inference.

## ⚠️ Disclaimer
MedAI is an AI-powered tool for educational purposes only. Always consult a qualified doctor for medical advice.

## 👨‍💻 Developer
**Om Thakur**
MCA — AI & Data Science