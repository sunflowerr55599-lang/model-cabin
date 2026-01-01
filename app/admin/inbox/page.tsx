// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   Mail,
//   Phone,
//   Calendar as CalendarIcon,
//   MessageSquare,
//   CheckCircle2,
//   Clock,
//   Trash2,
//   ExternalLink,
// } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import AdminGuard from "@/components/AdminGuard";

// export default function AdminInbox() {
//   const [inquiries, setInquiries] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

//     // Real-time listener so the admin sees new requests instantly
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setInquiries(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const updateStatus = async (id: string, newStatus: string) => {
//     try {
//       await updateDoc(doc(db, "bookings", id), { status: newStatus });
//       toast.success(`Marked as ${newStatus}`);
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-white font-montserrat p-6 md:p-12">
//         <div className="max-w-6xl mx-auto">
//           <header className="mb-12 border-b-4 border-black pb-8 flex justify-between items-end">
//             <div>
//               <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
//                 Concierge Access
//               </p>
//               <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
//                 Inquiry <br />
//                 Inbox
//               </h1>
//             </div>
//             <div className="text-right">
//               <p className="text-[10px] font-bold uppercase text-gray-400">
//                 Total Requests
//               </p>
//               <p className="text-3xl font-black">{inquiries.length}</p>
//             </div>
//           </header>

//           {loading ? (
//             <div className="flex justify-center py-20 italic text-gray-400 uppercase text-[10px] tracking-widest">
//               Scanning Vault...
//             </div>
//           ) : (
//             <div className="grid gap-6">
//               {inquiries.map((item) => (
//                 <div
//                   key={item.id}
//                   className={cn(
//                     "border-2 p-6 transition-all flex flex-col lg:flex-row gap-8",
//                     item.status === "confirmed"
//                       ? "border-gray-100 opacity-60"
//                       : "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
//                   )}
//                 >
//                   {/* Client Info */}
//                   <div className="flex-1 space-y-4">
//                     <div className="flex items-center gap-3">
//                       <span
//                         className={cn(
//                           "text-[9px] font-black uppercase px-2 py-1 tracking-tighter",
//                           item.status === "pending"
//                             ? "bg-[#8b0000] text-white"
//                             : "bg-green-500 text-white"
//                         )}
//                       >
//                         {item.status}
//                       </span>
//                       <h3 className="font-black uppercase text-lg leading-none">
//                         {item.cabinName}
//                       </h3>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
//                       <div className="flex items-center gap-2">
//                         <Mail size={14} className="text-black" />{" "}
//                         {item.userEmail}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone size={14} className="text-black" />{" "}
//                         {item.telephone || "No Phone Provided"}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <CalendarIcon size={14} className="text-black" />
//                         {item.bookingDate?.toDate
//                           ? format(item.bookingDate.toDate(), "PPP")
//                           : "TBD"}
//                       </div>
//                       <div className="flex items-center gap-2 italic text-[#8b0000]">
//                         <Clock size={14} /> Plan: {item.preferredPlan}
//                       </div>
//                     </div>

//                     {item.message && (
//                       <div className="bg-gray-50 p-4 border-l-4 border-black">
//                         <p className="text-[10px] font-black uppercase text-gray-400 mb-1 flex items-center gap-2">
//                           <MessageSquare size={12} /> Client Message:
//                         </p>
//                         <p className="text-xs font-medium italic">
//                           &quot;{item.message}&quot;
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex lg:flex-col justify-end gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
//                     <a
//                       href={`mailto:${item.userEmail}?subject=Reservation: ${item.cabinName}`}
//                       className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#8b0000] transition-colors"
//                     >
//                       <Mail size={14} /> Reply
//                     </a>

//                     {item.status === "pending" && (
//                       <button
//                         onClick={() => updateStatus(item.id, "confirmed")}
//                         className="flex items-center justify-center gap-2 border-2 border-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-colors"
//                       >
//                         <CheckCircle2 size={14} /> Resolve
//                       </button>
//                     )}

//                     <button
//                       onClick={() => {
//                         if (confirm("Delete inquiry?"))
//                           deleteDoc(doc(db, "bookings", item.id));
//                       }}
//                       className="p-3 text-gray-300 hover:text-[#8b0000] transition-colors self-center"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }


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
  LayoutDashboard,
  Home,
  Inbox,
  LifeBuoy,
  Package,
  ChevronRight,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";

export default function AdminInbox() {
  const pathname = usePathname();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPending, setFilterPending] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

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

  const displayInquiries = filterPending
    ? inquiries.filter((i) => i.status === "pending")
    : inquiries;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#fcfcfc] font-montserrat flex text-black">
        {/* SHARED ADMIN SIDEBAR */}
        <aside className="w-64 bg-black text-white hidden lg:flex flex-col p-8 sticky top-0 h-screen z-30">
          <div className="border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
            The Model <br /> Cabin Admin
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
              Management
            </p>
            <AdminNavItem
              href="/admin"
              icon={<Package size={18} />}
              label="Inventory"
              active={pathname === "/admin"}
            />
            <AdminNavItem
              href="/admin/inbox"
              icon={<Inbox size={18} />}
              label="Inbox"
              active={pathname === "/admin/inbox"}
            />
            <AdminNavItem
              href="/admin/support"
              icon={<LifeBuoy size={18} />}
              label="Support"
              active={pathname === "/admin/support"}
            />

            <div className="pt-8">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
                Exit
              </p>
              <AdminNavItem
                href="/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="User Portal"
              />
              <AdminNavItem
                href="/"
                icon={<Home size={18} />}
                label="Public Site"
              />
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                Concierge Access
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                Inquiry <br /> Inbox
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setFilterPending(!filterPending)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  filterPending
                    ? "bg-[#8b0000] border-[#8b0000] text-white"
                    : "border-black text-black"
                )}
              >
                <Filter size={14} />{" "}
                {filterPending ? "Showing Pending" : "Show All"}
              </button>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase text-gray-400">
                  Live Traffic
                </p>
                <p className="text-3xl font-black">{inquiries.length}</p>
              </div>
            </div>
          </header>

          {loading ? (
            <div className="flex justify-center py-20 italic text-gray-400 uppercase text-[10px] tracking-widest animate-pulse">
              Scanning Vault...
            </div>
          ) : (
            <div className="grid gap-6">
              {displayInquiries.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 p-20 text-center uppercase font-black text-gray-300 text-[10px] tracking-widest">
                  No matching inquiries found
                </div>
              ) : (
                displayInquiries.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "bg-white border-2 p-8 transition-all flex flex-col lg:flex-row gap-8 relative",
                      item.status === "confirmed"
                        ? "border-gray-100 opacity-60 grayscale-[0.5]"
                        : "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(139,0,0,1)]"
                    )}
                  >
                    {/* Status Ribbon */}
                    <div
                      className={cn(
                        "absolute top-0 right-0 px-4 py-1 text-[8px] font-black uppercase tracking-[0.2em]",
                        item.status === "pending"
                          ? "bg-[#8b0000] text-white"
                          : "bg-black text-white"
                      )}
                    >
                      {item.status}
                    </div>

                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="font-black uppercase text-2xl tracking-tighter mb-1">
                          {item.cabinName}
                        </h3>
                        <p className="text-[10px] text-[#8b0000] font-black uppercase tracking-widest">
                          Inquiry ID: {item.id.slice(0, 8)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-[11px] font-bold uppercase tracking-tight">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-2">
                          <Mail size={14} className="text-gray-400" />
                          <span className="text-black">{item.userEmail}</span>
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-2">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-black">
                            {item.telephone || "NO PHONE"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-2">
                          <CalendarIcon size={14} className="text-gray-400" />
                          <span className="text-black">
                            {item.bookingDate?.toDate
                              ? format(item.bookingDate.toDate(), "PPP")
                              : "TBD"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-2">
                          <Clock size={14} className="text-[#8b0000]" />
                          <span className="text-[#8b0000]">
                            PLAN: {item.preferredPlan}
                          </span>
                        </div>
                      </div>

                      {item.message && (
                        <div className="bg-[#f9f9f9] p-5 border-l-4 border-black">
                          <p className="text-[9px] font-black uppercase text-gray-400 mb-2 tracking-widest">
                            Client Memo
                          </p>
                          <p className="text-sm font-medium leading-relaxed italic text-gray-700">
                            &quot;{item.message}&quot;
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex lg:flex-col justify-end gap-3 lg:w-48">
                      <a
                        href={`mailto:${item.userEmail}?subject=The Model Cabin Reservation: ${item.cabinName}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#8b0000] transition-all"
                      >
                        <Mail size={14} /> Send Email
                      </a>

                      {item.status === "pending" && (
                        <button
                          onClick={() => updateStatus(item.id, "confirmed")}
                          className="flex-1 flex items-center justify-center gap-2 border-2 border-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                          <CheckCircle2 size={14} /> Confirm
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm("Permanently delete this inquiry?"))
                            deleteDoc(doc(db, "bookings", item.id));
                        }}
                        className="p-4 text-gray-300 hover:text-[#8b0000] transition-colors border-2 border-transparent hover:border-gray-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}

/* HELPER COMPONENT (Maintain uniformity with Inventory page) */
function AdminNavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between p-3 transition-all group",
        active
          ? "bg-white text-black font-black"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest">
        {icon} {label}
      </div>
      {active && <ChevronRight size={14} />}
    </Link>
  );
}