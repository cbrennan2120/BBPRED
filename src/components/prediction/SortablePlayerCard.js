"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortablePlayerCard = ({ player, rank, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative flex items-center gap-4 p-4 bg-carbon-fiber border border-rich-black/50 rounded pointer-events-auto touch-none"
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-rich-black text-funky-gold font-mono text-sm font-bold rounded">
        {rank}
      </div>
      <div className="font-bold text-champagne-onyx tracking-wide uppercase flex flex-col">
        <span>{player.name}</span>
        {player.instagram && <span className="text-[10px] text-champagne-onyx/50 font-normal normal-case">{player.instagram}</span>}
      </div>
      <div className="ml-auto flex items-center text-bronze-coin cursor-grab">
        {/* Drag handle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </div>

      {onRemove && (
        <button 
          type="button"
          onPointerDown={(e) => {
            e.stopPropagation(); // prevent drag start
          }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(player.id);
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-rich-black border border-carbon-fiber rounded-full text-champagne-onyx hover:text-red-400 hover:border-red-400 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer"
          title="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
};
