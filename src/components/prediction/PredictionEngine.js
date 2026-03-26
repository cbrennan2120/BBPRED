"use client";

import { useState } from 'react';
import { DndContext, closestCenter, TouchSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePlayerCard } from './SortablePlayerCard';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export const PredictionEngine = ({ athletes, showId }) => {
  const { user, loginWithGoogle } = useAuth();
  const [ranked, setRanked] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();

  // Sensors optimized for mobile touch without breaking scroll
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRanked((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddAthlete = (athlete) => {
    if (ranked.length < 5 && !ranked.find(a => a.id === athlete.id)) {
      setRanked([...ranked, athlete]);
    }
  };

  const handleRemoveAthlete = (athleteId) => {
    setRanked(ranked.filter(a => a.id !== athleteId));
  };

  const submitPrediction = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to save your prediction!');
      loginWithGoogle();
      return;
    }

    try {
      const { error } = await supabase
        .from('predictions')
        .insert({
          user_id: user.id,
          user_name: user.email.split('@')[0], // Fallback username
          show_id: showId,
          top_5: ranked.map(a => a.name)
        });

      if (error) throw error;
      
      alert('Prediction saved to Supabase!');
    } catch (err) {
      console.error(err);
      alert('Failed to save prediction. Make sure you have created the "predictions" table in Supabase.');
    }
  };

  const availableAthletes = athletes.filter(a => 
    !ranked.find(r => r.id === a.id) && 
    (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (a.instagram && a.instagram.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-4">
        <h3 className="text-funky-gold uppercase tracking-tighter font-black">1. Available Lineup</h3>
        <input 
          type="text"
          placeholder="Search athletes or IG handles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-rich-black border border-carbon-fiber p-3 rounded mb-4 text-champagne-onyx placeholder-champagne-onyx/50 focus:outline-none focus:border-funky-gold transition-colors"
        />
        <div className="grid grid-cols-2 gap-2 h-[500px] overflow-y-auto pr-2" style={{ scrollbarColor: '#A57A03 #020B13', scrollbarWidth: 'thin' }}>
           {availableAthletes.map(player => (
              <button 
                key={player.id}
                type="button"
                onClick={() => handleAddAthlete(player)}
                disabled={ranked.length >= 5}
                className="w-full text-left p-3 bg-carbon-fiber hover:bg-carbon-fiber/80 text-champagne-onyx text-sm font-bold border border-rich-black hover:border-funky-gold/50 rounded transition-all flex flex-col items-start gap-1 disabled:opacity-50 disabled:hover:border-rich-black disabled:cursor-not-allowed"
              >
                  <span className="truncate w-full">{player.name}</span>
                  {player.instagram && <span className="text-[10px] text-champagne-onyx/50 font-normal truncate w-full">{player.instagram}</span>}
              </button>
           ))}
           {availableAthletes.length === 0 && (
             <div className="col-span-2 text-center text-champagne-onyx/50 text-sm py-8">
               No athletes found.
             </div>
           )}
        </div>
      </div>

      <form onSubmit={submitPrediction} className="bg-carbon-fiber/20 p-8 rounded-xl border border-carbon-fiber flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-funky-gold uppercase tracking-tighter font-black">2. Your Top 5 Prediction</h3>
          <span className="text-sm font-mono text-champagne-onyx/70">{ranked.length}/5</span>
        </div>
        
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ranked} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 min-h-[400px] border-2 border-dashed border-carbon-fiber rounded-lg p-4 flex-1">
              {ranked.map((player, idx) => (
                <SortablePlayerCard 
                  key={player.id} 
                  player={player} 
                  rank={idx + 1} 
                  onRemove={handleRemoveAthlete} 
                />
              ))}
              {ranked.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-champagne-onyx/30 text-sm py-20 px-4 text-center border border-dashed border-carbon-fiber/50 rounded">
                  <span className="text-3xl mb-2">🏆</span>
                  Select up to 5 athletes from the lineup to build your prediction.
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>

        <button 
          type="submit" 
          disabled={ranked.length !== 5}
          className="w-full mt-8 py-4 bg-gradient-to-r from-funky-gold to-bronze-coin text-rich-black font-black uppercase tracking-widest rounded hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {!user ? "Login to Submit" : (ranked.length !== 5 ? `Select ${5 - ranked.length} more athletes` : "Save Prediction")}
        </button>
      </form>
    </div>
  );
};
