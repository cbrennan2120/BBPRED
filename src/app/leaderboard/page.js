"use client";

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase';

export default function LeaderboardPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPredictions = async () => {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching predictions:', error);
      } else {
        setPredictions(data || []);
      }
      setLoading(false);
    };

    fetchPredictions();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-champagne-onyx mb-2">
            Hall of Fame
          </h1>
          <p className="text-sm font-bold text-funky-gold tracking-widest uppercase">
            Recent Predictions — 2026 Season
          </p>
        </header>

        <div className="bg-carbon-fiber/30 border border-carbon-fiber rounded-2xl overflow-hidden backdrop-blur-sm">
          {loading ? (
             <div className="p-20 text-center animate-pulse text-bronze-coin uppercase font-black tracking-widest">
                Loading Data...
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-carbon-fiber bg-carbon-fiber/50">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">User</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Show</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Top 5 Prediction</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred) => (
                  <tr key={pred.id} className="border-b border-carbon-fiber/30 hover:bg-carbon-fiber/20 transition-colors group">
                    <td className="px-6 py-6 font-bold text-champagne-onyx group-hover:text-funky-gold transition-colors">
                      {pred.user_name}
                    </td>
                    <td className="px-6 py-6 text-xs text-champagne-onyx/70 uppercase font-bold">
                      {pred.show_id.replace(/-/g, ' ')}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-2">
                        {pred.top_5.map((athlete, i) => (
                          <span key={i} className="px-2 py-0.5 bg-carbon-fiber text-[10px] text-champagne-onyx/80 rounded border border-carbon-fiber">
                            {i+1}. {athlete}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right text-[10px] font-mono text-bronze-coin">
                      {new Date(pred.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {predictions.length === 0 && (
                   <tr>
                      <td colSpan="4" className="p-20 text-center text-champagne-onyx/30 italic">
                        No predictions recorded yet. Be the first!
                      </td>
                   </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
