import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function UploadForm({ onReportAnalyzed }) {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!inputText.trim() && !file) {
      alert("Please enter text OR upload a PDF file");
      return;
    }

    try {
      setLoading(true);
      let response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("language", language);

        response = await fetch("https://omthakur2211-medai-backend.hf.space/upload-pdf", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("https://omthakur2211-medai-backend.hf.space/simplify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText, language: language }),
        });
      }

      const data = await response.json();

      setResult({
        risk_percentage: data.risk_percentage || 0,
        detected_conditions: data.detected_conditions || [],
        biobert_detected_entities: data.biobert_detected_entities || [],
        entity_explanations: data.entity_explanations || {},
        simplified_text: data.simplified_text || "No explanation available",
      });

      if (onReportAnalyzed) onReportAnalyzed();

    } catch (error) {
      console.error("Error:", error);
      alert("Backend connection failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.simplified_text) {
      navigator.clipboard.writeText(result.simplified_text);
      alert("Copied to clipboard!");
    }
  };

  const handleSpeak = () => {
    if (!result?.simplified_text) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result.simplified_text);

    if (language === "Hindi") {
      utterance.lang = "hi-IN";
    } else if (language === "Marathi") {
      utterance.lang = "mr-IN";
    } else {
      utterance.lang = "en-US";
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Analyze Medical Report
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>

          <textarea
            rows="5"
            placeholder="Paste medical report text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <div className="text-center text-gray-500 dark:text-gray-400">OR</div>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Report"}
          </button>
        </form>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🩺 AI Risk Analysis ({language})
          </h3>

          {/* Disclaimer Banner */}
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4 text-sm">
            <span className="text-xl">⚠️</span>
            <p>This report is <strong>AI generated</strong>. Please consult a real doctor for accurate medical advice.</p>
          </div>

          {/* Risk Header */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                result.risk_percentage > 60
                  ? "bg-red-100 text-red-600"
                  : result.risk_percentage > 30
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {result.risk_percentage > 60
                ? "High"
                : result.risk_percentage > 30
                ? "Medium"
                : "Low"}{" "}
              Risk
            </span>
            <span className="font-bold text-lg dark:text-white">
              {result.risk_percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className={`${
                result.risk_percentage > 60
                  ? "bg-red-500"
                  : result.risk_percentage > 30
                  ? "bg-yellow-500"
                  : "bg-green-500"
              } h-3 rounded-full transition-all duration-700`}
              style={{ width: `${result.risk_percentage}%` }}
            ></div>
          </div>

          {/* Detected Conditions */}
          {result.detected_conditions?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 dark:text-white">
                🧬 Detected Conditions:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.detected_conditions.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detected Entities */}
          {result.biobert_detected_entities?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 dark:text-white">
                🧪 Detected Medical Entities:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.biobert_detected_entities.map((item, idx) => (
                  <span
                    key={idx}
                    title={result.entity_explanations?.[item.entity] || ""}
                    className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 cursor-pointer"
                  >
                    {item.entity} ({item.type})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Simplified Text */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold dark:text-white">
                📄 Simplified Explanation:
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={handleSpeak}
                  className={`text-sm px-3 py-1 rounded-lg transition ${
                    isSpeaking
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
                </button>
                <button
                  onClick={handleCopy}
                  className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            {/* Markdown rendered output */}
            <div className="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-lg font-bold text-gray-800 dark:text-white mt-3 mb-1">{children}</h1>,
                  h2: ({children}) => <h2 className="text-base font-bold text-gray-800 dark:text-white mt-3 mb-1">{children}</h2>,
                  h3: ({children}) => <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mt-2 mb-1">{children}</h3>,
                  strong: ({node, ...props}) => <strong className="font-semibold text-gray-800 dark:text-white" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-700 dark:text-gray-300" {...props} />,
                  p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                }}
              >
                {result.simplified_text}
              </ReactMarkdown>
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
}

export default UploadForm;