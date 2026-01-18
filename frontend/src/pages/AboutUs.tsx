import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, UserCheck, Clock, Shield, Calendar, Award, Heart } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-4">
              About Offisho
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-center mb-6 text-white"
            >
              Your Trusted Partner for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">Event Transportation</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-center max-w-3xl mx-auto text-slate-400"
            >
              For over 15 years, Offisho Transport has been the premier choice for luxury event transportation, delivering exceptional service for weddings, corporate events, and special occasions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-20 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: '500+', label: 'Events Served', icon: Calendar },
              { number: '50+', label: 'Premium Vehicles', icon: Car },
              { number: '15+', label: 'Years Experience', icon: Clock },
              { number: '100%', label: 'Client Satisfaction', icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold mb-2 text-white">
                  {stat.number}
                </p>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Car,
                title: 'Premium Fleet',
                description: 'Our vehicles are meticulously maintained and represent the finest in automotive luxury.',
              },
              {
                icon: UserCheck,
                title: 'Professional Drivers',
                description: 'Experienced chauffeurs who prioritize your comfort, safety, and punctuality.',
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Round-the-clock service to accommodate any schedule or last-minute requests.',
              },
              {
                icon: Shield,
                title: 'Fully Insured',
                description: 'Complete insurance coverage for worry-free transportation to your events.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 group hover:bg-white/5"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
