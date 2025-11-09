import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full header">
      <div className="h-16 flex  items-center p-4">
        <p>Dullat's EV</p>
        <ul className="flex gap-4 ml-auto">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
