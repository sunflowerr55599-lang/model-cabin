"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
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
  ChevronRight,
  Key,
  Edit3,
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
  doc,
  setDoc,
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
import MembershipCard from "@/components/membershipCard";
import TierProgress from "@/components/tierProgress";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Navigation & Data
  const [activeTab, setActiveTab] = useState("overview");
  const [cabins, setCabins] = useState<any[]>([]);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Flow States
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPrefOpen, setIsPrefOpen] = useState(false);

  const [selectedCabin, setSelectedCabin] = useState<any>(null);
  const [activePrefField, setActivePrefField] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [prefValue, setPrefValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Form States
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch User Profile Preferences
  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    });
    return () => unsub();
  }, [user]);

  // 2. Real-time listener for user bookings & Cabins
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeBookings = onSnapshot(q, (snapshot) => {
      setUserBookings(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    const fetchCabins = async () => {
      const cabinSnap = await getDocs(
        query(collection(db, "cabins"), orderBy("category", "asc"))
      );
      setCabins(cabinSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchCabins();

    return () => unsubscribeBookings();
  }, [user]);

  // 3. Logic: Update Preferences
  const handleUpdatePreference = async () => {
    if (!user || !activePrefField) return;
    setIsSubmitting(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          preferences: {
            [activePrefField.id]: prefValue,
          },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success(`${activePrefField.label} updated.`);
      setIsPrefOpen(false);
    } catch (error) {
      toast.error("Failed to update preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
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
          <Link href="/">
          The Model <br /> Cabin UK
          </Link>
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
          <NavItem
            icon={<User size={18} />}
            label="Account"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
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
            {activeTab === "overview" && "Residency Overview"}
            {activeTab === "browse" && "Select A Plan"}
            {activeTab === "account" && "Client Profile"}
          </h1>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-12 animate-in fade-in duration-500">
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
                  Active Inquiries ({pendingInquiries.length})
                </h3>
              </div>
              {loading ? (
                <Loader2 className="animate-spin text-gray-300" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingInquiries.map((b) => (
                    <div
                      key={b.id}
                      className="bg-black text-white p-6 shadow-[8px_8px_0px_0px_rgba(139,0,0,1)]"
                    >
                      <h4 className="font-black uppercase text-sm mb-4">
                        {b.cabinName}
                      </h4>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest space-y-1">
                        <p className="flex items-center gap-2">
                          <CalendarIcon size={12} />{" "}
                          {b.bookingDate?.toDate
                            ? format(b.bookingDate.toDate(), "PPP")
                            : "Pending"}
                        </p>
                        <p className="text-[#8b0000] uppercase font-black tracking-tighter text-xs">
                          Pending Concierge Approval
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* BROWSE TAB */}
        {activeTab === "browse" && (
          <div className="grid gap-12 animate-in slide-in-from-bottom-4">
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

        {/* ACCOUNT TAB */}
        {activeTab === "account" && (
          <div className="max-w-3xl space-y-12 animate-in fade-in duration-500">
            <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b0000]">
                Security & Identity
              </h3>
              <div className="grid gap-6 bg-white border p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-gray-400">
                      Email Address
                    </p>
                    <p className="font-bold text-sm">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-gray-400">
                      Account ID
                    </p>
                    <p className="font-mono text-[10px] text-gray-400 italic">
                      {user?.uid}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b0000]">
                Stay Preferences
              </h3>
              <div className="grid gap-4">
                {[
                  {
                    id: "dietary",
                    label: "Dietary Requirements",
                    value:
                      userProfile?.preferences?.dietary ||
                      "No requirements set",
                  },
                  {
                    id: "checkin",
                    label: "Arrival Protocol",
                    value:
                      userProfile?.preferences?.checkin || "In-Person Welcome",
                  },
                  {
                    id: "bar",
                    label: "In-Cabin Provisions",
                    value:
                      userProfile?.preferences?.bar || "Standard Selection",
                  },
                ].map((pref) => (
                  <div
                    key={pref.id}
                    onClick={() => {
                      setActivePrefField({ id: pref.id, label: pref.label });
                      setPrefValue(pref.value);
                      setIsPrefOpen(true);
                    }}
                    className="flex justify-between items-center border-b border-gray-200 pb-4 group cursor-pointer hover:border-black transition-all"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-tight block">
                        {pref.label}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                        {pref.value}
                      </span>
                    </div>
                    <Edit3
                      size={14}
                      className="text-gray-300 group-hover:text-black"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* DIALOG: CALENDAR */}
        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="sm:max-w-sm p-0 rounded-none border-2 border-black bg-white">
            <div className="bg-black text-white p-4 text-center text-[10px] font-black uppercase tracking-widest">
              Select Date
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
              Confirm Date
            </Button>
          </DialogContent>
        </Dialog>

        {/* DIALOG: BOOKING DETAILS */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md p-8 rounded-none border-none bg-white">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <header className="border-b-4 border-[#8b0000] pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  Inquiry Details
                </h2>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  {selectedCabin?.name} — {date ? format(date, "PPP") : ""}
                </p>
              </header>
              <div className="space-y-4">
                <input
                  required
                  type="tel"
                  placeholder="TELEPHONE"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 text-sm font-bold placeholder:text-gray-300"
                />
                <textarea
                  rows={3}
                  placeholder="SPECIAL REQUESTS / MESSAGE"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border-2 border-gray-100 focus:border-black outline-none p-3 text-sm font-medium"
                />
              </div>
              <Button
                disabled={isSubmitting}
                className="w-full h-14 bg-black text-white rounded-none font-black uppercase tracking-[0.2em]"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit To Concierge"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* DIALOG: PREFERENCES UPDATE */}
        <Dialog open={isPrefOpen} onOpenChange={setIsPrefOpen}>
          <DialogContent className="sm:max-w-md p-8 rounded-none border-2 border-black bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase tracking-tighter">
                Update {activePrefField?.label}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Requirement Detail
                </label>
                <textarea
                  value={prefValue}
                  onChange={(e) => setPrefValue(e.target.value)}
                  className="w-full border-2 border-gray-100 focus:border-black outline-none p-4 text-sm font-bold min-h-[120px]"
                />
              </div>
              <Button
                onClick={handleUpdatePreference}
                disabled={isSubmitting}
                className="w-full h-14 bg-black text-white rounded-none font-black uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
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