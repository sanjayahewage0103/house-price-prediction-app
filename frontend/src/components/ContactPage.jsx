import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, Facebook, Github } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ fullName: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/pethumsanjayahewage0103'
    },
    {
      icon: Instagram,
      url: 'https://www.instagram.com/_pethum_sanjaya'
    },
    {
      icon: Facebook,
      url: 'https://www.facebook.com/sanjaya.hewage.sp'
    },
    {
      icon: Github,
      url: '#'
    }
  ];

  return (
    <div 
      className="min-h-screen py-16 px-6"
      style={{
        background: 'linear-gradient(115deg, rgb(15, 15, 15) 0%, rgb(0 0 0) 25%, rgb(0 0 0) 50%, rgb(26, 15, 10) 75%, rgb(0 0 0) 100%)',
        color: '#f5f5f5',
        fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Centered */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
            style={{ color: '#fbbf24' }}
          >
            Contact Us
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto leading-snug"
            style={{ color: '#d1d5db' }}
          >
            Have questions, feedback, or partnership inquiries? We'd love to hear from you. 
            Get in touch and let's discuss how Hometrix can help with your real estate valuation needs.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8" style={{ height: '400px' }}>
          {/* Left Column - Contact Info + Social Icons */}
          <div className="flex flex-col h-full">
            {/* Contact Information - Clean without borders */}
            <div className="space-y-4 flex-1">
              {/* Address */}
              <div className="group">
                <div className="flex items-start space-x-4 py-2">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #dc2626)',
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.3))'
                      }}
                    >
                      <MapPin size={18} className="text-black" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: '#fbbf24' }}
                    >
                      Address
                    </h3>
                    <p 
                      className="leading-tight text-base"
                      style={{ color: '#d1d5db' }}
                    >
                      Colombo, Western Province,<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <div className="flex items-start space-x-4 py-2">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #dc2626)',
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.3))'
                      }}
                    >
                      <Phone size={18} className="text-black" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: '#fbbf24' }}
                    >
                      Phone
                    </h3>
                    <p 
                      className="leading-tight text-base"
                      style={{ color: '#d1d5db' }}
                    >
                      +94 71 374 6155
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-start space-x-4 py-2">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #dc2626)',
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.3))'
                      }}
                    >
                      <Mail size={18} className="text-black" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: '#fbbf24' }}
                    >
                      Email
                    </h3>
                    <p 
                      className="leading-tight text-base"
                      style={{ color: '#d1d5db' }}
                    >
                      info.houseprice@tempmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Icons - No Title */}
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(120, 113, 108, 0.3)' }}>
              <div className="flex justify-start space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        style={{
                          background: 'rgba(41, 37, 36, 0.6)',
                          border: '1px solid rgba(120, 113, 108, 0.4)',
                          color: '#9ca3af'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24, #dc2626)';
                          e.currentTarget.style.color = '#000';
                          e.currentTarget.style.borderColor = '#fbbf24';
                          e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.4))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(41, 37, 36, 0.6)';
                          e.currentTarget.style.color = '#9ca3af';
                          e.currentTarget.style.borderColor = 'rgba(120, 113, 108, 0.4)';
                          e.currentTarget.style.filter = 'none';
                        }}
                      >
                        <IconComponent size={16} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col h-full">
            <div 
              className="rounded-xl p-4 h-full flex flex-col"
              style={{
                border: '2px solid rgba(251, 191, 36, 0.3)',
                background: 'rgba(41, 37, 36, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: '#fbbf24' }}
              >
                Send Message
              </h2>
              
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full py-2 bg-transparent outline-none transition-all duration-200 text-base leading-tight"
                    style={{
                      color: '#d1d5db',
                      borderBottom: '2px solid rgba(120, 113, 108, 0.4)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#fbbf24';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = 'rgba(120, 113, 108, 0.4)';
                    }}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-2 bg-transparent outline-none transition-all duration-200 text-base leading-tight"
                    style={{
                      color: '#d1d5db',
                      borderBottom: '2px solid rgba(120, 113, 108, 0.4)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#fbbf24';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = 'rgba(120, 113, 108, 0.4)';
                    }}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative flex-1 flex flex-col">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-2 bg-transparent outline-none transition-all duration-200 resize-none flex-1 text-base leading-tight"
                    style={{
                      color: '#d1d5db',
                      borderBottom: '2px solid rgba(120, 113, 108, 0.4)',
                      fontFamily: 'inherit',
                      minHeight: '60px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#fbbf24';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = 'rgba(120, 113, 108, 0.4)';
                    }}
                    placeholder="Type your Message..."
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none flex items-center justify-center space-x-2 text-base mt-3"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #dc2626)',
                    color: '#000',
                    filter: 'drop-shadow(0 4px 10px rgba(251, 191, 36, 0.3))'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'drop-shadow(0 6px 15px rgba(251, 191, 36, 0.4))';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'drop-shadow(0 4px 10px rgba(251, 191, 36, 0.3))';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <Send size={20} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;