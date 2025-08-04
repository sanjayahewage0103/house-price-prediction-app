import React from 'react';
import logo from "../assets/hometrix-logo.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
          {/* Brand Section */}
          <div className="space-y-2 md:col-span-2">
        
            {/* Logo */}
            <div className="my-2">
              <img src={logo} alt="HomeTrix Logo" className="w-auto h-12.5" />
            </div>
            
            <p className="text-gray-500 text-xs leading-tight">
              An AI-powered real estate valuation tool developed as a part of the CIS 6005 module.
            </p>
          </div>

          {/* Navigate Section */}
          <div className="space-y-2 text-center">
            <h4 className="font-semibold text-gray-300 mb-2">Navigate</h4>
            <div className="space-y-1">
              <a href="/" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">Home</a>
              <a href="/about" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">About</a>
              <a href="/predict" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">Predict</a>
              <a href="/contact" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">Contact</a>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-2 text-center">
            <h4 className="font-semibold text-gray-300 mb-2">Company</h4>
            <div className="space-y-1">
              <a href="/about" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">About</a>
              <a href="/contact" className="block text-gray-500 hover:text-orange-400 transition-colors duration-200 text-xs">Contact</a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-300 mb-2">Connect With Me</h4>
            <div className="flex space-x-3 mb-2">
              <a href="mailto:pethumhewage66@gmail.com" 
                 className="text-gray-500 hover:text-red-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/sanjayahewage" 
                 className="text-gray-500 hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://facebook.com/sanjayahewage" 
                 className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="tel:+94713746155" 
                 className="text-gray-500 hover:text-green-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </a>
            </div>
            <div className="mt-2">
              <p className="text-xs text-orange-400 font-semibold">💡 "Code, Create & Inspire"</p>
              <p className="text-xs text-gray-500">Building the future, one line of code at a time ✨</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-4 pt-3 text-center">
          <p className="text-xs text-gray-500">
            Copyright © {currentYear} Sanjaya Hewage (SP) | 
            A creation of <span className="text-orange-400">SP DevFest | SP Solutions & Holdings</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;