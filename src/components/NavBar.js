// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Attendance System</div>
        <div>
          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
          >
            Display
          </Link>
          <Link
            to="/add"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded ml-4"
          >
            Add Details
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
