"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const mockLeaders = [
  { rank: 1, user: "OlympiaOracle", level: 42, points: 1250, accuracy: "94%", avatar: "gold" },
  { rank: 2, user: "MassMonster88", level: 38, points: 1120, accuracy: "89%", avatar: "bronze" },
  { rank: 3, user: "IronGamer", level: 35, points: 1080, accuracy: "87%", avatar: "standard" },
  { rank: 4, user: "ProPredictor", level: 31, points: 950, accuracy: "85%", avatar: "standard" },
  { rank: 5, user: "PeakCondition", level: 29, points: 890, accuracy: "82%", avatar: "standard" },
];

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-champagne-onyx mb-2">
            Hall of Fame
          </h1>
          <p className="text-sm font-bold text-funky-gold tracking-widest uppercase">
            Top Predictors Rank — 2026 Season
          </p>
        </header>

        <div className="bg-carbon-fiber/30 border border-carbon-fiber rounded-2xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-carbon-fiber bg-carbon-fiber/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Rank</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">User</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Level</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">Points</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaders.map((leader) => (
                <tr key={leader.rank} className="border-b border-carbon-fiber/30 hover:bg-carbon-fiber/20 transition-colors group">
                  <td className="px-6 py-6">
                    <span className={`text-xl font-black italic ${leader.rank <= 3 ? 'text-funky-gold' : 'text-champagne-onyx/50'}`}>
                      #{leader.rank.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-champagne-onyx group-hover:text-funky-gold transition-colors">
                    {leader.user}
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-2 py-1 bg-carbon-fiber text-bronze-coin text-[10px] font-mono rounded border border-bronze-coin/30">
                      LVL {leader.level}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right font-mono font-bold text-champagne-onyx">
                    {leader.points}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-funky-gold">{leader.accuracy}</span>
                      <div className="w-16 h-1 bg-carbon-fiber rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-funky-gold" 
                          style={{ width: leader.accuracy }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-carbon-fiber/30 border border-carbon-fiber rounded-xl">
              <h4 className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Your Rank</h4>
              <p className="text-2xl font-black italic text-champagne-onyx">#--</p>
           </div>
           <div className="p-6 bg-carbon-fiber/30 border border-carbon-fiber rounded-xl">
              <h4 className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Your Level</h4>
              <p className="text-2xl font-black italic text-champagne-onyx">LVL 01</p>
           </div>
           <div className="p-6 bg-carbon-fiber/30 border border-carbon-fiber rounded-xl">
              <h4 className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Next Reward</h4>
              <p className="text-xs font-bold text-funky-gold uppercase">Exclusive Avatar at LVL 05</p>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
