// "use client";

// import React, { useState } from "react";
// import {
//   ShoppingCart,
//   Plus,
//   ArrowUpRight,
//   Trash2,
//   ShoppingBag,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import Navbar from "@/components/Navbar";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
// } from "@/components/ui/sheet";

// // --- DATA ---
// const EQUIPMENT_DATA = [
//   {
//     id: "eq1",
//     name: "Leica Q3 Rental",
//     category: "Capture",
//     price: 85,
//     type: "Rental / Day",
//     image:
//       "https://images.unsplash.com/photo-1590250753494-0130985c4908?auto=format&fit=crop&w=600",
//     description: "Full-frame compact camera for documenting your retreat.",
//   },
//   {
//     id: "eq2",
//     name: "Carbon Trekking Kit",
//     category: "Adventure",
//     price: 30,
//     type: "Rental / Stay",
//     image:
//       "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600",
//     description: "Ultra-light poles and GPS mapping for deep forest trails.",
//   },
//   {
//     id: "eq3",
//     name: "Model Cabin Robe",
//     category: "Apparel",
//     price: 120,
//     type: "Purchase",
//     image:
//       "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=600",
//     description: "Heavyweight 600GSM waffle cotton. Limited edition.",
//   },
//   {
//     id: "eq4",
//     name: "Polaris ATV Access",
//     category: "Toys",
//     price: 150,
//     type: "Rental / 4hr",
//     image:
//       "https://images.unsplash.com/photo-1533038595183-bc8999396264?auto=format&fit=crop&w=600",
//     description: "All-terrain vehicle for exploring the estate boundaries.",
//   },
// ];

// const CATEGORIES = ["All", "Adventure", "Capture", "Apparel", "Toys"];

// // --- SUB-COMPONENT: CART DRAWER ---
// function CartDrawer({
//   cart,
//   onRemove,
// }: {
//   cart: any[];
//   onRemove: (id: string) => void;
// }) {
//   const total = cart.reduce((acc, item) => acc + item.price, 0);

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <div className="relative group cursor-pointer">
//           <div className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center w-32 h-32 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-active:shadow-none group-active:translate-x-0 group-active:translate-y-0">
//             <ShoppingCart size={24} className="mb-2" />
//             <span className="text-[9px] font-black uppercase tracking-widest">
//               Manifest ({cart.length})
//             </span>
//           </div>
//         </div>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-md border-l-2 border-black font-montserrat flex flex-col p-0">
//         <SheetHeader className="p-8 border-b border-gray-100">
//           <SheetTitle className="text-3xl font-black uppercase tracking-tighter">
//             Your Manifest
//           </SheetTitle>
//           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
//             Items will be added to your final stay bill.
//           </p>
//         </SheetHeader>

