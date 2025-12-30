"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Users, Wind, MapPin } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const CABIN_DATA = [
  {
    id: 1,
    name: "The Hidden Cabin",
    location: "Cotswolds, UK",
    price: 240,
    guests: 2,
    features: ["Sauna", "Off-grid", "Fire pit"],
    image: "/cabin-1.jpg", // Replace with your actual image paths
  },
  {
    id: 2,
    name: "The Lakeview Pod",
    location: "Lake District, UK",
    price: 180,
    guests: 2,
    features: ["Waterfront", "Wifi", "Deck"],
    image: "/cabin-2.jpg",
  },
];

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />
      {/* --- Search Header --- */}
      <section className="bg-[#1a1a1a] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
            Find Your <br /> Perfect Escape
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-2 rounded-sm items-end">
            <div className="p-2 text-black">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                Dates
              </label>
              <DatePickerWithRange />
            </div>
            <div className="p-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                Guests
              </label>
              <select className="w-full p-3 border border-gray-200 text-black text-sm focus:outline-none rounded-none h-[50px]">
                <option>2 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div className="p-2">
              <Button className="w-full h-[50px] bg-black hover:bg-gray-800 rounded-none uppercase font-bold tracking-widest">
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Cabin Results --- */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Available Cabins
            </h2>
            <p className="text-gray-500 text-sm">
              Showing results for selected dates
            </p>
          </div>
          <div className="hidden md:block">
            <Badge
              variant="outline"
              className="rounded-none border-black px-4 py-1 uppercase text-[10px]"
            >
              2 Cabins Found
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {CABIN_DATA.map((cabin) => (
            <div key={cabin.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={cabin.image}
                  alt={cabin.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 text-[12px] font-bold uppercase tracking-widest">
                  £{cabin.price} / Night
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-1">
                    {cabin.name}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-500 text-[12px] uppercase tracking-wide font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {cabin.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {cabin.guests} Guests
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-none border-black uppercase font-bold text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
