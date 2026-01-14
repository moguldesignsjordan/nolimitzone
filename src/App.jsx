import './index.css';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Gamepad2, PartyPopper, Ticket, MapPin, Calendar, CreditCard, ShieldCheck, Users, Zap, Trophy, Star, Heart, Lightbulb } from 'lucide-react';

// --- Helper Component: Automated Counter ---
const Counter = ({ from, to }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2,
      onUpdate: (value) => setCount(Math.floor(value)),
    });
    return () => controls.stop();
  }, [from, to]);

  return <span>{count}</span>;
};

// Simple animation helper
const animate = (from, to, options) => {
  const start = performance.now();
  const requestFrame = requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / (options.duration * 1000);
    if (timeFraction > 1) timeFraction = 1;
    
    const progress = timeFraction; // Linear easing
    const current = from + (to - from) * progress;
    options.onUpdate(current);
    
    if (timeFraction < 1) requestAnimationFrame(animate);
  });
  return { stop: () => cancelAnimationFrame(requestFrame) };
};


// --- Main Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-nlzDark/90 backdrop-blur-md z-50 border-b border-purple-800 shadow-lg shadow-purple-900/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2">
          <div className="bg-nlzRed p-2 rounded-lg">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">
            NO LIMIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">ZONE</span>
          </span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-8">
            {['Attractions', 'Parties', 'Membership'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-nlzRed transition-colors font-bold uppercase text-sm tracking-wide">
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-nlzRed to-red-600 hover:from-red-600 hover:to-nlzRed px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-red-900/50">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image Placeholder with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2671&auto=format&fit=crop" 
        alt="Arcade Background" 
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nlzDark via-nlzDark/80 to-purple-900/30"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-purple-500 bg-purple-900/30 backdrop-blur-sm text-purple-300 font-bold text-sm uppercase tracking-widest">
          West Virginia's #1 Fun Zone
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none drop-shadow-2xl">
          LEVEL UP <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 filter drop-shadow-lg">
            YOUR FUN
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-200 font-medium drop-shadow-md">
          The ultimate indoor entertainment center. <br/>Arcades, VR, Parties, and zero limits.
        </p>
        
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-nlzPurple hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl shadow-purple-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
            <Ticket className="w-6 h-6" /> Get Passes
          </button>
          <button className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-2">
            <PartyPopper className="w-6 h-6" /> Plan Party
          </button>
        </div>
      </motion.div>
    </div>
  </div>
);

// New "Automated" Stats Section
const StatsStrip = () => (
  <div className="bg-purple-900/20 border-y border-white/5 backdrop-blur-sm py-10 relative z-20 -mt-20 mb-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { label: "Arcade Games", val: 150, icon: Gamepad2 },
        { label: "Happy Families", val: 5000, icon: Users },
        { label: "Prizes Won", val: 12000, icon: Trophy },
        { label: "Parties Hosted", val: 450, icon: PartyPopper },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center"
        >
          <stat.icon className="w-8 h-8 text-nlzRed mb-2" />
          <div className="text-3xl md:text-4xl font-black text-white">
            <Counter from={0} to={stat.val} />+
          </div>
          <div className="text-gray-400 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const FeatureCard = ({ image, title, desc, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all shadow-2xl"
  >
    <div className="h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 right-4 z-20 bg-nlzRed/90 p-2 rounded-lg backdrop-blur-sm">
        <Icon className="text-white w-6 h-6" />
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Features = () => (
  <section id="attractions" className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Unlimited Action</h2>
        <p className="text-purple-400 font-bold uppercase tracking-widest text-sm">Explore Our Zones</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Gamepad2} 
          image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
          title="Neon Arcade" 
          desc="Step into the future with 150+ games ranging from high-speed racing simulators to classic redemption games." 
        />
        <FeatureCard 
          icon={Users} 
          image="https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2600&auto=format&fit=crop"
          title="Safe Kids Zone" 
          desc="A dedicated, padded soft-play area for toddlers and younger children. Fun for them, relaxing for you." 
        />
        <FeatureCard 
          icon={Zap} 
          image="https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=2526&auto=format&fit=crop"
          title="VR Experience" 
          desc="Immersive virtual reality battles and adventures. Put on the headset and transport to another world." 
        />
      </div>
    </div>
  </section>
);

const Membership = () => (
  <section id="membership" className="py-20 relative overflow-hidden bg-gradient-to-b from-nlzDark to-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Join the <br/>
            <span className="text-nlzPurple">VIP Club</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Skip the lines with our automated PrePay system. Members get exclusive access to events, free play hours, and food discounts.
          </p>
          <div className="flex gap-4 text-sm font-bold text-gray-300">
             <div className="flex items-center gap-2"><ShieldCheck className="text-green-400"/> Cancel Anytime</div>
             <div className="flex items-center gap-2"><CreditCard className="text-green-400"/> Instant Access</div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          {/* Featured Pricing Card */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-1 p-1 shadow-2xl shadow-purple-900/50 transform hover:scale-[1.02] transition-transform">
            <div className="bg-gray-900 rounded-[22px] p-8 md:p-12 h-full relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-nlzRed text-white text-xs font-bold px-4 py-2 rounded-bl-xl">POPULAR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Gold Membership</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white">$45</span>
                <span className="text-gray-500">/month</span>
              </div>
              
              <div className="space-y-4 mb-10">
                {['Unlimited Arcade Access', '10% Off Birthday Parties', 'Priority Booking', 'Exclusive Events'].map((feat, i) =>(
                   <div key={i} className="flex items-center gap-3">
                     <div className="bg-purple-500/20 p-1 rounded-full"><Star size={14} className="text-purple-400"/></div>
                     <span className="text-gray-300 font-medium">{feat}</span>
                   </div>
                ))}
              </div>
              
              <button className="w-full bg-white text-purple-900 font-black py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                Become a Member
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black py-12 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex justify-center items-center gap-2 mb-8">
        <Gamepad2 className="text-nlzRed w-8 h-8" />
        <span className="font-bold text-2xl text-white">NoLimitZone</span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-left bg-gray-900 p-8 rounded-2xl border border-gray-800">
         <div className="flex items-start gap-4">
            <MapPin className="text-purple-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Visit Us</h4>
              <p className="text-gray-400 text-sm">1556 E Main St<br/>Oak, West Virginia</p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <Calendar className="text-red-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Hours</h4>
              <p className="text-gray-400 text-sm">Mon-Sun: 10am - 10pm<br/>Happy Hour: 4pm-6pm</p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <Ticket className="text-orange-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Support</h4>
              <p className="text-gray-400 text-sm">help@nolimitzone.com<br/>(555) 123-4567</p>
            </div>
         </div>
      </div>

      <div className="border-t border-gray-900 pt-10 flex flex-col items-center gap-6">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} No Limit Zone. All rights reserved.
        </p>
        
        {/* Mogul Design Agency Tag */}
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <span>Created with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="mr-1">by</span>
          
          <a 
            href="https://moguldesignagency.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-[#150a26] border border-purple-900/50 rounded-full pl-3 pr-5 py-2 transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <Lightbulb className="w-4 h-4 text-purple-400 group-hover:text-yellow-400 transition-colors" />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent font-bold tracking-widest text-xs uppercase">
              Mogul Design Agency
            </span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="font-sans antialiased text-white min-h-screen bg-nlzDark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsStrip />
        <Features />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}

export default App;