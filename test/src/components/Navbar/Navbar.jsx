import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-blue-400 p-4">
      <div className=" container mx-auto ">
        <ul className="flex justify-between">
          <div className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Test One
              </Link>
            </li>
            <li>
              <Link
                to="/testtwo"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Test Two
              </Link>
            </li>
            <li>
              <Link
                to="/room"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded"
              >
                Test Three
              </Link>
            </li>
          </div>

          <li>
            <Link
              to="/aboutme"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded"
            >
              AboutMe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
