import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { contactAPI } from '../services/api';
import { cn } from '../utils/cn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactAPI.sendMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We're here to help you plan your perfect event transportation. Reach out to us with any questions or special requests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send us a Message
            </h2>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-xl mb-4 flex items-center">
                Thank you! Your message has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-2xl border border-white/10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mr-5">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">Phone</h3>
                      <p className="text-slate-400">+250 788 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mr-5">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">Email</h3>
                      <p className="text-slate-400">info@offisho.com</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mr-5">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">Address</h3>
                      <p className="text-slate-400">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-8 relative overflow-hidden rounded-xl border border-white/10 h-64 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  title="Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.497311789123!2d30.0616!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0x2967a3b8e5e5e5e5!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
