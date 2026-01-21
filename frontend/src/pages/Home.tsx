import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Shield, Clock, Car, Gauge, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 bg-purple-midnight">
        {/* Global Illumination Effect */}
        <div className="absolute inset-0 z-0 global-illumination"></div>
        {/* Aurora Glow Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(157, 80, 255, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(209, 163, 255, 0.2) 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto text-center">
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
              className="inline-block px-3 py-1.5 sm:px-4 rounded-full border border-purple-electric/30 bg-purple-card/50 text-purple-electric font-medium text-xs sm:text-sm mb-4 sm:mb-6 glass-effect neon-border"
            >
              Premium Event Car Rentals
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-silver mb-4 sm:mb-6 leading-tight tracking-tight px-2">
              Arrive in <span className="electric-gradient-text">Style</span> at <br className="hidden sm:block" /> Every Event
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-silver/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Experience the ultimate comfort and elegance with our premium fleet of luxury vehicles.
              Perfect for weddings, corporate events, and VIP transport in Rwanda.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4">
              <Link
                to="/booking"
                className="touch-target w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 electric-gradient hover:opacity-90 active:opacity-80 text-white rounded-xl font-semibold shadow-lg neon-glow transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Book Your Ride
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/cars"
                className="touch-target w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-card border-2 border-purple-electric text-purple-electric hover:bg-purple-card/80 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 neon-border neon-border-hover"
              >
                View Our Fleet
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-purple-electric/30 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
              {[
                { label: "Trusted Service", icon: Shield },
                { label: "Premium Fleet", icon: Car },
                { label: "24/7 Support", icon: Clock },
                { label: "Expert Drivers", icon: Star }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 sm:gap-2 text-silver/70">
                  <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-electric neon-glow" />
                  <span className="text-xs sm:text-sm font-medium text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Fleet Preview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-purple-midnight relative">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-silver mb-2 sm:mb-4">Our Premium Fleet</h2>
            <p className="text-sm sm:text-base text-silver/70">Select from our exclusive collection of luxury vehicles</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-purple-card relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-silver mb-4 sm:mb-6">
                Why Choose <span className="electric-gradient-text">Offisho?</span>
              </h2>
              <p className="text-silver/80 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                We don't just provide transportation; we deliver an experience.
                Our commitment to excellence ensures your journey is as memorable as your destination.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { title: "Immaculate Condition", desc: "Every vehicle is detailed to perfection before your ride." },
                  { title: "Professional Chauffeurs", desc: "Experienced, discreet, and punctual drivers." },
                  { title: "Flexible Packages", desc: "Tailored solutions for weddings, corporate, and leisure." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-midnight text-purple-electric flex items-center justify-center touch-target neon-border">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 neon-glow" />
                    </div>
                    <div>
                      <h3 className="text-silver font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                      <p className="text-silver/70 text-sm sm:text-base">{item.desc}</p>
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
              <div className="absolute -bottom-6 -left-6 bg-purple-card border border-purple-electric/30 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block neon-border bento-tile">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-midnight bg-purple-electric/30 block neon-glow" />
                    ))}
                  </div>
                  <div>
                    <p className="text-silver font-bold">500+ Happy Clients</p>
                    <p className="text-silver/60 text-xs">Rated 5.0/5 Stars</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-purple-midnight">
        <div className="absolute inset-0 global-illumination opacity-30"></div>
        <div className="container mx-auto relative z-10 text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-silver mb-4 sm:mb-6">Ready to Experience Luxury?</h2>
          <p className="text-silver/80 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
            Book your dream car today and elevate your next event. Seamless booking, instant confirmation.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <Link to="/booking" className="touch-target px-6 sm:px-8 py-3 sm:py-4 electric-gradient hover:opacity-90 active:opacity-80 text-white rounded-xl font-bold shadow-lg neon-glow transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl">
              Book Now
            </Link>
            <Link to="/contact" className="touch-target px-6 sm:px-8 py-3 sm:py-4 bg-purple-card border-2 border-purple-electric hover:bg-purple-card/80 text-purple-electric rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 neon-border neon-border-hover">
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
      className="group relative rounded-2xl overflow-hidden bg-purple-card border border-purple-electric/30 hover:border-purple-electric transition-all duration-500 neon-border neon-border-hover"
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
        <div className="absolute inset-0 bg-gradient-to-t from-purple-midnight via-purple-midnight/80 to-transparent opacity-90" />
        
        {/* Global Illumination behind image */}
        <div className="absolute inset-0 global-illumination opacity-50"></div>
        
        {/* Specs Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-midnight/95 backdrop-blur-sm"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-electric">
              <Zap className="w-5 h-5 neon-glow" />
              <span className="text-xl font-bold text-silver">{car.specs.hp}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-silver">
              <Gauge className="w-5 h-5 text-purple-electric neon-glow" />
              <span className="text-lg">{car.specs.topSpeed}</span>
            </div>
            <div className="text-silver/60 text-sm">Year {car.specs.year}</div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span className="px-3 py-1 text-xs font-medium electric-gradient text-white rounded-full mb-3 inline-block neon-glow">
          {car.tag}
        </span>
        <h3 className="text-xl font-display font-bold text-silver mb-1">{car.name}</h3>
        <p className="electric-gradient-text font-bold text-lg">{car.price} <span className="text-silver/60 text-sm font-normal">/ day</span></p>
      </div>
    </motion.div>
  );
};

export default Home;
