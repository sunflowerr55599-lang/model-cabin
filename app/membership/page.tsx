"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  Crown,
  Check,
  ArrowRight,
  Globe,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TIERS = [
  {
    name: "Base",
    price: "95",
    description: "For the occasional retreat seeker.",
    features: [
      "Access to 3 UK Locations",
      "Standard Concierge",
      "48hr Cancellation",
      "Equipment Rental Access",
    ],
    accent: "bg-gray-200",
    button: "Current Tier",
  },
  {
    name: "Elite",
    price: "250",
    description: "Priority access to the full UK vault.",
    features: [
      "All UK Locations",
      "24/7 Dedicated Concierge",
      "Priority Peak-Season Booking",
      "15% Off All Equipment",
      "Complimentary Welcome Provisioning",
    ],
    accent: "bg-[#8b0000] text-white",
    button: "Upgrade to Elite",
    popular: true,
  },
  {
    name: "Global",
    price: "500",
    description: "Unlimited access to our international partner sites.",
    features: [
      "Global Site Access (EU/US)",
      "Private Chef Coordination",
      "Unlimited Equipment Use",
      "Helicopter Transfer Options",
      "Guest Pass (2 per year)",
    ],
    accent: "bg-black text-white",
    button: "Apply for Global",
  },
];

export default function MembershipPage() {
  const handleUpgrade = (tier: string) => {
    toast.info(`Request for ${tier} tier sent to membership committee.`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black font-montserrat p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Status & Access
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            The Membership <br />
            Structure
          </h1>
          <p className="max-w-xl text-gray-500 text-sm uppercase tracking-wide leading-relaxed">
            Our cabins are strictly reserved for verified members. Choose a tier
            that reflects your travel frequency.
          </p>
        </header>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 shadow-2xl">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "p-8 flex flex-col relative border-r border-gray-100 last:border-r-0",
                tier.popular
                  ? "bg-white z-10 scale-105 shadow-xl border-y-4 border-y-[#8b0000] md:border-y-0"
                  : "bg-white/50"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8b0000] text-white text-[8px] font-black uppercase px-4 py-1 tracking-[0.2em]">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-1">
                  {tier.name}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {tier.description}
                </p>
              </div>

              <div className="mb-12 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">
                  £{tier.price}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  / Month
                </span>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[10px] font-bold uppercase tracking-tight text-gray-600"
                  >
                    <Check size={14} className="text-[#8b0000] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(tier.name)}
                className={cn(
                  "w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                  tier.name === "Base"
                    ? "bg-gray-100 text-gray-400 cursor-default"
                    : "bg-black text-white hover:bg-[#8b0000]"
                )}
              >
                {tier.button} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Membership Perks Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-16">
          <div className="space-y-4">
            <Globe size={24} className="text-[#8b0000]" />
            <h4 className="font-black uppercase text-sm">Global Roaming</h4>
            <p className="text-[11px] text-gray-500 uppercase leading-relaxed tracking-wider">
              Elite and Global members can swap their UK nights for stays in our
              Icelandic and Norwegian partner vaults.
            </p>
          </div>
          <div className="space-y-4">
            <Key size={24} className="text-[#8b0000]" />
            <h4 className="font-black uppercase text-sm">Keyless Entry</h4>
            <p className="text-[11px] text-gray-500 uppercase leading-relaxed tracking-wider">
              All members receive a digital key via the app 24 hours prior to
              arrival, ensuring total privacy.
            </p>
          </div>
          <div className="space-y-4">
            <Crown size={24} className="text-[#8b0000]" />
            <h4 className="font-black uppercase text-sm">Equity Rewards</h4>
            <p className="text-[11px] text-gray-500 uppercase leading-relaxed tracking-wider">
              Long-term members (24 months+) gain early-investor access to new
              cabin development projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
