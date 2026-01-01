"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Dumbbell,
  Camera,
  Mountain,
  Zap,
  Search,
  ShoppingCart,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const EQUIPMENT_DATA = [
  {
    id: "eq1",
    name: "Leica Q3 Rental",
    category: "Capture",
    price: 85,
    type: "Rental / Day",
    image:
      "https://images.unsplash.com/photo-1590250753494-0130985c4908?auto=format&fit=crop&w=600",
    description: "Full-frame compact camera for documenting your retreat.",
  },
  {
    id: "eq2",
    name: "Carbon Trekking Kit",
    category: "Adventure",
    price: 30,
    type: "Rental / Stay",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600",
    description: "Ultra-light poles and GPS mapping for deep forest trails.",
  },
  {
    id: "eq3",
    name: "Model Cabin Robe",
    category: "Apparel",
    price: 120,
    type: "Purchase",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600",
    description: "Heavyweight 600GSM waffle cotton. Limited edition.",
  },
  {
    id: "eq4",
    name: "Polaris ATV Access",
    category: "Toys",
    price: 150,
    type: "Rental / 4hr",
    image:
      "https://images.unsplash.com/photo-1533038595183-bc8999396264?auto=format&fit=crop&w=600",
    description: "All-terrain vehicle for exploring the estate boundaries.",
  },
];

export default function StorePage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Adventure", "Capture", "Apparel", "Toys"];

  const handleAddToCart = (item: string) => {
    toast.success(`${item} added to your stay bill.`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black font-montserrat p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-2xl">
            <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Provisioning
            </p>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Gear & <br />
              Provisions
            </h1>
            <p className="text-gray-500 text-sm uppercase tracking-widest leading-relaxed">
              Equip your stay with professional-grade tools and exclusive member
              toys.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center w-24 h-24">
              <ShoppingCart size={20} className="mb-2" />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Cart (0)
              </span>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                filter === cat
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 hover:border-black"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EQUIPMENT_DATA.filter(
            (item) => filter === "All" || item.category === filter
          ).map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                  {item.category}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black uppercase text-sm leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-[#8b0000]">
                    £{item.price}
                  </p>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                  {item.type}
                </p>
                <p className="text-[11px] text-gray-500 mb-6 leading-relaxed uppercase">
                  {item.description}
                </p>

                <button
                  onClick={() => handleAddToCart(item.name)}
                  className="mt-auto flex items-center justify-center gap-2 w-full border-2 border-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  <Plus size={14} /> Add to Stay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Request Banner */}
        <div className="mt-24 bg-black p-12 text-white flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">
              Specific Requirements?
            </h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Our concierge can source almost any specialized equipment with 48
              hours notice.
            </p>
          </div>
          <button className="mt-8 md:mt-0 border border-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
