"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const mockHistory = [
  { id: 1, show: "Arnold Classic USA", date: "March 5-8, 2026", status: "Completed", score: 850, accuracy: "88%" },
  { id: 2, show: "Detroit Pro", date: "March 14, 2026", status: "Completed", score: 720, accuracy: "75%" },
  { id: 3, show: "Mr. Olympia", date: "October 2026", status: "Pending", score: null, accuracy: null },
];

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-champagne-onyx mb-2">
            Mission History
          </h1>
          <p className="text-sm font-bold text-funky-gold tracking-widest uppercase">
            Your Prediction Performance Log
          </p>
        </header>

        <div className="bg-carbon-fiber/30 border border-carbon-fiber rounded-2xl overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-carbon-fiber bg-carbon-fiber/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Competition</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Date</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">XP Gained</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id} className="border-b border-carbon-fiber/30 hover:bg-carbon-fiber/20 transition-colors group">
                  <td className="px-6 py-6 font-bold text-champagne-onyx group-hover:text-funky-gold transition-colors">
                    {item.show}
                  </td>
                  <td className="px-6 py-6 text-xs text-champagne-onyx/70 font-mono">
                    {item.date}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded border ${
                      item.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-500 border-green-500/30' 
                      : 'bg-funky-gold/10 text-funky-gold border-funky-gold/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right font-mono font-bold text-champagne-onyx">
                    {item.score || '---'}
                  </td>
                  <td className="px-6 py-6 text-right font-bold text-funky-gold">
                    {item.accuracy || '---'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-gradient-to-r from-carbon-fiber/50 to-transparent border border-carbon-fiber rounded-2xl">
          <h3 className="text-xl font-black italic text-champagne-onyx uppercase mb-4">Commander Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Total XP</p>
              <p className="text-3xl font-black italic text-funky-gold">1570</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Avg Accuracy</p>
              <p className="text-3xl font-black italic text-funky-gold">81.5%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Shows Predicted</p>
              <p className="text-3xl font-black italic text-funky-gold">02</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-bronze-coin font-black mb-1">Season Rank</p>
              <p className="text-3xl font-black italic text-funky-gold">#--</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
