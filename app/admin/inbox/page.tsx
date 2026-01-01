"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  Mail,
  Phone,
  Calendar as CalendarIcon,
  MessageSquare,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AdminGuard from "@/components/AdminGuard";

export default function AdminInbox() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

    // Real-time listener so the admin sees new requests instantly
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white font-montserrat p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 border-b-4 border-black pb-8 flex justify-between items-end">
            <div>
              <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                Concierge Access
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                Inquiry <br />
                Inbox
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-gray-400">
                Total Requests
              </p>
              <p className="text-3xl font-black">{inquiries.length}</p>
            </div>
          </header>

          {loading ? (
            <div className="flex justify-center py-20 italic text-gray-400 uppercase text-[10px] tracking-widest">
              Scanning Vault...
            </div>
          ) : (
            <div className="grid gap-6">
              {inquiries.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "border-2 p-6 transition-all flex flex-col lg:flex-row gap-8",
                    item.status === "confirmed"
                      ? "border-gray-100 opacity-60"
                      : "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  )}
                >
                  {/* Client Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-[9px] font-black uppercase px-2 py-1 tracking-tighter",
                          item.status === "pending"
                            ? "bg-[#8b0000] text-white"
                            : "bg-green-500 text-white"
                        )}
                      >
                        {item.status}
                      </span>
                      <h3 className="font-black uppercase text-lg leading-none">
                        {item.cabinName}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-black" />{" "}
                        {item.userEmail}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-black" />{" "}
                        {item.telephone || "No Phone Provided"}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-black" />
                        {item.bookingDate?.toDate
                          ? format(item.bookingDate.toDate(), "PPP")
                          : "TBD"}
                      </div>
                      <div className="flex items-center gap-2 italic text-[#8b0000]">
                        <Clock size={14} /> Plan: {item.preferredPlan}
                      </div>
                    </div>

                    {item.message && (
                      <div className="bg-gray-50 p-4 border-l-4 border-black">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1 flex items-center gap-2">
                          <MessageSquare size={12} /> Client Message:
                        </p>
                        <p className="text-xs font-medium italic">
                          &quot;{item.message}&quot;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col justify-end gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
                    <a
                      href={`mailto:${item.userEmail}?subject=Reservation: ${item.cabinName}`}
                      className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#8b0000] transition-colors"
                    >
                      <Mail size={14} /> Reply
                    </a>

                    {item.status === "pending" && (
                      <button
                        onClick={() => updateStatus(item.id, "confirmed")}
                        className="flex items-center justify-center gap-2 border-2 border-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle2 size={14} /> Resolve
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm("Delete inquiry?"))
                          deleteDoc(doc(db, "bookings", item.id));
                      }}
                      className="p-3 text-gray-300 hover:text-[#8b0000] transition-colors self-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
