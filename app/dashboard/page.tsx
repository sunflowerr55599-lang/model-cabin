"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Settings,
  LogOut,
  User,
  Search,
  Clock,
  ShieldCheck,
  Loader2,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

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
  where,
  onSnapshot,
} from "firebase/firestore";

// UI Components
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import MembershipCard from "@/components/membershipCard";
import TierProgress from "@/components/tierProgress";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Navigation & Data
  const [activeTab, setActiveTab] = useState("overview");
  const [cabins, setCabins] = useState<any[]>([]);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Flow States
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Form States
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) setFormData((prev) => ({ ...prev, email: user.email || "" }));
  }, [user]);

  // Real-time listener for user bookings
  useEffect(() => {
    if (!user) return;

    // This query looks specifically for the logged-in user's UID
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUserBookings(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
      }
    );

    // Fetch Cabins
    const fetchCabins = async () => {
      const cabinSnap = await getDocs(
        query(collection(db, "cabins"), orderBy("category", "asc"))
      );
      setCabins(cabinSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchCabins();

    return () => unsubscribe();
  }, [user]);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !user || !selectedCabin) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: formData.email,
        telephone: formData.phone,
        message: formData.message,
        cabinName: selectedCabin.name,
        preferredPlan: selectedCabin.category,
        bookingDate: date,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      toast.success("Request sent to concierge.");
      setIsDetailsOpen(false);
      setActiveTab("overview");
      setFormData({ email: user.email || "", phone: "", message: "" });
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = Array.from(new Set(cabins.map((c) => c.category)));
  const pendingInquiries = userBookings.filter((b) => b.status === "pending");
  const confirmedStays = userBookings.filter((b) => b.status === "confirmed");

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] font-montserrat text-black">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col p-8 sticky top-0 h-screen z-30">
        <div className="border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
          The Model <br /> Cabin UK
        </div>
        <nav className="flex-1 space-y-6">
          <NavItem
            icon={<CalendarIcon size={18} />}
            label="My Bookings"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={<Search size={18} />}
            label="Browse Rates"
            active={activeTab === "browse"}
            onClick={() => setActiveTab("browse")}
          />
          <NavItem icon={<User size={18} />} label="Profile" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition uppercase text-[10px] font-bold tracking-[0.2em] mt-auto"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            Member Portal
          </p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            {activeTab === "overview" ? "Residency Overview" : "Select A Plan"}
          </h1>
        </header>

        {activeTab === "overview" ? (
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* Membership Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MembershipCard
                  tier="Base"
                  userName={user?.email?.split("@")[0] || "Member"}
                  memberSince="2026"
                />
              </div>
              <TierProgress nightsStayed={confirmedStays.length} />
            </div>

            {/* PENDING REQUESTS SECTION */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    pendingInquiries.length > 0
                      ? "bg-[#8b0000] animate-pulse"
                      : "bg-gray-300"
                  )}
                />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-black">
                  Pending Concierge Review ({pendingInquiries.length})
                </h3>
              </div>

              {loading ? (
                <div className="flex justify-center p-12">
                  <Loader2 className="animate-spin text-gray-300" />
                </div>
              ) : pendingInquiries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingInquiries.map((b) => (
                    <div
                      key={b.id}
                      className="bg-black text-white p-6 shadow-[8px_8px_0px_0px_rgba(139,0,0,1)] relative overflow-hidden group"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black uppercase text-sm tracking-tight">
                            {b.cabinName}
                          </h4>
                          <span className="text-[8px] bg-[#8b0000] px-2 py-0.5 font-black uppercase tracking-widest">
                            In Review
                          </span>
                        </div>
                        <div className="space-y-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <p className="flex items-center gap-2">
                            <CalendarIcon size={12} />
                            {b.bookingDate?.toDate
                              ? format(b.bookingDate.toDate(), "PPP")
                              : "Pending"}
                          </p>
                          <p className="flex items-center gap-2 text-[#8b0000]">
                            <Clock size={12} /> {b.preferredPlan}
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Clock size={40} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-100 p-8 text-center">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    No active inquiries
                  </p>
                </div>
              )}
            </section>

            {/* CONFIRMED HISTORY */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Confirmed Residencies
              </h3>
              {confirmedStays.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 p-12 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                    No confirmed stays yet
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {confirmedStays.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border p-6 flex justify-between items-center group hover:border-black transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-green-50 flex items-center justify-center text-green-600">
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-sm">
                            {b.cabinName}
                          </h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            Completed Residency
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-gray-300 group-hover:text-black transition-colors"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="grid gap-12 animate-in slide-in-from-bottom-4 duration-500">
            {categories.map((cat) => (
              <div key={cat} className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] border-b pb-2">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {cabins
                    .filter((c) => c.category === cat)
                    .map((cabin) => (
                      <div
                        key={cabin.id}
                        className="bg-white border p-6 flex justify-between items-center group hover:border-black transition-all"
                      >
                        <div>
                          <h4 className="font-black uppercase text-sm">
                            {cabin.name}
                          </h4>
                          <p className="text-[#8b0000] font-bold text-xs mt-1">
                            £{cabin.price}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCabin(cabin);
                            setIsCalendarOpen(true);
                          }}
                          className="bg-black text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest"
                        >
                          Reserve
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DIALOGS */}
        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="sm:max-w-sm p-0 rounded-none border-2 border-black overflow-hidden bg-white">
            <div className="bg-black text-white p-4 text-center text-[10px] font-black uppercase tracking-widest">
              Select Desired Date
            </div>
            <div className="p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
              />
            </div>
            <Button
              className="w-full h-14 bg-black text-white rounded-none uppercase font-black"
              onClick={() => {
                setIsCalendarOpen(false);
                setIsDetailsOpen(true);
              }}
            >
              Continue to Details
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md p-8 rounded-none border-none bg-white text-black">
            <div className="space-y-6">
              <header className="border-b-4 border-[#8b0000] pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  Inquiry Details
                </h2>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Plan: {selectedCabin?.name} —{" "}
                  {date ? format(date, "PPP") : ""}
                </p>
              </header>
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Phone size={12} /> Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MessageSquare size={12} /> Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border-2 border-gray-100 focus:border-black outline-none p-3 text-sm font-medium"
                    placeholder="Preferences..."
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  className="w-full h-14 bg-black text-white rounded-none font-black uppercase tracking-[0.2em] mt-4"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit To Concierge"
                  )}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-3 cursor-pointer transition-all",
        active
          ? "bg-white/10 text-white border-r-4 border-[#8b0000]"
          : "text-gray-500 hover:text-white"
      )}
    >
      <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
        {icon} {label}
      </span>
    </div>
  );
}