//         <div className="flex-1 overflow-y-auto p-8">
//           {cart.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center">
//               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
//                 <ShoppingBag className="text-gray-300" size={24} />
//               </div>
//               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//                 The manifest is currently empty
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {cart.map((item, idx) => (
//                 <div
//                   key={`${item.id}-${idx}`}
//                   className="flex justify-between items-start group animate-in fade-in slide-in-from-right-4"
//                 >
//                   <div>
//                     <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">
//                       {item.name}
//                     </h4>
//                     <p className="text-[9px] text-gray-400 uppercase font-bold">
//                       {item.type}
//                     </p>
//                     <button
//                       onClick={() => onRemove(item.id)}
//                       className="mt-2 text-[9px] font-black uppercase text-[#8b0000] flex items-center gap-1 hover:underline"
//                     >
//                       <Trash2 size={10} /> Remove
//                     </button>
//                   </div>
//                   <span className="text-xs font-black">£{item.price}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {cart.length > 0 && (
//           <SheetFooter className="p-8 bg-gray-50 border-t-2 border-black flex-col gap-6">
//             <div className="w-full flex justify-between items-end mb-4">
//               <span className="text-[10px] font-black uppercase tracking-[0.3em]">
//                 Total Provisioning
//               </span>
//               <span className="text-2xl font-black leading-none">£{total}</span>
//             </div>
//             <button className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#8b0000] transition-all shadow-[6px_6px_0px_0px_rgba(139,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
//               Confirm & Lock to Stay
//             </button>
//           </SheetFooter>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }

// // --- MAIN PAGE ---
// export default function StorePage() {
//   const [filter, setFilter] = useState("All");
//   const [cart, setCart] = useState<any[]>([]);

//   const handleAddToCart = (item: any) => {
//     setCart((prev) => [...prev, item]);
//     toast.success(`${item.name} added to manifest.`, {
//       style: {
//         background: "black",
//         color: "white",
//         borderRadius: "0px",
//         border: "1px solid black",
//       },
//     });
//   };

//   const handleRemoveFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="bg-[#fcfcfc] min-h-screen">
//       <Navbar />

//       <div className="text-black font-montserrat px-6 py-12 md:p-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b-2 border-black pb-16">
//             <div className="max-w-2xl">
//               <div className="flex items-center gap-2 mb-6">
//                 <span className="w-10 h-[2px] bg-[#8b0000]"></span>
//                 <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em]">
//                   Estate Provisioning
//                 </p>
//               </div>
//               <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
//                 Gear & <br /> Provisions
//               </h1>
//               <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest leading-relaxed max-w-md">
//                 Equip your stay with professional-grade tools and exclusive
//                 member toys, meticulously curated for the UK landscape.
//               </p>
//             </div>

//             <CartDrawer cart={cart} onRemove={handleRemoveFromCart} />
//           </header>

//           <div className="flex flex-col lg:flex-row gap-16 mt-12">
//             {/* Sidebar */}
//             <aside className="w-full lg:w-48 lg:sticky lg:top-32 h-fit">
//               <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-8 underline underline-offset-8 decoration-2 decoration-gray-200">
//                 Categories
//               </p>
//               <div className="flex flex-row lg:flex-col flex-wrap gap-3">
//                 {CATEGORIES.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => setFilter(cat)}
//                     className={cn(
//                       "text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-2",
//                       filter === cat
//                         ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]"
//                         : "bg-transparent border-transparent text-gray-400 hover:text-black"
//                     )}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </aside>

//             {/* Grid */}
//             <main className="flex-1">
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
//                 {EQUIPMENT_DATA.filter(
//                   (item) => filter === "All" || item.category === filter
//                 ).map((item) => (
//                   <div
//                     key={item.id}
//                     className="group flex flex-col bg-white border border-gray-100 p-2 hover:border-black transition-colors"
//                   >
//                     <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-6">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
//                       />
//                       <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <ArrowUpRight
//                           className="text-white bg-black p-1"
//                           size={24}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex-1 flex flex-col px-4 pb-4">
//                       <div className="flex justify-between items-start mb-3">
//                         <h3 className="font-black uppercase text-base tracking-tighter leading-tight">
//                           {item.name}
//                         </h3>
//                         <p className="text-sm font-black text-[#8b0000]">
//                           £{item.price}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2 mb-4">
//                         <span className="text-[8px] bg-gray-100 px-2 py-0.5 font-bold uppercase tracking-widest">
//                           {item.category}
//                         </span>
//                         <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
//                           {item.type}
//                         </span>
//                       </div>

//                       <p className="text-[11px] text-gray-500 mb-8 leading-relaxed uppercase tracking-tight">
//                         {item.description}
//                       </p>

//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="mt-auto flex items-center justify-center gap-3 w-full border-2 border-black py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1"
//                       >
//                         <Plus size={14} /> Add to Stay
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </main>
//           </div>

//           {/* Concierge Section */}
//           <section className="mt-40 relative overflow-hidden border-2 border-black bg-white p-12 md:p-20 shadow-[12px_12px_0px_0px_rgba(139,0,0,1)]">
//             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
//               <div className="text-center md:text-left">
//                 <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
//                   Bespoke Requirements?
//                 </h4>
//                 <p className="text-xs text-gray-500 uppercase tracking-[0.2em] max-w-lg leading-loose">
//                   Our estate team can source specialized outdoor gear, rare
//                   spirits, or technical equipment with 48 hours notice.
//                 </p>
//               </div>
//               <button className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#8b0000] transition-all">
//                 Contact Concierge
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  ArrowUpRight,
  Trash2,
  ShoppingBag,
  Check,
  Loader2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// --- DATA ---
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

const CATEGORIES = ["All", "Adventure", "Capture", "Apparel", "Toys"];

// --- SUB-COMPONENT: CART DRAWER ---
function CartDrawer({
  cart,
  onRemove,
  onClear,
}: {
  cart: any[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate estate server communication
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      onClear();
    }, 3500);
  };

  return (
    <Sheet
      onOpenChange={(open) => !open && !isProcessing && setIsSuccess(false)}
    >
      <SheetTrigger asChild>
        <div className="relative group cursor-pointer">
          <div className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center w-32 h-32 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-active:shadow-none group-active:translate-x-0 group-active:translate-y-0">
            <ShoppingCart size={24} className="mb-2" />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Manifest ({cart.length})
            </span>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md border-l-2 border-black font-montserrat flex flex-col p-0 overflow-hidden">
        {/* SUCCESS OVERLAY */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black text-white flex flex-col items-center justify-center p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-20 h-20 border-4 border-white flex items-center justify-center mb-8"
              >
                <Check size={40} strokeWidth={4} />
              </motion.div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
                Manifest Locked
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 leading-loose">
                Your provisions have been assigned to your stay. The estate
                office has been notified.
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-1 bg-white/20 mt-12 w-full absolute bottom-0 left-0"
              >
                <div className="h-full bg-[#8b0000] w-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <SheetHeader className="p-8 border-b border-gray-100">
          <SheetTitle className="text-3xl font-black uppercase tracking-tighter">
            Your Manifest
          </SheetTitle>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Estate Inventory v1.0
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingBag className="mb-4" size={40} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Empty Manifest
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item, idx) => (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={`${item.id}-${idx}`}
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
                      onClick={() => onRemove(item.id)}
                      className="mt-2 text-[9px] font-black uppercase text-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="text-xs font-black">£{item.price}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-8 bg-gray-50 border-t-2 border-black flex-col gap-6">
            <div className="w-full flex justify-between items-end mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Stay Billing
                </span>
                <span className="text-2xl font-black leading-none mt-1">
                  £{total}
                </span>
              </div>
              <Lock size={16} className="opacity-20" />
            </div>

            <button
              disabled={isProcessing}
              onClick={handleConfirm}
              className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-[6px_6px_0px_0px_rgba(139,0,0,1)] hover:bg-[#1a1a1a] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Sourcing Inventory...
                </>
              ) : (
                "Confirm & Lock to Stay"
              )}
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

// --- MAIN PAGE ---
export default function StorePage() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added to manifest.`, {
      style: {
        background: "black",
        color: "white",
        borderRadius: "0px",
        border: "1px solid black",
      },
    });
  };

  const handleRemoveFromCart = (id: string) => {
    // Note: This removes all instances of that ID.
    // For a more advanced cart, you'd remove by index.
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      <div className="text-black font-montserrat px-6 py-12 md:p-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b-2 border-black pb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-[2px] bg-[#8b0000]"></span>
                <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em]">
                  Estate Provisioning
                </p>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Gear & <br /> Provisions
              </h1>
              <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest leading-relaxed max-w-md">
                Professional-grade tools and exclusive member equipment,
                meticulously curated for the UK landscape.
              </p>
            </div>

            <CartDrawer
              cart={cart}
              onRemove={handleRemoveFromCart}
              onClear={() => setCart([])}
            />
          </header>

          <div className="flex flex-col lg:flex-row gap-16 mt-12">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-48 lg:sticky lg:top-32 h-fit">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-8 underline underline-offset-8 decoration-2 decoration-gray-200">
                Inventory
              </p>
              <div className="flex flex-row lg:flex-col flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-2",
                      filter === cat
                        ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]"
                        : "bg-transparent border-transparent text-gray-400 hover:text-black"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
                {EQUIPMENT_DATA.filter(
                  (item) => filter === "All" || item.category === filter
                ).map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col bg-white border border-gray-100 p-2 hover:border-black transition-all"
                  >
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight
                          className="text-white bg-black p-1"
                          size={24}
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col px-4 pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-black uppercase text-base tracking-tighter leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm font-black text-[#8b0000]">
                          £{item.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[8px] bg-gray-100 px-2 py-0.5 font-bold uppercase tracking-widest">
                          {item.category}
                        </span>
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-500 mb-8 leading-relaxed uppercase tracking-tight">
                        {item.description}
                      </p>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="mt-auto flex items-center justify-center gap-3 w-full border-2 border-black py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1"
                      >
                        <Plus size={14} /> Add to Stay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>

          {/* Concierge Footer */}
          <section className="mt-40 relative overflow-hidden border-2 border-black bg-white p-12 md:p-20 shadow-[12px_12px_0px_0px_rgba(139,0,0,1)]">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Bespoke Requirements?
                </h4>
                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] max-w-lg leading-loose">
                  Our estate team can source specialized outdoor gear, rare
                  spirits, or technical equipment with 48 hours notice. Your
                  stay, meticulously provisioned.
                </p>
              </div>
              <button className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#8b0000] transition-all whitespace-nowrap">
                Contact Concierge
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}