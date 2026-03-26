import React from 'react';

const NavLink = ({ href, label, active }) => (
  <a href={href} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-bold uppercase text-sm ${active ? 'bg-carbon-fiber text-funky-gold' : 'text-champagne-onyx/70 hover:bg-carbon-fiber/50 hover:text-champagne-onyx'}`}>
    {label}
  </a>
);

const MobileLink = ({ href, label, active }) => (
  <a href={href} className={`flex flex-col items-center justify-center gap-1 font-bold uppercase text-[10px] w-full h-full ${active ? 'text-funky-gold' : 'text-champagne-onyx/70'}`}>
    {label}
  </a>
);

import { useAuth } from '@/context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <div className="flex h-screen bg-rich-black text-champagne-onyx font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-rich-black border-r border-carbon-fiber p-6">
        <div className="mb-12">
          <h1 className="text-3xl font-black italic text-funky-gold tracking-tighter uppercase">
            Cyberathlete
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-champagne-onyx/50 mt-1">
            Pro Gamer to Bodybuilder
          </p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavLink href="/" label="Upcoming Shows" active />
          <NavLink href="/leaderboard" label="Leaderboard" />
          <NavLink href="/history" label="My Predictions" />
        </nav>

        <div className="mt-auto pt-6 border-t border-carbon-fiber">
          {user ? (
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-funky-gold to-bronze-coin" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold truncate max-w-[120px]">{user.email}</span>
                    <span className="text-[10px] text-bronze-coin font-mono">LVL 01</span>
                  </div>
               </div>
               <button 
                onClick={logout}
                className="w-full py-2 text-[10px] uppercase tracking-widest font-black border border-carbon-fiber hover:border-funky-gold/50 transition-colors"
               >
                 Logout
               </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="w-full py-3 bg-funky-gold text-rich-black text-[10px] uppercase tracking-widest font-black rounded hover:scale-[1.02] transition-transform"
            >
              Login with Google
            </button>
          )}
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="sticky top-0 z-30 bg-rich-black/80 backdrop-blur-md p-4 md:px-10 md:py-6 border-b border-carbon-fiber flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">Dashboard</h2>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-bronze-coin">LVL 01</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-funky-gold to-bronze-coin" />
            </div>
          )}
        </header>

        <section className="p-4 md:p-10 pb-32">
          {children}
        </section>

        {/* Bottom Navigation for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-rich-black/95 backdrop-blur-lg border-t border-carbon-fiber h-20 flex justify-around items-center">
          <MobileLink href="/" label="Shows" active />
          <MobileLink href="/leaderboard" label="Rank" />
          <MobileLink href="/history" label="History" />
        </nav>
      </main>
    </div>
  );
};

export default DashboardLayout;
