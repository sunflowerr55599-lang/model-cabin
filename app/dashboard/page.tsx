// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import {
//   Calendar as CalendarIcon,
//   Settings,
//   CreditCard,
//   MapPin,
//   LogOut,
//   User,
//   ExternalLink,
//   Search,
//   Clock,
//   Moon,
//   ShieldCheck,
//   Loader2, // For loading states
// } from "lucide-react";

// // Firebase Imports
// import { auth, db } from "@/lib/firebase";
// import { signOut } from "firebase/auth";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   serverTimestamp,
//   query,
//   orderBy,
// } from "firebase/firestore";

// // UI Components
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const router = useRouter();

//   // Navigation & Data State
//   const [activeTab, setActiveTab] = useState("overview");
//   const [cabins, setCabins] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Booking States
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [selectedCabin, setSelectedCabin] = useState<any>(null);
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 1. Fetch Cabins from Firestore
//   useEffect(() => {
//     const fetchCabins = async () => {
//       try {
//         const q = query(collection(db, "cabins"), orderBy("category", "asc"));
//         const querySnapshot = await getDocs(q);
//         const cabinData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCabins(cabinData);
//       } catch (error) {
//         console.error("Error fetching cabins:", error);
//         toast.error("Failed to load available cabins.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCabins();
//   }, []);

//   // Auth Guard
//   useEffect(() => {
//     if (!user) {
//       router.push("/accounts");
//     }
//   }, [user, router]);

//   if (!user) return null;

//   // --- LOGIC ---
//   const handleInitialClick = (cabin: any) => {
//     setSelectedCabin(cabin);
//     setIsConfirmOpen(true);
//   };

//   const proceedToDates = () => {
//     setIsConfirmOpen(false);
//     setIsCalendarOpen(true);
//   };

//   const handleFinalBooking = async () => {
//     if (!date || !user) {
//       toast.error("Please select a valid date.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await addDoc(collection(db, "bookings"), {
//         userId: user.uid,
//         userEmail: user.email,
//         cabinId: selectedCabin.id,
//         cabinName: selectedCabin.name,
//         bookingDate: date,
//         status: "pending",
//         createdAt: serverTimestamp(),
//       });

//       toast.success("Booking request sent successfully!");
//       setIsCalendarOpen(false);
//       setActiveTab("overview");
//     } catch (error) {
//       toast.error("Failed to send request.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Grouping logic for dynamic categories
//   const categories = Array.from(new Set(cabins.map((c) => c.category)));

//   return (
//     <div className="flex min-h-screen bg-[#f9f9f9] font-montserrat text-black">
//       {/* --- SIDEBAR --- */}
//       <aside className="w-64 bg-black text-white hidden md:flex flex-col p-8 sticky top-0 h-screen z-10">
//         <div className="border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
//           The Model <br /> Cabin UK
//         </div>

//         <nav className="flex-1 space-y-6">
//           <NavItem
//             icon={<CalendarIcon size={18} />}
//             label="My Bookings"
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//           />
//           <NavItem
//             icon={<Search size={18} />}
//             label="Browse Cabins"
//             active={activeTab === "browse"}
//             onClick={() => setActiveTab("browse")}
//           />
//           <NavItem icon={<User size={18} />} label="Profile Details" />
//           <NavItem icon={<CreditCard size={18} />} label="Billing" />
//           <NavItem icon={<Settings size={18} />} label="Preferences" />
//         </nav>

//         <button
//           onClick={() => signOut(auth).then(() => router.push("/"))}
//           className="flex items-center gap-3 text-gray-400 hover:text-white transition uppercase text-[10px] font-bold tracking-[0.2em] mt-auto"
//         >
//           <LogOut size={18} /> Sign Out
//         </button>
//       </aside>

//       {/* --- MAIN CONTENT --- */}
//       <main className="flex-1 p-8 md:p-12 overflow-y-auto">
//         <header className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
//           <div>
//             <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
//               {activeTab === "overview"
//                 ? "Member Dashboard"
//                 : "Availability Engine"}
//             </p>
//             <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight">
//               {activeTab === "overview" ? (
//                 <>
//                   Welcome back, <br />{" "}
//                   {user.displayName || user.email?.split("@")[0]}
//                 </>
//               ) : (
//                 <>
//                   Available <br /> Reservations
//                 </>
//               )}
//             </h1>
//           </div>
//         </header>

