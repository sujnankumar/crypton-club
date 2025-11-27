import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Agents', path: '/members' },
    { name: 'Trophies', path: '/achievements' },
    { name: 'Intel', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logos */}
          <div className="flex items-center gap-4">
            {/* College Logo */}
            <a href="https://mite.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="bg-white/90 p-1 rounded-sm">
                  <img 
                    src="../src/mite-logo.png" 
                    alt="MITE" 
                    className="h-8 w-auto" 
                  />
                  <span className="hidden text-black font-bold text-xs px-1">MITE</span>
                </div>
            </a>
            
            <div className="h-8 w-px bg-cyber-dim hidden sm:block"></div>

            {/* Club Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="../src/crypton-logo.png" 
                alt="Crypton Logo" 
                className="h-10 w-10 object-contain drop-shadow-[0_0_2px_#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all" 
              />
              <span className="text-xl font-bold tracking-tighter text-white hidden sm:block">
                CRYPTON<span className="text-cyber-neon">_CLUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2
                    ${isActive(link.path) 
                      ? 'text-cyber-neon border-cyber-neon' 
                      : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                    }
                  `}
                >
                  <span className="text-cyber-neon opacity-50 mr-1">{'>'}</span>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-cyber-dim mx-2"></div>

            {isAuthenticated ? (
               <button 
                 onClick={logout}
                 className="flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300 border border-red-900/50 bg-red-900/10 px-3 py-1.5 rounded transition-all"
               >
                 <LogOut size={14} />
                 LOGOUT
               </button>
            ) : (
               <Link 
                 to="/login"
                 className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-cyber-neon transition-colors"
               >
                 <LogIn size={14} />
                 LOGIN
               </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark border-b border-cyber-dim">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.path) ? 'bg-cyber-dim/50 text-cyber-neon' : 'text-gray-300 hover:text-white hover:bg-cyber-dim/30'}
                `}
              >
                {link.name}
              </Link>
            ))}
             <div className="border-t border-cyber-dim my-2 pt-2">
                {isAuthenticated ? (
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex w-full items-center px-3 py-2 text-red-400 hover:bg-cyber-dim/30 rounded-md text-base font-medium"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-cyber-dim/30 rounded-md text-base font-medium"
                  >
                    <LogIn size={16} className="mr-2" /> Login
                  </Link>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;