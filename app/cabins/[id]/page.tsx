"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  ShieldCheck,
  ArrowRight,
  Zap,
  ChevronLeft,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// 1. Keys now match exactly what appears in the URL (e.g., localhost:3000/cabins/hidden)
const CABIN_DATA: any = {
  hidden: {
    name: "The Hidden Cabin",
    price: "165.00",
    image: "/img7.jpg",
    sqft: "450",
    occupancy: "2-3",
    features: [
      "Secluded Valley View",
      "Outdoor Copper Bath",
      "Blackout Shutter System",
      "Soundproofed Walls",
    ],
    description:
      "Maximum discretion. Located in a private depression within the estate, invisible from the main access tracks. Designed for those who require total isolation.",
  },
  original: {
    name: "The Original Cabin",
    price: "165.00",
    image: "/img18.jpg",
    sqft: "500",
    occupancy: "2",
    features: [
      "Flagship Design",
      "Integrated Sound System",
      "Private Smoking Yard",
      "Industrial Aesthetic",
    ],
    description:
      "The cabin that started it all. Raw timber meets industrial luxury. A brutalist sanctuary designed for deep sensory exploration.",
  },
  boutique: {
    name: "The Boutique Cabin",
    price: "149.00",
    image: "/img11.jpg",
    sqft: "380",
    occupancy: "2",
    features: [
      "Heated Floors",
      "Ambient Lighting Circuits",
      "Velvet Furnishings",
      "Compact Luxury",
    ],
    description:
      "Refined and intimate. The Boutique Cabin focuses on high-touch surfaces and a softer interior palette without sacrificing security.",
  },
};

export default function CabinDetailsPage() {
  const params = useParams();

  // 2. Normalize the ID (removes extra words if they exist)
  const rawId = params.id as string;
  const id = rawId?.replace("-cabin", "").toLowerCase();

  // 3. Find the cabin or default to 'hidden'
  const cabin = CABIN_DATA[id] || CABIN_DATA["hidden"];

  return (
    <main className="min-h-screen bg-white font-montserrat overflow-x-hidden">
      <Navbar />

      <div className="absolute top-24 left-8 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#8b0000] transition-colors"
        >
          <ChevronLeft size={14} /> Back to Estate
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-gray-100">
          <motion.img
            key={cabin.image} // Key helps Framer Motion re-animate on change
            initial={{ scale: 1.1, filter: "grayscale(100%)" }}
            animate={{ scale: 1, filter: "grayscale(0%)" }}
            transition={{ duration: 1.5 }}
            src={cabin.image}
            alt={cabin.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-8 left-8 bg-black text-white p-4 hidden lg:block">
            <p className="text-[9px] font-black uppercase tracking-[0.3em]">
              Confidential Location
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-white">
          <motion.div
            key={cabin.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-[#8b0000]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8b0000]">
                Property Profile
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-10">
              {cabin.name}
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-12 border-y border-gray-100 py-6">
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">
                  Area
                </p>
                <p className="text-sm font-black uppercase tracking-tight">
                  {cabin.sqft} SQFT
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">
                  Occupancy
                </p>
                <p className="text-sm font-black uppercase tracking-tight">
                  {cabin.occupancy} PERSONS
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">
                  Type
                </p>
                <p className="text-sm font-black uppercase tracking-tight">
                  PRIVATE
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-12 max-w-lg italic font-light">
              {cabin.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-16">
              {cabin.features.map((feature: string) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[#8b0000]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border-2 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                    Standard Rate
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">£{cabin.price}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-400 mb-1">
                      / Night
                    </span>
                  </div>
                </div>
                <Calendar className="text-gray-200" size={40} />
              </div>

              <button className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-[#8b0000] transition-all flex items-center justify-center gap-3 group">
                Confirm Availability{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
              <ShieldCheck size={12} />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
                Discreet Billing & Anonymous Entry Guaranteed
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
