"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  MessageSquare,
  Phone,
  Send,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SupportPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    category: "General Inquiry",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in");

    setLoading(true);
    try {
      await addDoc(collection(db, "support_tickets"), {
        userId: user.uid,
        userEmail: user.email,
        ...formData,
        status: "open",
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent to the Concierge team.");
      setFormData({ subject: "", message: "", category: "General Inquiry" });
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f9f9f9] text-black font-montserrat p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 hover:text-[#8b0000] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>

          <header className="mb-12">
            <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Concierge Access
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              How Can We <br /> Assist Your Stay?
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 border-b border-black pb-2">
                  Direct Lines
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Email
                      </p>
                      <p className="text-sm font-bold">
                        concierge@modelcabin.uk
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Membership Line
                      </p>
                      <p className="text-sm font-bold">+44 (0) 20 1234 5678</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black p-6 text-white">
                <MessageSquare className="mb-4 text-[#8b0000]" size={24} />
                <h4 className="font-black uppercase text-sm mb-2">Live Chat</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider">
                  Available for Elite Members <br /> Mon — Fri, 9am — 6pm GMT
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white border border-gray-200 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest">
                      Inquiry Category
                    </label>
                    <select
                      className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 text-sm transition-colors bg-transparent"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option>General Inquiry</option>
                      <option>Booking Modification</option>
                      <option>Membership Billing</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest">
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Brief summary"
                      className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 text-sm transition-colors"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can our team help?"
                    className="w-full border-2 border-gray-100 focus:border-black outline-none p-4 text-sm transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white font-black uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 hover:bg-[#8b0000] transition-all disabled:bg-gray-400"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
