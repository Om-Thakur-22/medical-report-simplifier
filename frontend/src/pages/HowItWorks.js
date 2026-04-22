import React from "react";
import { motion } from "framer-motion";

function HowItWorks() {
  const steps = [
    {
      icon: "📋",
      title: "Paste or Upload Your Report",
      description: "Copy your medical report text and paste it in the box, or directly upload your report as a PDF file.",
      color: "blue"
    },
    {
      icon: "🌐",
      title: "Choose Your Language",
      description: "Select English, Hindi, or Marathi — whichever language you are most comfortable reading in.",
      color: "green"
    },
    {
      icon: "🔍",
      title: "AI Reads Your Report",
      description: "Our AI automatically finds all important medical words, disease names, medicines, and test values in your report.",
      color: "purple"
    },
    {
      icon: "💬",
      title: "Get Simple Explanation",
      description: "Your report is explained in simple, easy words. You will understand exactly what disease you have and what each medicine does.",
      color: "orange"
    },
    {
      icon: "📊",
      title: "See Your Risk Level",
      description: "MedAI shows you whether your condition is Low Risk, Medium Risk, or High Risk so you know how serious it is.",
      color: "red"
    },
    {
      icon: "🔊",
      title: "Listen or Copy",
      description: "You can press the Listen button to hear the explanation out loud, or copy it to share with your family members.",
      color: "teal"
    },
  ];

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    teal: "bg-teal-100 text-teal-600",
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          How It Works
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Using MedAI is very simple. Just follow these easy steps and get your report explained in seconds!
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorMap[step.color]}`}>
                  {step.icon}
                </div>
                <div>
                  <span className="text-xs text-gray-400">Step {idx + 1}</span>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{step.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            💡 Helpful Tips
          </h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-3">
            <li>📌 <strong>Before doctor visit</strong> — Use MedAI to understand your report and prepare questions for your doctor</li>
            <li>👨‍👩‍👧 <strong>Share with family</strong> — Copy the explanation and share with your family members</li>
            <li>🔊 <strong>Cannot read?</strong> — Use the Listen button to hear the explanation in your language</li>
            <li>📱 <strong>Save your explanation</strong> — Copy the simplified text and save it on your phone</li>
          </ul>
        </div>

      </motion.div>
    </div>
  );
}

export default HowItWorks;