import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Info,
  Settings,
  Activity
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/about", label: "About", icon: <Info size={20} /> },
    { path: "/howitworks", label: "How It Works", icon: <Settings size={20} /> }
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isHovered ? "w-64" : "w-20"
      } bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Logo Section */}
      <div
        className={`flex items-center ${
          isHovered ? "justify-start px-4" : "justify-center"
        } gap-3 p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Activity size={20} />
        </div>

        {isHovered && (
          <span className="text-xl font-bold text-blue-600 whitespace-nowrap">
            MedAI
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-3">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex items-center ${
              isHovered ? "justify-start px-4" : "justify-center"
            } py-3 rounded-lg transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {item.icon}

            {/* Show label when expanded */}
            {isHovered && (
              <span className="ml-3">{item.label}</span>
            )}

            {/* Tooltip when collapsed */}
            {!isHovered && (
              <span className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none">
                {item.label}
              </span>
            )}
          </Link>
        ))}

      </nav>
    </div>
  );
}

export default Sidebar;
