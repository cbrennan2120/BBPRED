"use client";

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setHistory(data || []);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-champagne-onyx mb-2">
            Mission History
          </h1>
          <p className="text-sm font-bold text-funky-gold tracking-widest uppercase">
            Your Personal Prediction Log
          </p>
        </header>

        {!user ? (
          <div className="p-20 bg-carbon-fiber/20 border border-dashed border-carbon-fiber rounded-2xl text-center">
            <p className="text-champagne-onyx/50 italic mb-4 text-sm">You must be logged in to view your submission history.</p>
          </div>
        ) : (
          <div className="bg-carbon-fiber/30 border border-carbon-fiber rounded-2xl overflow-hidden backdrop-blur-sm">
            {loading ? (
               <div className="p-20 text-center animate-pulse text-bronze-coin uppercase font-black tracking-widest">
                  Loading Intel...
               </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-carbon-fiber bg-carbon-fiber/50">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Competition</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black">Your Top 5</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-bronze-coin font-black text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id} className="border-b border-carbon-fiber/30 hover:bg-carbon-fiber/20 transition-colors group">
                      <td className="px-6 py-6 font-bold text-champagne-onyx group-hover:text-funky-gold transition-colors uppercase">
                        {item.show_id.replace(/-/g, ' ')}
                      </td>
                      <td className="px-6 py-6">
                         <div className="flex flex-wrap gap-2">
                          {item.top_5.map((athlete, i) => (
                            <span key={i} className="px-2 py-0.5 bg-carbon-fiber text-[10px] text-champagne-onyx/80 rounded border border-carbon-fiber">
                              {i+1}. {athlete}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right text-[10px] font-mono text-bronze-coin">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                     <tr>
                        <td colSpan="3" className="p-20 text-center text-champagne-onyx/30 italic">
                          No missions completed yet.
                        </td>
                     </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
