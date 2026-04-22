import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          About MedAI
        </h1>

        {/* What is MedAI */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">🏥 What is MedAI?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            MedAI is a free tool that helps you understand your medical reports easily. 
            When your doctor gives you a report, it can be very confusing with difficult words. 
            MedAI reads your report and explains everything in simple language that anyone can understand.
          </p>
        </div>

        {/* Who is it for */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-500 mb-3">👨‍👩‍👧 Who is this for?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
            MedAI is made for every patient who finds it hard to read medical reports. Whether you are:
          </p>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2">
            <li>✅ A patient who received a report from the hospital</li>
            <li>✅ A family member trying to understand a loved one's report</li>
            <li>✅ Someone who prefers reading in Hindi or Marathi</li>
            <li>✅ Someone who wants to listen instead of read</li>
          </ul>
        </div>

        {/* What can it do */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-purple-500 mb-3">✨ What can MedAI do for you?</h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-3">
            <li>📋 <strong>Simplify your report</strong> — Explains your report in easy words</li>
            <li>🌐 <strong>3 Languages</strong> — English, Hindi, and Marathi supported</li>
            <li>🔊 <strong>Listen to explanation</strong> — Hear the explanation if you cannot read</li>
            <li>⚠️ <strong>Risk level</strong> — Know if your condition is Low, Medium or High risk</li>
            <li>💊 <strong>Medicine explained</strong> — Understand what each medicine does</li>
            <li>📄 <strong>PDF support</strong> — Upload your report as a PDF directly</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3">⚠️ Important Note</h2>
          <p className="leading-relaxed">
            MedAI is here to help you understand your report better — but it is not a doctor. 
            Always consult your doctor before making any health decisions. 
            Use MedAI to prepare better questions for your doctor's visit!
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default About;