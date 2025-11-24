import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ChevronRight, Target, Award, Users } from 'lucide-react';
import TerminalCard from '../components/TerminalCard';

const Home: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "join the hunt...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', 
               backgroundSize: '50px 50px' 
             }}>
        </div>
        
        <div className="z-10 w-full max-w-3xl">
          <TerminalCard title="crypton@root:~" glowing={true} className="shadow-2xl">
            <div className="text-lg md:text-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-2">
                <span className="text-cyber-neon font-bold">crypton@root:~$</span>
                <span className="text-white">init protocol --secure</span>
              </div>
              <div className="text-gray-400 text-sm italic">
                {'>'} Loading modules...<br/>
                {'>'} Establishing secure connection...<br/>
                {'>'} Access granted.
              </div>
              <div className="pt-4 text-2xl md:text-5xl font-bold text-white tracking-wide">
                <span className="text-cyber-neon">{'>'}</span> {text}
                <span className="animate-cursor-blink inline-block w-3 h-6 md:h-12 bg-cyber-neon ml-2 align-middle"></span>
              </div>
              <p className="pt-6 text-gray-300 max-w-xl text-sm md:text-base">
                The premier cybersecurity student organization. We break things to learn how to fix them. CTFs, Workshops, and Ethical Hacking.
              </p>
              
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/events" className="bg-cyber-neon text-black font-bold px-6 py-3 rounded hover:bg-white hover:shadow-[0_0_20px_#39FF14] transition-all flex items-center justify-center gap-2">
                  <Terminal size={18} />
                  Start Hacking
                </Link>
                <Link to="/members" className="border border-cyber-neon text-cyber-neon px-6 py-3 rounded hover:bg-cyber-neon/10 transition-all text-center">
                  Meet the Agents
                </Link>
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Target className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Capture The Flag</h3>
          <p className="text-gray-400 text-sm">
            Compete in jeopardy-style and attack-defense CTFs. Test your skills in web, crypto, pwn, and reverse engineering.
          </p>
        </div>
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Users className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Community & Networking</h3>
          <p className="text-gray-400 text-sm">
            Connect with like-minded security enthusiasts and industry professionals. Your network is your net worth.
          </p>
        </div>
        <div className="p-6 border border-cyber-dim rounded bg-cyber-dark hover:border-cyber-neon transition-colors group">
          <Award className="w-12 h-12 text-cyber-neon mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Skill Building</h3>
          <p className="text-gray-400 text-sm">
            Weekly workshops ranging from Linux basics to advanced binary exploitation. Zero to hero.
          </p>
        </div>
      </section>
      
      {/* Featured CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
         <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 neon-text-shadow">
           Are you ready to join the simulation?
         </h2>
         <Link to="/events" className="inline-flex items-center text-cyber-neon hover:text-white transition-colors text-lg border-b border-cyber-neon pb-1">
           Check Upcoming Deployments <ChevronRight className="ml-1" />
         </Link>
      </section>
    </div>
  );
};

export default Home;