"use client";

import React, { useState } from "react";
import {
  Clock,
  Moon,
  Star,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const NEW_RATES = [
  {
    id: "wd-day",
    title: "Weekday Daytime",
    time: "11am — 5pm",
    price: 220,
    extra: "£40 per extra hour",
    type: "Daytime",
    icon: <Clock size={18} />,
  },
  {
    id: "we-day",
    title: "Weekend Daytime",
    time: "12pm — 6pm",
    price: 255,
    extra: "£50 per extra hour",
    type: "Daytime",
    icon: <Clock size={18} />,
  },
  {
    id: "wd-night",
    title: "Weekday Overnight",
    time: "6pm — 11am",
    price: 250,
    extra: "Standard stay",
    type: "Overnight",
    icon: <Moon size={18} />,
  },
  {
    id: "we-night",
    title: "Weekend Overnight",
    time: "7pm — 11am",
    price: 275,
    extra: "Standard stay",
    type: "Overnight",
    icon: <Moon size={18} />,
  },
  {
    id: "vip-pkg",
    title: "VIP Weekend Package",
    time: "Sat 11am — Sun 7pm",
    price: 525,
    extra: "Full immersive stay",
    type: "VIP",
    icon: <Star size={18} className="text-[#8b0000]" />,
  },
];

export default function RatesPage() {
  const [selectedGuests, setSelectedGuests] = useState(2);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f9f9f9] text-black font-montserrat p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-16 border-b border-black pb-12">
            <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              The Selection
            </p>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Rates & <br />
              Bookings
            </h1>
            <p className="max-w-xl text-gray-500 text-sm uppercase tracking-widest leading-relaxed">
              Confirm your ideal plan below to proceed to checkout. All rates
              are based on 2 guests.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Rate Selection Area */}
            <div className="lg:col-span-2 space-y-4">
              {NEW_RATES.map((rate) => (
                <div
                  key={rate.id}
                  className="group bg-white border border-gray-200 p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-black transition-all cursor-pointer shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                      {rate.icon}
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-tight">
                        {rate.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {rate.time}
                      </p>
                      <p className="text-[9px] text-[#8b0000] font-bold uppercase mt-1 italic">
                        {rate.extra}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 text-right flex flex-col items-end">
                    <p className="text-2xl font-black tracking-tighter">
                      £{rate.price}
                    </p>
                    <button
                      onClick={() =>
                        toast.success(`Proceeding with ${rate.title}`)
                      }
                      className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#8b0000] mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Select Plan <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Guidelines */}
            <div className="space-y-8">
              <div className="bg-black text-white p-8">
                <Users className="text-[#8b0000] mb-4" size={24} />
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">
                  Guest Policy
                </h4>
                <p className="text-[10px] text-gray-400 leading-loose uppercase tracking-wider">
                  Prices are based on 2 guests. Additional guests can be added
                  (maximum of 5). Contact concierge for group adjustments.
                </p>
              </div>

              <div className="border-2 border-black p-8">
                <ShieldCheck className="mb-4" size={24} />
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">
                  Booking Privacy
                </h4>
                <p className="text-[10px] text-gray-500 leading-loose uppercase tracking-wider">
                  To maintain discretion, exact cabin locations are revealed
                  only after reservation confirmation and membership
                  verification.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-gray-200 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4">
              Ready to proceed?
            </p>
            <p className="text-sm font-light italic text-gray-600 mb-8 max-w-lg mx-auto">
              Once you confirm your selection, you will receive your reservation
              invoice to process your booking payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
