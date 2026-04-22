import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

function App() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" ? false : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">

      <Sidebar />

      {/* Right Side Layout */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top Navbar */}
        <div className="flex justify-end items-center p-4 bg-white dark:bg-gray-800 shadow-md shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto">

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Home />
                  </motion.div>
                }
              />

              <Route
                path="/about"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <About />
                  </motion.div>
                }
              />

              <Route
                path="/howitworks"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HowItWorks />
                  </motion.div>
                }
              />

            </Routes>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}

export default App;
