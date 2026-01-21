import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-purple-deep mt-auto relative overflow-hidden border-t border-lavender">

      {/* Footer Content */}
      <div className="container mx-auto py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Company Information */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="flex items-center gap-2 group touch-target">
              <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center shadow-lg neumorphism">
                <span className="text-purple-electric font-bold text-lg sm:text-xl">OT</span>
              </div>
              <span className="text-lg sm:text-xl font-display font-black tracking-tight">
                Offisho<span className="text-gradient-purple">Transport</span>
              </span>
            </Link>
            <p className="text-purple-deep/70 text-xs sm:text-sm leading-relaxed">
              Your premium choice for luxury event transportation in Rwanda.
              Making every journey an experience to remember with elegance and style.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-purple-deep/60 hover:bg-purple-electric hover:text-white active:bg-purple-electric/80 transition-all duration-300 neumorphism"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-black mb-4 sm:mb-6 text-purple-deep">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4 text-purple-deep/70">
              <li><Link to="/" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Home</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Our Fleet</Link></li>
              <li><Link to="/about" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-black mb-4 sm:mb-6 text-purple-deep">Our Services</h3>
            <ul className="space-y-3 sm:space-y-4 text-purple-deep/70">
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Wedding Transportation</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Corporate Events</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Airport Transfers</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">VIP Services</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-black mb-4 sm:mb-6 text-purple-deep">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-purple-deep/70">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-electric mt-1 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Musanze, Rwanda</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-electric mt-1 flex-shrink-0" />
                <a href="tel:0785344214" className="touch-target text-xs sm:text-sm hover:text-purple-electric transition-colors">0 785 344 214</a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-electric mt-1 flex-shrink-0" />
                <a href="mailto:prospertuop@gmail.com" className="touch-target text-xs sm:text-sm hover:text-purple-electric transition-colors break-all">prospertuop@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-lavender pt-6 sm:pt-8 mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-purple-deep/60 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Offisho Transport. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-purple-deep/60 justify-center sm:justify-end">
            <Link to="/privacy" className="touch-target hover:text-purple-electric active:text-purple-electric/80 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="touch-target hover:text-purple-electric active:text-purple-electric/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
