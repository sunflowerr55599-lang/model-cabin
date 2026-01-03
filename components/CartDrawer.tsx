"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: string;
}

export default function CartDrawer({
  cart,
  removeFromCart,
}: {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
}) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative group cursor-pointer">
          <div className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center w-32 h-32 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-active:shadow-none group-active:translate-x-0 group-active:translate-y-0">
            <ShoppingCart size={24} className="mb-2" />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Cart ({cart.length})
            </span>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md border-l-2 border-black font-montserrat flex flex-col p-0">
        <SheetHeader className="p-8 border-b border-gray-100">
          <SheetTitle className="text-3xl font-black uppercase tracking-tighter">
            Your Manifest
          </SheetTitle>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Items will be added to your final stay bill.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="text-gray-300" size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Your manifest is empty
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-start group"
                >
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">
                      {item.type}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-[9px] font-black uppercase text-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <Trash2 size={10} /> Remove
                    </button>
                  </div>
                  <span className="text-xs font-black">£{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-8 bg-gray-50 border-t border-black flex-col gap-6">
            <div className="w-full flex justify-between items-end mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Total Provisioning
              </span>
              <span className="text-2xl font-black leading-none">£{total}</span>
            </div>
            <button className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#8b0000] transition-all shadow-[6px_6px_0px_0px_rgba(139,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
              Confirm & Lock to Stay
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
