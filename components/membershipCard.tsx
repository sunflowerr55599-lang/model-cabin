"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Crown, ShieldCheck, Globe, Zap } from "lucide-react";

interface CardProps {
  tier: "Base" | "Elite" | "Global";
  userName: string;
  memberSince: string;
}

export default function MembershipCard({
  tier,
  userName,
  memberSince,
}: CardProps) {
  const styles = {
    Base: {
      bg: "bg-white border-gray-200",
      text: "text-black",
      accent: "text-gray-400",
      icon: <ShieldCheck size={20} />,
      label: "Standard Access",
    },
    Elite: {
      bg: "bg-[#8b0000] border-[#a31a1a]",
      text: "text-white",
      accent: "text-red-300",
      icon: <Crown size={20} />,
      label: "Elite Member",
    },
    Global: {
      bg: "bg-black border-zinc-800",
      text: "text-white",
      accent: "text-zinc-500",
      icon: <Globe size={20} />,
      label: "Global Citizen",
    },
  };

  const current = styles[tier] || styles.Base;

  return (
    <div
      className={cn(
        "relative overflow-hidden border-2 p-8 transition-all duration-700 shadow-2xl",
        current.bg,
        current.text
      )}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-[-20%] right-[-10%] opacity-10 scale-150 rotate-12 pointer-events-none">
        {current.icon}
      </div>

      <div className="flex justify-between items-start mb-12">
        <div>
          <p
            className={cn(
              "text-[9px] font-black uppercase tracking-[0.4em] mb-1",
              current.accent
            )}
          >
            The Model Cabin UK
          </p>
          <div className="flex items-center gap-2">
            {current.icon}
            <h2 className="text-xl font-black uppercase tracking-tighter">
              {current.label}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <Zap size={16} className={current.accent} />
        </div>
      </div>

      <div className="mt-auto space-y-1">
        <p
          className={cn(
            "text-[8px] font-black uppercase tracking-widest",
            current.accent
          )}
        >
          Verified Holder
        </p>
        <h3 className="text-2xl font-black uppercase tracking-tight truncate">
          {userName}
        </h3>
      </div>

      <div className="mt-8 flex justify-between items-end border-t border-white/10 pt-4">
        <div>
          <p
            className={cn(
              "text-[8px] font-black uppercase tracking-widest",
              current.accent
            )}
          >
            Member Since
          </p>
          <p className="text-[10px] font-bold uppercase">{memberSince}</p>
        </div>
        <div className="bg-white/10 px-3 py-1 text-[8px] font-black uppercase tracking-tighter backdrop-blur-md">
          {tier} LVL
        </div>
      </div>
    </div>
  );
}