//         {activeTab === "overview" ? (
//           /* OVERVIEW TAB - Same as before */
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
//             {/* ... (Overview UI remains identical) ... */}
//           </div>
//         ) : (
//           /* BROWSE CABINS TAB - Dynamic Fetching */
//           <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
//             {loading ? (
//               <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs">
//                 <Loader2 className="animate-spin" size={16} /> Syncing with
//                 Vault...
//               </div>
//             ) : (
//               categories.map((categoryName) => (
//                 <section key={categoryName}>
//                   <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
//                     <span className="text-[#8b0000]">
//                       {categoryName.toLowerCase().includes("overnight") ? (
//                         <Moon size={14} />
//                       ) : (
//                         <Clock size={14} />
//                       )}
//                     </span>
//                     <h3 className="text-xs font-black uppercase tracking-[0.3em]">
//                       {categoryName}
//                     </h3>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {cabins
//                       .filter((c) => c.category === categoryName)
//                       .map((cabin) => (
//                         <div
//                           key={cabin.id}
//                           className="bg-white border border-gray-200 p-4 flex gap-4 hover:border-black transition-all group"
//                         >
//                           <div className="w-32 h-32 bg-gray-100 shrink-0 overflow-hidden border border-gray-100 relative">
//                             {/* Display cabin image from URL in database if available */}
//                             {cabin.image ? (
//                               <img
//                                 src={cabin.image}
//                                 alt={cabin.name}
//                                 className="object-cover w-full h-full"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
//                             )}
//                           </div>
//                           <div className="flex flex-col justify-between py-1 w-full">
//                             <div>
//                               <h4 className="font-black uppercase text-sm tracking-tight">
//                                 {cabin.name}
//                               </h4>
//                               <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
//                                 {cabin.location}
//                               </p>
//                             </div>
//                             <div className="flex justify-between items-end">
//                               <p className="text-sm font-bold text-[#8b0000]">
//                                 from £{cabin.price}
//                               </p>
//                               <button
//                                 onClick={() => handleInitialClick(cabin)}
//                                 className="text-[9px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 hover:text-[#8b0000] hover:border-[#8b0000] transition-colors"
//                               >
//                                 Book Now
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </section>
//               ))
//             )}
//           </div>
//         )}

//         {/* --- MODALS (Same as before but with selectedCabin?.name dynamic updates) --- */}
//         <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
//           <DialogContent className="max-w-md rounded-none border-none p-8 font-montserrat shadow-2xl bg-white text-black">
//             <DialogHeader>
//               <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-left">
//                 Confirm Selection
//               </DialogTitle>
//             </DialogHeader>
//             <div className="space-y-6 pt-4">
//               <div className="flex items-center gap-2 text-[#8b0000] font-black text-[10px] uppercase tracking-[0.2em]">
//                 <ShieldCheck size={16} /> Discreet Private Venue
//               </div>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 You are requesting to book{" "}
//                 <span className="font-black text-black underline decoration-2 decoration-[#8b0000] underline-offset-4">
//                   {selectedCabin?.name}
//                 </span>
//                 .
//               </p>
//               <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 italic">
//                 Please note that all **wellness services and masseuse
//                 treatments** must be pre-arranged via your dashboard at least 48
//                 hours prior to arrival.
//               </p>
//               <div className="flex flex-col gap-3 pt-4">
//                 <Button
//                   onClick={proceedToDates}
//                   className="bg-black text-white rounded-none uppercase font-black text-xs h-14 tracking-[0.2em] hover:bg-[#1a1a1a] transition-all"
//                 >
//                   Proceed to Dates
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsConfirmOpen(false)}
//                   className="border-gray-200 rounded-none uppercase font-black text-xs h-14 tracking-[0.2em]"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <DialogContent className="max-w-sm rounded-none border-2 border-black p-0 overflow-hidden shadow-2xl bg-white text-black">
//             <div className="p-6 bg-black text-white">
//               <h3 className="font-black uppercase text-xl tracking-tighter">
//                 Select Dates
//               </h3>
//               <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
//                 Checking availability for {selectedCabin?.name}
//               </p>
//             </div>
//             <div className="p-4 flex justify-center">
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 className="rounded-none border-none p-0"
//                 disabled={(date) => date < new Date()}
//               />
//             </div>
//             <Button
//               disabled={isSubmitting}
//               onClick={handleFinalBooking}
//               className="w-full bg-black text-white rounded-none uppercase font-black text-xs h-16 tracking-[0.2em] hover:bg-[#8b0000] transition-all"
//             >
//               {isSubmitting ? "Processing..." : "Confirm Booking Request"}
//             </Button>
//           </DialogContent>
//         </Dialog>
//       </main>
//     </div>
//   );
// }

