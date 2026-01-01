"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import AdminGuard from "@/components/AdminGuard";
import {
  CheckCircle,
  Clock,
  Mail,
  Trash2,
  MessageSquare,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminSupport() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "support_tickets"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "support_tickets", id), { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchTickets();
      if (selectedTicket?.id === id) setSelectedTicket(null);
    } catch (e) {
      toast.error("Update failed");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white text-black font-montserrat flex flex-col md:flex-row">
        {/* Sidebar List */}
        <div className="w-full md:w-96 border-r border-gray-100 h-screen overflow-y-auto bg-[#f9f9f9]">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-black uppercase tracking-tighter">
              Concierge Inbox
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              {tickets.length} Active Tickets
            </p>
          </div>

          {loading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  "p-6 border-b border-gray-100 cursor-pointer transition-all hover:bg-white",
                  selectedTicket?.id === ticket.id
                    ? "bg-white border-l-4 border-[#8b0000]"
                    : ""
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={cn(
                      "text-[8px] font-black uppercase px-2 py-0.5 tracking-widest",
                      ticket.status === "open"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    )}
                  >
                    {ticket.status}
                  </span>
                  <p className="text-[9px] text-gray-400 font-bold">
                    {ticket.createdAt?.toDate
                      ? format(ticket.createdAt.toDate(), "MMM d")
                      : "Just now"}
                  </p>
                </div>
                <h4 className="font-bold text-sm uppercase truncate">
                  {ticket.subject}
                </h4>
                <p className="text-[10px] text-gray-500 truncate mt-1">
                  {ticket.userEmail}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail View */}
        <div className="flex-1 h-screen overflow-y-auto p-8 md:p-16">
          {selectedTicket ? (
            <div className="max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                    {selectedTicket.category}
                  </p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                    {selectedTicket.subject}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedTicket.id, "resolved")}
                    className="p-2 border border-gray-200 hover:bg-green-50 hover:text-green-600 transition-colors"
                    title="Mark Resolved"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Delete permanently?")) {
                        await deleteDoc(
                          doc(db, "support_tickets", selectedTicket.id)
                        );
                        setSelectedTicket(null);
                        fetchTickets();
                      }
                    }}
                    className="p-2 border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-[#f9f9f9] p-8 mb-8 border-l-2 border-black">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    {selectedTicket.userEmail[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase">
                      {selectedTicket.userEmail}
                    </p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">
                      Member ID: {selectedTicket.userId.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {selectedTicket.message}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest border-b pb-2">
                  Actions
                </h3>
                <a
                  href={`mailto:${selectedTicket.userEmail}?subject=Re: ${selectedTicket.subject}`}
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#8b0000] transition-all"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <MessageSquare size={48} strokeWidth={1} className="mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Select a ticket to review
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
