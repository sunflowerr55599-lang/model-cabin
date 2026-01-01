import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6 border-t border-gray-100 font-montserrat">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
          <a href="#" className="text-[#ba1a1a] hover:underline font-medium">
            Contact us
          </a>
          <a href="#" className="text-[#ba1a1a] hover:underline font-medium">
            Account login
          </a>
          <a href="#" className="text-[#ba1a1a] hover:underline font-medium">
            Privacy Policy
          </a>
          <a href="#" className="text-[#ba1a1a] hover:underline font-medium">
            Terms
          </a>
        </div>

        <div className="text-center text-gray-400 text-sm font-light tracking-wide">
          Rock Management (Brighton) Ltd T/AS The Model Cabin UK © 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
