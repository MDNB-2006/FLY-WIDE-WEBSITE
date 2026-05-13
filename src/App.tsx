/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Calendar, Users, Home, Info, Mail, BookOpen, ArrowRight, ChevronRight, Menu, X, Instagram, Facebook, Twitter, ShieldCheck, Star } from 'lucide-react';

// --- Types ---
interface Destination {
  id: string;
  name: string;
  country: string;
  price: number;
  image: string;
  featured?: boolean;
}

const getImagePath = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};

// --- Constants ---
const DESTINATIONS: Destination[] = [
  { id: '1', name: 'New York City', country: 'USA', price: 8500, image: getImagePath('/assets/images/regenerated_image_1778674850866.png'), featured: true },
  { id: '2', name: 'London', country: 'UK', price: 7200, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80', featured: true },
  { id: '3', name: 'Dubai', country: 'UAE', price: 4500, image: getImagePath('/assets/images/regenerated_image_1778674852034.png'), featured: true },
  { id: '4', name: 'Agra', country: 'India', price: 2800, image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80', featured: true },
  { id: '5', name: 'Singapore City', country: 'Singapore', price: 5500, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80' },
  { id: '6', name: 'Bangkok', country: 'Thailand', price: 2200, image: getImagePath('/assets/images/regenerated_image_1778674853111.png') },
  { id: '7', name: 'Queenstown', country: 'New Zealand', price: 9800, image: 'https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80' },
  { id: '8', name: 'Tokyo', country: 'Japan', price: 6800, image: getImagePath('/assets/images/regenerated_image_1778674854357.png') },
  { id: '9', name: 'Paris', country: 'France', price: 7800, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80' },
  { id: '10', name: 'Rome', country: 'Italy', price: 6500, image: getImagePath('/assets/images/regenerated_image_1778674855717.png') },
  { id: '11', name: 'Zermatt', country: 'Switzerland', price: 11200, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80' },
  { id: '12', name: 'Sydney', country: 'Australia', price: 8900, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80' },
  { id: '13', name: 'Banff', country: 'Canada', price: 7400, image: 'https://images.unsplash.com/photo-1464851707681-f9d5fdaccea8?auto=format&fit=crop&q=80' },
  { id: '14', name: 'Malé', country: 'Maldives', price: 12500, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80' },
  { id: '15', name: 'Istanbul', country: 'Turkey', price: 3800, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80' },
  { id: '16', name: 'Santorini', country: 'Greece', price: 8200, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80' },
  { id: '17', name: 'Barcelona', country: 'Spain', price: 5900, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80' },
  { id: '18', name: 'Rio de Janeiro', country: 'Brazil', price: 7100, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80' },
  { id: '19', name: 'Cape Town', country: 'South Africa', price: 6300, image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80' },
  { id: '20', name: 'Giza', country: 'Egypt', price: 3200, image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80' },
  { id: '21', name: 'Hanoi', country: 'Vietnam', price: 2100, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80' },
  { id: '22', name: 'Seoul', country: 'South Korea', price: 6100, image: getImagePath('/assets/images/regenerated_image_1778674856657.png') },
  { id: '23', name: 'Bali', country: 'Indonesia', price: 2500, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80' },
  { id: '24', name: 'Reykjavik', country: 'Iceland', price: 9200, image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80' },
  { id: '25', name: 'Bergen', country: 'Norway', price: 8800, image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80' },
  { id: '26', name: 'Cusco', country: 'Peru', price: 5400, image: getImagePath('/assets/images/regenerated_image_1778674669751.png') },
  { id: '27', name: 'Mexico City', country: 'Mexico', price: 4200, image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&q=80' },
  { id: '28', name: 'Lisbon', country: 'Portugal', price: 4900, image: getImagePath('/assets/images/regenerated_image_1778674670998.png') },
  { id: '29', name: 'Amsterdam', country: 'Netherlands', price: 6200, image: getImagePath('/assets/images/regenerated_image_1778674672438.png') },
  { id: '30', name: 'Marrakesh', country: 'Morocco', price: 3500, image: getImagePath('/assets/images/regenerated_image_1778674673688.png') },
  { id: '31', name: 'Prague', country: 'Czech Republic', price: 4400, image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80' },
  { id: '32', name: 'Vienna', country: 'Austria', price: 5800, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80' },
];

const NAV_LINKS = [
  { name: 'Destinations', id: 'destinations' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : 'bg-white/80 backdrop-blur-sm py-5 border-b border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="p-1.5 rounded-full bg-black text-white transition-colors">
            <Globe size={20} className="group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-black">
            FLY WIDE
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="text-sm font-semibold tracking-tight hover:text-blue-600 transition-colors text-black"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('booking')}
            className="px-8 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-black text-white hover:bg-gray-800"
          >
            Book Now
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="text-black" /> : <Menu className="text-black" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-2xl font-bold tracking-tight text-black"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  onNavigate('booking');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-black text-white py-4 rounded-xl font-bold"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onAction }: { onAction: () => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-black text-[10px] uppercase tracking-[0.2em] font-bold mb-8">
            Premium Global Travel
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tight leading-none mb-12">
            Explore The <br/> World.
          </h1>
          <p className="text-lg text-black/60 mb-12 max-w-md mx-auto">
            Curated luxury expeditions to over 100 countries. Experience travel designed for the connoisseur.
          </p>
          <button 
            onClick={onAction}
            className="group flex flex-col items-center mx-auto space-y-4"
          >
            <div className="flex items-center space-x-4 bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20">
              <span>Start Your Journey</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-black/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-4">Scroll to discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-black/20 to-transparent" />
      </motion.div>
    </section>
  );
};

interface DestinationCardProps {
  destination: Destination;
  onClick: () => void;
  key?: string | number;
}

const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer glass rounded-2xl p-2 transition-all"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="px-2 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold tracking-tight text-black">{destination.name}, {destination.country}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Starting At</span>
          <span className="price-tag">AED {destination.price.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

const HomeView = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const featured = DESTINATIONS.filter(d => d.featured);
  const others = DESTINATIONS.filter(d => !d.featured);

  const stats = [
    { label: 'Countries', value: '100+' },
    { label: 'Travelers', value: '50,000+' },
    { label: 'Awards', value: '25+' },
    { label: 'Satisfaction', value: '100%' },
  ];

  return (
    <div className="bg-[#F5F5F7]">
      <Hero onAction={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} />
      
      {/* Stats Bar */}
      <section className="stats-bar py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="text-center flex-1 min-w-[120px]">
                <div className="text-2xl md:text-3xl font-bold mb-1 text-black">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-black/60 font-bold">{stat.label}</div>
              </div>
              {i < stats.length - 1 && <div className="hidden md:block h-10 w-px bg-black/10" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-black tracking-tight">Featured Destinations</h2>
          <button className="text-sm font-semibold text-black/80 hover:text-black hover:underline transition-colors">View All 190+ Countries</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((dest) => (
            <DestinationCard 
              key={dest.id} 
              destination={dest} 
              onClick={() => onNavigate('booking')} 
            />
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-black mb-4 block underline underline-offset-4">Our Full Collection</span>
              <h2 className="text-5xl font-bold text-black tracking-tight leading-none">
                Global Explorer <br/> Selection
              </h2>
            </div>
            <div className="text-black/60 max-w-md text-sm leading-relaxed font-medium">
              Discover over 30 hand-curated destinations across the globe. Each journey is crafted to provide a unique, immersive experience.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8">
            {others.map((dest) => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onClick={() => onNavigate('booking')} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutView = () => {
  return (
    <div className="bg-[#F5F5F7] pt-32 pb-32">
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-black mb-8 block underline underline-offset-8">Our Story</span>
            <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tight leading-none mb-12">
              CURATING <br/> MOMENTS.
            </h2>
            <p className="text-black/80 text-lg leading-relaxed mb-8 font-medium">
              Founded on the belief that travel should be an art form, FLY WIDE has spent the last decade curating the world's most immersive experiences. From the silent glaciers of Iceland to the vibrant streets of Tokyo, we bring you closer to the world's soul.
            </p>
            <p className="text-black/60 text-lg leading-relaxed font-medium">
              We design memories. Our team of global explorers meticulously vets every hotel, guide, and experience to ensure your journey is nothing short of extraordinary.
            </p>
          </motion.div>
          <div className="relative glass p-2 rounded-3xl overflow-hidden aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80" 
              alt="Story" 
              className="w-full h-full object-cover rounded-2xl shadow-inner"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactView = () => {
  return (
    <div className="bg-[#F5F5F7] pt-32 min-h-screen flex items-center">
      <section className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tight leading-[0.9] mb-12">
              Get in <br/> Touch.
            </h2>
            <div className="space-y-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold mb-4 block underline underline-offset-8">Email Our Experts</span>
                <p className="text-2xl text-black font-semibold">concierge@flywide.com</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold mb-4 block underline underline-offset-8">Direct Line</span>
                <p className="text-2xl text-black font-semibold">+971 4 000 0000</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold mb-4 block underline underline-offset-8">Main Office</span>
                <p className="text-2xl text-black font-semibold">Dubai Design District, Building 4<br/>Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-[40px]">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-transparent border-b border-gray-200 px-0 py-4 text-black focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-transparent border-b border-gray-200 px-0 py-4 text-black focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold">Interested Destination</label>
                <select className="w-full bg-transparent border-b border-gray-200 px-0 py-4 text-black focus:outline-none focus:border-blue-600 transition-colors appearance-none font-medium">
                  <option className="bg-white">Select a destination</option>
                  {DESTINATIONS.map(d => (
                    <option key={d.id} value={d.id} className="bg-white">{d.name}, {d.country}</option>
                  ))}
                </select>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs mt-8 shadow-xl shadow-black/10 hover:bg-gray-800 transition-colors"
              >
                Send Inquiry
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const BookingView = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    guests: 2,
    type: 'luxury'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-[#F5F5F7] pt-32 min-h-screen flex items-center">
      <section className="max-w-4xl mx-auto px-6 w-full py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/60 font-bold mb-4 block">Secure Reservation</span>
          <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tight">Trip Details.</h2>
          
          <div className="flex items-center justify-center mt-12 space-x-4">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${step === i ? 'bg-black text-white' : step > i ? 'bg-black/10 text-black' : 'bg-white text-black/20 border border-gray-100'}`}>
                  {i}
                </div>
                {i < 3 && <div className={`w-12 h-px ${step > i ? 'bg-blue-600/40' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="glass p-10 md:p-16 rounded-[40px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-[0.2em] text-black/60 font-black">Choose Your Destination</label>
                  <select 
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-2xl text-black font-bold focus:outline-none focus:border-blue-600 appearance-none transition-colors"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  >
                    <option value="" className="bg-white">Select Destination...</option>
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id} className="bg-white">{d.name}, {d.country}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.2em] text-black/60 font-black">Travel Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-xl text-black font-semibold focus:outline-none focus:border-blue-600 transition-colors"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.2em] text-black/60 font-black">Number of Guests</label>
                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <button onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})} className="text-black hover:text-blue-600 transition-colors">
                        <Users size={20} className="inline mr-2" /> -
                      </button>
                      <span className="text-2xl font-bold text-black">{formData.guests}</span>
                      <button onClick={() => setFormData({...formData, guests: formData.guests + 1})} className="text-black hover:text-blue-600 transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <label className="text-xs uppercase tracking-[0.2em] text-black/60 font-black">Service Tier</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Classic', 'Luxury', 'Artisan'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, type: type.toLowerCase()})}
                        className={`p-8 rounded-3xl border transition-all text-left ${formData.type === type.toLowerCase() ? 'bg-black text-white border-black' : 'bg-white/50 text-black border-gray-100 hover:border-blue-600/30'}`}
                      >
                        <div className="font-bold text-xl mb-2">{type}</div>
                        <div className={`text-xs ${formData.type === type.toLowerCase() ? 'opacity-60' : 'text-black/40'}`}>
                          {type === 'Classic' && 'Standard premium stay'}
                          {type === 'Luxury' && 'All inclusive private suite'}
                          {type === 'Artisan' && 'Unique local boutique stay'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-blue-600/10">
                  <ShieldCheck size={48} className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-black tracking-tight">Review Your Selection</h3>
                <div className="bg-white/30 p-8 rounded-3xl text-left space-y-4 max-w-sm mx-auto shadow-sm border border-white/50">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-black/40 text-xs uppercase tracking-widest font-bold">Destination</span>
                    <span className="text-black font-bold">{DESTINATIONS.find(d => d.id === formData.destination)?.name || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-black/40 text-xs uppercase tracking-widest font-bold">Date</span>
                    <span className="text-black font-bold">{formData.date || 'TBD'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-black/40 text-xs uppercase tracking-widest font-bold">Guests</span>
                    <span className="text-black font-bold">{formData.guests} People</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/40 text-xs uppercase tracking-widest font-bold">Tier</span>
                    <span className="text-black font-bold capitalize">{formData.type}</span>
                  </div>
                </div>
                <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Our concierge will contact you within 2 hours to finalize.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-100">
            <button 
              onClick={prevStep}
              className={`text-sm font-bold uppercase tracking-widest text-black hover:text-blue-600 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Back
            </button>
            <button 
              onClick={step === 3 ? () => alert('Booking Inquiry Sent!') : nextStep}
              className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
            >
              {step === 3 ? 'Finalize Inquiry' : 'Continue'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-1.5 rounded-full bg-black text-white">
                <Globe size={16} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-black">FLY WIDE</span>
            </div>
            <p className="text-black/80 max-w-sm mb-8 leading-relaxed font-medium">
              Crafting premium travel experiences for the modern explorer. Based in Dubai, exploring the universe.
            </p>
            <div className="flex space-x-6">
              <Instagram className="text-black/40 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
              <Facebook className="text-black/40 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
              <Twitter className="text-black/40 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          <div>
            <h4 className="text-black font-bold mb-6 tracking-tight text-sm uppercase">Explore</h4>
            <ul className="space-y-4 text-black/60 text-xs font-bold uppercase tracking-widest">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Private Jets</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Luxury Resorts</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Exclusive Tours</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Global Events</li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-bold mb-6 tracking-tight text-sm uppercase">Support</h4>
            <ul className="space-y-4 text-black/60 text-xs font-bold uppercase tracking-widest">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Concierge Team</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Trip Insurance</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Global Policies</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/40 text-[10px] font-bold tracking-[0.2em]">© 2024 FLY WIDE LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-4 text-black/40 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Global Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar onNavigate={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HomeView onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutView />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ContactView />
            </motion.div>
          )}

          {currentPage === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <BookingView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