// // --- SUB-COMPONENT ---
// function NavItem({
//   icon,
//   label,
//   active = false,
//   onClick,
// }: {
//   icon: any;
//   label: string;
//   active?: boolean;
//   onClick?: () => void;
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={cn(
//         "flex items-center gap-4 cursor-pointer transition-all text-xs font-bold uppercase tracking-widest p-3 -ml-3 rounded-none",
//         active
//           ? "text-white bg-white/10 border-r-4 border-[#8b0000]"
//           : "text-gray-500 hover:text-white hover:bg-white/5"
//       )}
//     >
//       <span className={cn("transition-colors", active ? "text-[#8b0000]" : "")}>
//         {icon}
//       </span>
//       {label}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Settings,
  CreditCard,
  MapPin,
  LogOut,
  User,
  ExternalLink,
  Search,
  Clock,
  Moon,
  ShieldCheck,
  Loader2,
  Menu, // Added for mobile
  X, // Added for mobile
} from "lucide-react";

// Firebase
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// UI Components
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Navigation & Data State
  const [activeTab, setActiveTab] = useState("overview");
  const [cabins, setCabins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile state

  // Booking States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const q = query(collection(db, "cabins"), orderBy("category", "asc"));
        const querySnapshot = await getDocs(q);
        const cabinData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCabins(cabinData);
      } catch (error) {
        toast.error("Failed to load available cabins.");
      } finally {
        setLoading(false);
      }
    };
    fetchCabins();
  }, []);

  useEffect(() => {
    if (!user) router.push("/accounts");
  }, [user, router]);

  if (!user) return null;

  const handleInitialClick = (cabin: any) => {
    setSelectedCabin(cabin);
    setIsConfirmOpen(true);
  };

  const handleFinalBooking = async () => {
    if (!date || !user) {
      toast.error("Please select a valid date.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        cabinId: selectedCabin.id,
        cabinName: selectedCabin.name,
        bookingDate: date,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      toast.success("Booking request sent!");
      setIsCalendarOpen(false);
      setActiveTab("overview");
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = Array.from(new Set(cabins.map((c) => c.category)));

  // Sidebar Content (Extracted to reuse)
  const SidebarContent = () => (
    <>
      <div className="border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
        The Model <br /> Cabin UK
      </div>

      <nav className="flex-1 space-y-6">
        <NavItem
          icon={<CalendarIcon size={18} />}
          label="My Bookings"
          active={activeTab === "overview"}
          onClick={() => {
            setActiveTab("overview");
            setIsMobileMenuOpen(false);
          }}
        />
        <NavItem
          icon={<Search size={18} />}
          label="Browse Cabins"
          active={activeTab === "browse"}
          onClick={() => {
            setActiveTab("browse");
            setIsMobileMenuOpen(false);
          }}
        />
        <NavItem icon={<User size={18} />} label="Profile Details" />
        <NavItem icon={<CreditCard size={18} />} label="Billing" />
        <NavItem icon={<Settings size={18} />} label="Preferences" />
      </nav>

      <button
        onClick={() => signOut(auth).then(() => router.push("/"))}
        className="flex items-center gap-3 text-gray-400 hover:text-white transition uppercase text-[10px] font-bold tracking-[0.2em] mt-auto"
      >
        <LogOut size={18} /> Sign Out
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] font-montserrat text-black">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col p-8 sticky top-0 h-screen z-20">
        <SidebarContent />
      </aside>

      {/* --- MOBILE SIDEBAR (OVERLAY) --- */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-50 transition-transform duration-300 md:hidden p-8 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white"
        >
          <X size={28} />
        </button>
        <SidebarContent />
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full">
        {/* MOBILE TOP NAV BAR */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <div className="font-black text-[10px] uppercase border border-black p-1 leading-none">
            The Model <br /> Cabin
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <header className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div>
            <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              {activeTab === "overview"
                ? "Member Dashboard"
                : "Availability Engine"}
            </p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
              {activeTab === "overview" ? (
                <>
                  Welcome back, <br />{" "}
                  {user.displayName || user.email?.split("@")[0]}
                </>
              ) : (
                <>
                  Available <br /> Reservations
                </>
              )}
            </h1>
          </div>
        </header>

        {activeTab === "overview" ? (
          <div className="animate-in fade-in duration-500">
            {/* Simple Placeholder for Overview to keep code concise */}
            <div className="p-8 border-2 border-dashed border-gray-200 text-center uppercase text-[10px] font-bold text-gray-400">
              Your upcoming stay details will appear here
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs">
                <Loader2 className="animate-spin" size={16} /> Syncing...
              </div>
            ) : (
              categories.map((categoryName) => (
                <section key={categoryName}>
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                    <span className="text-[#8b0000]">
                      {categoryName.toLowerCase().includes("overnight") ? (
                        <Moon size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]">
                      {categoryName}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cabins
                      .filter((c) => c.category === categoryName)
                      .map((cabin) => (
                        <div
                          key={cabin.id}
                          className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 hover:border-black transition-all group"
                        >
                          <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-100 shrink-0 overflow-hidden border border-gray-100 relative">
                            {cabin.image ? (
                              <img
                                src={cabin.image}
                                alt={cabin.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}
                          </div>
                          <div className="flex flex-col justify-between py-1 w-full">
                            <div>
                              <h4 className="font-black uppercase text-sm tracking-tight">
                                {cabin.name}
                              </h4>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                {cabin.location}
                              </p>
                            </div>
                            <div className="flex justify-between items-end mt-4 sm:mt-0">
                              <p className="text-sm font-bold text-[#8b0000]">
                                from £{cabin.price}
                              </p>
                              <button
                                onClick={() => handleInitialClick(cabin)}
                                className="text-[9px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              ))
            )}
          </div>
        )}

        {/* MODALS REMAIN THE SAME */}
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="max-w-[90vw] sm:max-w-md rounded-none border-none p-6 md:p-8 font-montserrat shadow-2xl bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-left">
                Confirm Selection
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 text-[#8b0000] font-black text-[10px] uppercase tracking-[0.2em]">
                <ShieldCheck size={16} /> Discreet Private Venue
              </div>
              <p className="text-gray-600 text-sm">
                Requesting:{" "}
                <span className="font-black text-black underline underline-offset-4">
                  {selectedCabin?.name}
                </span>
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setIsConfirmOpen(false);
                    setIsCalendarOpen(true);
                  }}
                  className="bg-black text-white rounded-none uppercase font-black text-xs h-14 tracking-widest"
                >
                  Proceed
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmOpen(false)}
                  className="rounded-none uppercase font-black text-xs h-14"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="max-w-[90vw] sm:max-w-sm rounded-none border-2 border-black p-0 overflow-hidden bg-white">
            <div className="p-6 bg-black text-white text-center">
              <h3 className="font-black uppercase text-xl">Select Dates</h3>
            </div>
            <div className="p-4 flex justify-center scale-90 sm:scale-100">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
              />
            </div>
            <Button
              disabled={isSubmitting}
              onClick={handleFinalBooking}
              className="w-full bg-black text-white rounded-none uppercase font-black text-xs h-16 tracking-widest"
            >
              {isSubmitting ? "Processing..." : "Confirm Request"}
            </Button>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 cursor-pointer transition-all text-xs font-bold uppercase tracking-widest p-3 -ml-3 rounded-none",
        active
          ? "text-white bg-white/10 border-r-4 border-[#8b0000]"
          : "text-gray-500 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn(active ? "text-[#8b0000]" : "")}>{icon}</span>
      {label}
    </div>
  );
}