import React from "react";
import { motion } from "framer-motion";

function HowItWorks() {
  const steps = [
    {
      icon: "📋",
      title: "Upload Your Report",
      description:
        "Paste your medical report text or upload your report as a PDF file.",
      color: "blue",
    },
    {
      icon: "🌐",
      title: "Choose Your Language",
      description:
        "Select English, Hindi, or Marathi based on your preference.",
      color: "green",
    },
    {
      icon: "🔍",
      title: "AI Analyzes Your Report",
      description:
        "MedAI identifies important medical terms, medicines, diseases, and test values from your report.",
      color: "purple",
    },
    {
      icon: "💬",
      title: "Receive a Simplified Explanation",
      description:
        "The report is converted into simple language that is easier to understand.",
      color: "orange",
    },
    {
      icon: "📊",
      title: "View Risk Level",
      description:
        "See whether the findings are categorized as Low Risk, Medium Risk, or High Risk.",
      color: "red",
    },
    {
      icon: "🔊",
      title: "Listen or Share",
      description:
        "Listen to the explanation using audio support or copy it for sharing.",
      color: "teal",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            How MedAI Works
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow a few simple steps to upload your medical report and receive
            clear, easy-to-understand explanations in your preferred language.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorMap[step.color]}`}
                >
                  {step.icon}
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    Step {idx + 1}
                  </span>

                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Helpful Tips */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Helpful Tips
          </h2>

          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Before a Doctor Visit:</strong> Use MedAI to understand
              your report and prepare questions for your doctor.
            </li>

            <li>
              <strong>Share with Family:</strong> Copy the explanation and share
              it with family members who may want to understand the report.
            </li>

            <li>
              <strong>Prefer Audio?</strong> Use the Listen feature to hear the
              explanation in your selected language.
            </li>

            <li>
              <strong>Save for Later:</strong> Copy the simplified explanation
              and keep it for future reference.
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default HowItWorks;