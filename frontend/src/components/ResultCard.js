import React from "react";
import { motion } from "framer-motion";

function ResultCard({ result, language }) {
  const risk = result.risk_percentage;

  let riskLevel = "Low";
  let riskColor = "bg-green-500";
  let badgeColor = "bg-green-100 text-green-600";

  if (risk > 60) {
    riskLevel = "High";
    riskColor = "bg-red-500";
    badgeColor = "bg-red-100 text-red-600";
  } else if (risk > 30) {
    riskLevel = "Medium";
    riskColor = "bg-yellow-500";
    badgeColor = "bg-yellow-100 text-yellow-600";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🩺 AI Risk Analysis ({language})
      </h3>

      {/* Risk Header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
          {riskLevel} Risk
        </span>
        <span className="font-bold text-lg dark:text-white">{risk}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div
          className={`${riskColor} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${risk}%` }}
        ></div>
      </div>

      {/* Rule-based Conditions */}
      {result.rule_based_detected_conditions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 dark:text-white">🧬 Detected Conditions:</h4>
          <div className="flex flex-wrap gap-2">
            {result.rule_based_detected_conditions.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* BioBERT Entities */}
      {result.biobert_detected_entities.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 dark:text-white">🧪 Detected Medical Entities:</h4>
          <div className="flex flex-wrap gap-2">
            {result.biobert_detected_entities.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700"
                title={result.entity_explanations[item.entity]}
              >
                {item.entity} ({item.type})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Simplified Text */}
      <div>
        <h4 className="font-semibold mb-2 dark:text-white">📄 Simplified Explanation:</h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {result.simplified_text}
        </p>
      </div>
    </motion.div>
  );
}

export default ResultCard;