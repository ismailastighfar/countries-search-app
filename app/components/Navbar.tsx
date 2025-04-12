import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="w-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
          <NavLink 
            to="/" 
            className="flex items-center transform hover:scale-105 transition-transform duration-200"
          >
            <span className="text-2xl font-black select-none">
              Countries
              <span className="text-purple-300">Explorer</span>
            </span>
          </NavLink>
          
          <nav className="flex flex-wrap items-center md:ml-12 space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${
                  isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : 'text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${
                  isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : 'text-white'
                }`
              }
            >
              Countries
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${
                  isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : 'text-white'
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}