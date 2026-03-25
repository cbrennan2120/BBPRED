"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PredictionEngine } from '@/components/prediction/PredictionEngine';
import { athletes } from '@/data/athletes';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-champagne-onyx mb-2">
            Mr. Olympia 2026
          </h1>
          <p className="text-sm font-bold text-funky-gold tracking-widest uppercase mb-8">
            Prediction Engine Live
          </p>
        </div>

        <PredictionEngine athletes={athletes} showId="mr-olympia-2026" />
      </div>
    </DashboardLayout>
  );
}
