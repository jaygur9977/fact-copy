import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">Smart AQI Controller</h2>
          <p className="mt-2 text-sm">
            Real-time industrial emission control to ensure cleaner air and smarter cities.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#team" className="hover:text-white">Team</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
          <div className="flex space-x-4 text-sm">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
          </div>
          <p className="text-sm mt-4">Email: smartaqi@project.com</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; 2025 Smart AQI Controller. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;