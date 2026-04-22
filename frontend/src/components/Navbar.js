import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition duration-300 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-xl font-bold text-blue-700">
        MedSimplify AI
      </h1>

      <div className="space-x-4">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link to="/about" className={linkStyle("/about")}>
          About
        </Link>
        <Link to="/how-it-works" className={linkStyle("/how-it-works")}>
          How It Works
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
