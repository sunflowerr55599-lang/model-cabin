"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ProgressProps {
  nightsStayed: number;
}

export default function TierProgress({ nightsStayed }: ProgressProps) {
  // Logic: Base (0), Elite (10 nights), Global (25 nights)
  const getTierData = (nights: number) => {
    if (nights < 10) {
      return {
        current: "Base",
        next: "Elite",
        remaining: 10 - nights,
        progress: (nights / 10) * 100,
      };
    } else if (nights < 25) {
      return {
        current: "Elite",
        next: "Global",
        remaining: 25 - nights,
        progress: ((nights - 10) / 15) * 100,
      };
    } else {
      return {
        current: "Global",
        next: "Infinity",
        remaining: 0,
        progress: 100,
      };
    }
  };

  const data = getTierData(nightsStayed);

  return (
    <div className="bg-white border border-gray-200 p-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8b0000] mb-1">
            Status Progression
          </p>
          <h3 className="text-lg font-black uppercase tracking-tighter">
            Next Level: {data.next}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black tracking-tighter">
            {Math.round(data.progress)}%
          </span>
        </div>
      </div>

      {/* The Progress Bar */}
      <div className="w-full h-4 bg-gray-100 mb-6 overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-1000 ease-out"
          style={{ width: `${data.progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <TrendingUp size={14} />
          {data.remaining > 0
            ? `${data.remaining} Nights to ${data.next}`
            : "Maximum Status Reached"}
        </div>
        <button className="text-[9px] font-black uppercase tracking-widest border-b border-gray-200 hover:border-black transition-all">
          View Benefits
        </button>
      </div>
    </div>
  );
}
