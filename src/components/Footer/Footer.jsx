import React from "react";
import { Link } from 'react-router-dom';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className="w-5 h-5" />,
    name: "YouTube"
  },
  {
    path: "https://github.com/eraydmrcoglu",
    icon: <AiFillGithub className="w-5 h-5" />,
    name: "GitHub"
  },
  {
    path: "https://www.instagram.com",
    icon: <AiOutlineInstagram className="w-5 h-5" />,
    name: "Instagram"
  },
  {
    path: "https://www.linkedin.com/in/eraydemircioglu/",
    icon: <RiLinkedinFill className="w-5 h-5" />,
    name: "LinkedIn"
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold mb-4">
              <span className="text-white">Nirvana</span>
              <span className="text-primaryColor">360</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your path to complete wellness. We provide world-class healthcare services with compassion and expertise.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <HiLocationMarker className="w-5 h-5 text-primaryColor mr-3" />
                <span className="text-sm">123 Wellness Street, Health City</span>
              </div>
              <div className="flex items-center text-gray-300">
                <HiPhone className="w-5 h-5 text-primaryColor mr-3" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <HiMail className="w-5 h-5 text-primaryColor mr-3" />
                <span className="text-sm">info@nirvana360.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-10 h-10 bg-gray-700 hover:bg-primaryColor rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  title={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks01.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-primaryColor transition-colors duration-200 text-sm"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* I Want To */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">I Want To:</h3>
            <ul className="space-y-3">
              {quickLinks02.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-primaryColor transition-colors duration-200 text-sm"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-primaryColor transition-colors duration-200 text-sm"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {year} Nirvana360. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primaryColor text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primaryColor text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primaryColor text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
