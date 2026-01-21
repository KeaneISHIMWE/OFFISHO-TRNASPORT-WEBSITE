import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Shield, Clock, Car, Gauge, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1562519822-991c01825595?q=80&w=2669&auto=format&fit=crop"
          >
            <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
            {/* Fallback image if video fails */}
            <img
              src="https://images.unsplash.com/photo-1562519822-991c01825595?q=80&w=2669&auto=format&fit=crop"
              alt="Luxury Car Background"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-obsidian/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm mb-6 glass-effect"
            >
              Premium Event Car Rentals
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
              Arrive in <span className="text-gradient-blue">Style</span> at <br /> Every Event
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the ultimate comfort and elegance with our premium fleet of luxury vehicles.
              Perfect for weddings, corporate events, and VIP transport in Rwanda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-2 group"
              >
                Book Your Ride
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/cars"
                className="w-full sm:w-auto px-8 py-4 glass-card hover:bg-white/5 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                View Our Fleet
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Trusted Service", icon: Shield },
                { label: "Premium Fleet", icon: Car },
                { label: "24/7 Support", icon: Clock },
                { label: "Expert Drivers", icon: Star }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 text-slate-400">
                  <badge.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Fleet Preview */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Fleet</h2>
            <p className="text-slate-400">Select from our exclusive collection of luxury vehicles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Luxury Sedan",
                image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000&auto=format&fit=crop",
                price: "From 80k RWF",
                tag: "Business Class",
                specs: { hp: "320 HP", topSpeed: "250 km/h", year: "2024" }
              },
              {
                name: "Premium SUV",
                image: "https://images.unsplash.com/photo-1628278236109-1701389e0241?q=80&w=1000&auto=format&fit=crop",
                price: "From 120k RWF",
                tag: "First Class",
                specs: { hp: "450 HP", topSpeed: "280 km/h", year: "2024" }
              },
              {
                name: "Convertible",
                image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1000&auto=format&fit=crop",
                price: "From 150k RWF",
                tag: "Exclusive",
                specs: { hp: "500 HP", topSpeed: "300 km/h", year: "2024" }
              }
            ].map((car, idx) => (
              <FleetCard key={idx} car={car} idx={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cars" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
              View Full Fleet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-obsidian-light relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Why Choose <span className="text-gradient-blue">Offisho?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We don't just provide transportation; we deliver an experience.
                Our commitment to excellence ensures your journey is as memorable as your destination.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Immaculate Condition", desc: "Every vehicle is detailed to perfection before your ride." },
                  { title: "Professional Chauffeurs", desc: "Experienced, discreet, and punctual drivers." },
                  { title: "Flexible Packages", desc: "Tailored solutions for weddings, corporate, and leisure." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop"
                alt="Luxury Service"
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-slate-700 block" />
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-bold">500+ Happy Clients</p>
                    <p className="text-slate-400 text-xs">Rated 5.0/5 Stars</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to Experience Luxury?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Book your dream car today and elevate your next event. Seamless booking, instant confirmation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/booking" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40">
              Book Now
            </Link>
            <Link to="/contact" className="px-8 py-4 glass-card hover:bg-white/5 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Fleet Card Component with Hover Specs
interface FleetCardProps {
  car: {
    name: string;
    image: string;
    price: string;
    tag: string;
    specs: { hp: string; topSpeed: string; year: string };
  };
  idx: number;
}

const FleetCard: React.FC<FleetCardProps> = ({ car, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden glass-card border border-white/5 hover:border-primary/50 transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        {car.image ? (
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full skeleton flex items-center justify-center">
            <Car className="w-16 h-16 text-slate-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent opacity-90" />
        
        {/* Specs Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-obsidian/95 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Zap className="w-5 h-5" />
              <span className="text-xl font-bold">{car.specs.hp}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="text-lg">{car.specs.topSpeed}</span>
            </div>
            <div className="text-slate-400 text-sm">Year {car.specs.year}</div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-full mb-3 inline-block glow-blue">
          {car.tag}
        </span>
        <h3 className="text-xl font-display font-bold text-white mb-1">{car.name}</h3>
        <p className="text-primary font-medium">{car.price} <span className="text-slate-400 text-sm">/ day</span></p>
      </div>
    </motion.div>
  );
};

export default Home;
