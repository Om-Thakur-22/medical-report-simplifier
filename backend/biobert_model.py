import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

device = 0 if torch.cuda.is_available() else -1

MODEL_NAME = "d4data/biomedical-ner-all"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForTokenClassification.from_pretrained(MODEL_NAME)

ner_pipeline = pipeline(
    "ner",
    model=model,
    tokenizer=tokenizer,
    aggregation_strategy="first", 
    device=device
)

def chunk_text(text, max_length=400):
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_length):
        chunk = " ".join(words[i:i + max_length])
        chunks.append(chunk)
    return chunks

def extract_medical_entities(text):
    chunks = chunk_text(text)
    unique_entities = {}

    ignore_types = {"Date", "Time", "Nonbiological_location", "Detailed_description"}
    ignore_words = {"strict", "regular", "daily", "twice", "once", "left", "right", "type", "hospital", "pune", "city"}

    for chunk in chunks:
        try:
            entities = ner_pipeline(chunk)

            for entity in entities:
                word = entity["word"].strip()
                label = entity["entity_group"]
                score = entity.get("score", 0)

 
                word = word.replace("##", "").strip()

                if len(word) <= 3:
                    continue

                if score < 0.80:
                    continue

                if label in ignore_types:
                    continue

                if word.lower() in ignore_words:
                    continue

                if word.replace("mg", "").replace("ml", "").replace("/", "").replace(".", "").strip().isdigit():
                    continue

                if word not in unique_entities:
                    unique_entities[word] = label

        except:
            continue

    return [
        {"entity": word, "type": label}
        for word, label in unique_entities.items()
    ]

def generate_explanation(entity_name):
    return f"{entity_name} is a medical term detected in your report. Consult a healthcare professional for detailed advice."