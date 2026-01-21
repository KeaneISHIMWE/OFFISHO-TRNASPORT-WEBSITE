import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-midnight text-silver mt-auto relative overflow-hidden border-t border-purple-electric/30">

      {/* Footer Content */}
      <div className="container mx-auto py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Company Information */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="flex items-center gap-2 group touch-target">
              <div className="w-10 h-10 bg-purple-card rounded-xl flex items-center justify-center shadow-lg neon-border">
                <span className="text-purple-electric font-bold text-lg sm:text-xl neon-glow">OT</span>
              </div>
              <span className="text-lg sm:text-xl font-display font-bold tracking-tight">
                Offisho <span className="electric-gradient-text">Transport</span>
              </span>
            </Link>
            <p className="text-silver/70 text-xs sm:text-sm leading-relaxed">
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
                  className="touch-target w-10 h-10 rounded-full bg-purple-card flex items-center justify-center text-silver/60 hover:bg-purple-electric hover:text-white active:bg-purple-electric/80 transition-all duration-300 neon-border hover:neon-glow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold mb-4 sm:mb-6 text-silver">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4 text-silver/70">
              <li><Link to="/" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Home</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Our Fleet</Link></li>
              <li><Link to="/about" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold mb-4 sm:mb-6 text-silver">Our Services</h3>
            <ul className="space-y-3 sm:space-y-4 text-silver/70">
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Wedding Transportation</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Corporate Events</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">Airport Transfers</Link></li>
              <li><Link to="/cars" className="touch-target block py-1 hover:text-purple-electric active:text-purple-electric/80 transition-colors">VIP Services</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold mb-4 sm:mb-6 text-silver">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-silver/70">
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
        <div className="border-t border-purple-electric/30 pt-6 sm:pt-8 mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-silver/60 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Offisho Transport. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-silver/60 justify-center sm:justify-end">
            <Link to="/privacy" className="touch-target hover:text-purple-electric active:text-purple-electric/80 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="touch-target hover:text-purple-electric active:text-purple-electric/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
