import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function About() {
  const features = [
    {
      title: "Simplify Your Report",
      description:
        "Explains your medical report in simple and easy-to-understand language.",
    },
    {
      title: "Multi-Language Support",
      description:
        "Supports English, Hindi, and Marathi for better accessibility.",
    },
    {
      title: "Audio Explanations",
      description:
        "Listen to report explanations if you prefer audio over reading.",
    },
    {
      title: "Risk Level Detection",
      description:
        "Shows whether the condition is Low, Medium, or High risk.",
    },
    {
      title: "Medicine Explanation",
      description:
        "Provides simple explanations for medicines mentioned in the report.",
    },
    {
      title: "PDF Support",
      description:
        "Upload medical reports directly in PDF format.",
    },
  ];

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
            About MedAI
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            MedAI helps users understand medical reports in a simple and
            easy-to-read format. Upload your report and receive explanations in
            plain language, available in multiple languages with audio support.
          </p>
        </div>

        {/* What is MedAI */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            What is MedAI?
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            MedAI is a free tool that helps users understand medical reports
            more easily. Medical reports often contain complex terms that can be
            difficult to understand. MedAI analyzes the report and explains the
            information in simple language, making it easier for users to
            understand their health information.
          </p>
        </div>

        {/* Who is this for */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Who Is This For?
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            MedAI is designed for:
          </p>

          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>• Patients who have received a medical report</li>
            <li>
              • Family members trying to understand a loved one's report
            </li>
            <li>
              • Users who prefer reading explanations in Hindi or Marathi
            </li>
            <li>
              • Users who prefer listening to explanations instead of reading
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
            What Can MedAI Do?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-700 p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-semibold text-yellow-700 dark:text-yellow-400 mb-4">
            Important Note
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            MedAI helps users understand medical reports more easily. It is not
            a replacement for professional medical advice. Always consult a
            qualified healthcare professional before making medical or
            treatment-related decisions.
          </p>
        </div>

         {/* Developer */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
    Developer
  </h2>

  <h3 className="text-2xl font-bold text-blue-600 mb-2">
    Om Thakur
  </h3>

  <p className="text-gray-600 dark:text-gray-300 mb-3">
    Master of Computer Applications (AI & Data Science)
  </p>

  <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
    Passionate about leveraging Artificial Intelligence to improve
    healthcare accessibility, patient awareness, and digital health
    experiences.
  </p>

  <div className="flex justify-center items-center gap-6">
    <a
      href="https://github.com/Om-Thakur-22"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
    >
      <FaGithub size={22} />
      <span>GitHub</span>
    </a>

    <a
      href="https://www.linkedin.com/in/om-thakur-ab015235b?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
    >
      <FaLinkedin size={22} />
      <span>LinkedIn</span>
    </a>

    <a
      href="mailto:omthakurn@gmail.com"
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
    >
      <MdEmail size={22} />
      <span>Email</span>
    </a>
  </div>
</div>
      </motion.div>
    </div>
  );
}

export default About;