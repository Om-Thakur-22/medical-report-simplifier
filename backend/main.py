from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz
from groq import Groq
from biobert_model import extract_medical_entities, generate_explanation
from dotenv import load_dotenv
import os

load_dotenv()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Schema
# -----------------------------
class ReportRequest(BaseModel):
    text: str
    language: str = "English"

# -----------------------------
# Risk Detection
# -----------------------------
def analyze_text(text):
    text_lower = text.lower()

    high_risk = ["heart attack", "myocardial infarction", "stroke", "cancer", "kidney failure"]
    medium_risk = ["hypertension", "diabetes", "pneumonia", "asthma"]
    low_risk = ["fever", "cold", "infection"]

    risk_score = 0
    detected_conditions = []

    for word in high_risk:
        if word in text_lower:
            risk_score += 40
            detected_conditions.append(word.title())

    for word in medium_risk:
        if word in text_lower:
            risk_score += 20
            detected_conditions.append(word.title())

    for word in low_risk:
        if word in text_lower:
            risk_score += 10
            detected_conditions.append(word.title())

    risk_score = min(risk_score, 95)
    return risk_score, list(set(detected_conditions))

# -----------------------------
# Simplify Function (Groq)
# -----------------------------
def simplify_text(text, language="English"):
    max_words = 300
    words = text.split()
    if len(words) > max_words:
        text = " ".join(words[:max_words])

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are a helpful medical AI assistant explaining a medical report to a patient. "
                        f"IMPORTANT: Only explain what is explicitly mentioned in the report. Do NOT assume or add any conditions, diseases, or medicines that are not mentioned in the report. "
                        f"Structure your response exactly like this:\n"
                        f"1. Start with: 'Here is a simple explanation of your medical report.'\n"
                        f"2. For each condition/disease mentioned in the report, explain it in 2-3 simple sentences - what it is and how it affects the body.\n"
                        f"3. For each prescribed medicine mentioned in the report, explain in one simple sentence what it does.\n"
                        f"4. List 4-5 lifestyle changes relevant to the patient's conditions only.\n"
                        f"5. End with: 'Please consult your doctor for personalized medical advice.'\n"
                        f"Never mention any doctor name from the report. "
                        f"Never claim to be a real doctor. "
                        f"Be medically accurate. Use very simple easy words. "
                        f"Avoid all medical jargon. Be warm and reassuring. "
                        f"IMPORTANT: Reply strictly in {language} language only. "
                        f"Do not mix English words if language is Hindi or Marathi."                        
                    )
                },
                {
                    "role": "user",
                    "content": f"Please explain this medical report in simple words:\n\n{text}"
                }
            ],
            max_tokens=700,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Simplification failed: {str(e)}"

# -----------------------------
# TEXT API
# -----------------------------
@app.post("/simplify")
async def simplify_report(request: ReportRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text is empty")

    simplified_text = simplify_text(request.text, request.language)
    risk, detected = analyze_text(request.text)
    entities_raw = extract_medical_entities(request.text)

    entities = []
    for item in entities_raw:
        clean_entity = item["entity"].replace("##", "")
        entities.append({
            "entity": clean_entity,
            "type": item["type"]
        })

    explanations = {}
    for item in entities:
        name = item["entity"]
        explanations[name] = generate_explanation(name)

    return {
        "simplified_text": simplified_text,
        "risk_percentage": risk,
        "detected_conditions": detected,
        "biobert_detected_entities": entities,
        "entity_explanations": explanations
    }

# -----------------------------
# PDF API
# -----------------------------
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...), language: str = Form("English")):
    try:
        pdf_text = ""
        pdf_bytes = await file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        for page in doc:
            pdf_text += page.get_text()

        simplified_text = simplify_text(pdf_text, language)
        risk, detected = analyze_text(pdf_text)
        entities_raw = extract_medical_entities(pdf_text)

        entities = []
        for item in entities_raw:
            clean_entity = item["entity"].replace("##", "")
            entities.append({
                "entity": clean_entity,
                "type": item["type"]
            })

        explanations = {}
        for item in entities:
            name = item["entity"]
            explanations[name] = generate_explanation(name)

        return {
            "simplified_text": simplified_text,
            "risk_percentage": risk,
            "detected_conditions": detected,
            "biobert_detected_entities": entities,
            "entity_explanations": explanations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF Processing Failed: {str(e)}")

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def home():
    return {"message": "Medical AI Backend Running Successfully!"}