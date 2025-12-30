"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Wind, Zap, Coffee, Flower2, Scissors, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSETS = [
  {
    category: "FACILITIES",
    title: "The Scandinavian Sauna",
    description:
      "Hand-built cedar wood sauna featuring adjustable dry heat and essential oil infusion capabilities.",
    specs: ["Max Temp: 90°C", "Capacity: 4 Persons", "Bluetooth Audio"],
    icon: <Wind className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200",
  },
  {
    category: "SERVICES",
    title: "In-Cabin Massage Therapy",
    description:
      "Professional masseuse services delivered to your door. Choose from Deep Tissue, Swedish, or Hot Stone treatments.",
    specs: ["60 or 90 Minutes", "Organic Oils", "Pre-booked only"],
    icon: <Flower2 className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200",
  },
  {
    category: "EQUIPMENT",
    title: "Technogym Wellness Kit",
    description:
      "Each cabin is equipped with a curated selection of yoga mats, resistance bands, and mobility tools.",
    specs: ["Cleaned daily", "In-room guide", "Outdoor ready"],
    icon: <Zap className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* Header */}
      <section className="py-20 px-6 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
            Equipment & <br /> Services
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
            The technical side of relaxation
          </p>
        </div>
      </section>

      {/* Asset List */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="space-y-24">
          {ASSETS.map((asset, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-video relative overflow-hidden bg-gray-100">
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="object-cover w-full h-full hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content Column */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-2 text-[#8b0000]">
                  {asset.icon}
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    {asset.category}
                  </span>
                </div>

                <h2 className="text-3xl font-black uppercase tracking-tight leading-none">
                  {asset.title}
                </h2>

                <p className="text-gray-600 leading-relaxed font-light text-lg">
                  {asset.description}
                </p>

                <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-6">
                  {asset.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-black" />
                      {spec}
                    </div>
                  ))}
                </div>

                <Button className="bg-black text-white rounded-none px-10 py-6 uppercase tracking-[0.2em] font-bold text-xs hover:bg-gray-800 transition-all">
                  Inquire Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Reminder */}
      <section className="bg-black text-white py-20 px-6 text-center mt-20">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
          Ready to enhance your stay?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 font-light italic">
          Services such as masseuse therapy must be booked at least 48 hours in
          advance to guarantee availability.
        </p>
        <button className="border-2 border-white px-12 py-4 font-bold uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition">
          Book Service
        </button>
      </section>

      {/* Footer from Landing Page */}
    </main>
  );
}
