// "use client";

// import React, { useState, useEffect } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   orderBy,
//   query,
//   deleteDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import AdminGuard from "@/components/AdminGuard";
// import {
//   CheckCircle,
//   Mail,
//   Trash2,
//   MessageSquare,
//   ChevronRight,
//   Loader2,
//   Package,
//   Inbox,
//   LifeBuoy,
//   LayoutDashboard,
//   Home,
//   Search,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function AdminSupport() {
//   const pathname = usePathname();
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTicket, setSelectedTicket] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Real-time listener for tickets
//   useEffect(() => {
//     const q = query(
//       collection(db, "support_tickets"),
//       orderBy("createdAt", "desc")
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setTickets(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const updateStatus = async (id: string, newStatus: string) => {
//     try {
//       await updateDoc(doc(db, "support_tickets", id), { status: newStatus });
//       toast.success(`Ticket ${newStatus}`);
//       if (selectedTicket?.id === id) {
//         setSelectedTicket({ ...selectedTicket, status: newStatus });
//       }
//     } catch (e) {
//       toast.error("Update failed");
//     }
//   };

//   const filteredTickets = tickets.filter(
//     (t) =>
//       t.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-[#fcfcfc] font-montserrat flex text-black">
//         {/* 1. PERSISTENT ADMIN SIDEBAR */}
//         <aside className="w-64 bg-black text-white hidden lg:flex flex-col p-8 sticky top-0 h-screen z-30">
//           <div className="border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
//             The Model <br /> Cabin Admin
//           </div>

//           <nav className="flex-1 space-y-2">
//             <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
//               Management
//             </p>
//             <AdminNavItem
//               href="/admin"
//               icon={<Package size={18} />}
//               label="Inventory"
//               active={pathname === "/admin"}
//             />
//             <AdminNavItem
//               href="/admin/inbox"
//               icon={<Inbox size={18} />}
//               label="Inbox"
//               active={pathname === "/admin/inbox"}
//             />
//             <AdminNavItem
//               href="/admin/support"
//               icon={<LifeBuoy size={18} />}
//               label="Support"
//               active={pathname === "/admin/support"}
//             />

//             <div className="pt-8">
//               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
//                 Exit
//               </p>
//               <AdminNavItem
//                 href="/dashboard"
//                 icon={<LayoutDashboard size={18} />}
//                 label="User Portal"
//               />
//               <AdminNavItem
//                 href="/"
//                 icon={<Home size={18} />}
//                 label="Public Site"
//               />
//             </div>
//           </nav>
//         </aside>

//         {/* 2. TICKET LIST PANE */}
//         <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 h-screen overflow-y-auto bg-white flex flex-col">
//           <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
//             <h1 className="text-xl font-black uppercase tracking-tighter">
//               Support Desk
//             </h1>
//             <div className="relative mt-4">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={14}
//               />
//               <input
//                 type="text"
//                 placeholder="SEARCH TICKETS..."
//                 className="w-full bg-gray-50 border-none py-2 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-black transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {loading ? (
//               <div className="p-12 flex justify-center">
//                 <Loader2 className="animate-spin text-gray-200" />
//               </div>
//             ) : filteredTickets.length === 0 ? (
//               <div className="p-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                 No tickets found
//               </div>
//             ) : (
//               filteredTickets.map((ticket) => (
//                 <div
//                   key={ticket.id}
//                   onClick={() => setSelectedTicket(ticket)}
//                   className={cn(
//                     "p-6 border-b border-gray-50 cursor-pointer transition-all hover:bg-gray-50",
//                     selectedTicket?.id === ticket.id
//                       ? "bg-gray-50 border-l-4 border-[#8b0000]"
//                       : ""
//                   )}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={cn(
//                         "text-[8px] font-black uppercase px-2 py-0.5 tracking-widest",
//                         ticket.status === "open"
//                           ? "bg-orange-500 text-white"
//                           : "bg-black text-white"
//                       )}
//                     >
//                       {ticket.status}
//                     </span>
//                     <p className="text-[9px] text-gray-400 font-bold uppercase">
//                       {ticket.createdAt?.toDate
//                         ? format(ticket.createdAt.toDate(), "MMM d")
//                         : "NOW"}
//                     </p>
//                   </div>
//                   <h4 className="font-black text-xs uppercase truncate leading-tight">
//                     {ticket.subject}
//                   </h4>
//                   <p className="text-[10px] text-gray-400 font-bold truncate mt-1">
//                     {ticket.userEmail}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* 3. DETAIL VIEW PANE */}
//         <main className="flex-1 h-screen overflow-y-auto bg-[#fcfcfc]">
//           {selectedTicket ? (
//             <div className="p-8 md:p-16 max-w-4xl animate-in fade-in slide-in-from-right-4 duration-300">
//               <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
//                 <div>
//                   <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
//                     {selectedTicket.category || "General Inquiry"}
//                   </p>
//                   <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.85]">
//                     {selectedTicket.subject}
//                   </h2>
//                 </div>

//                 <div className="flex gap-2">
//                   {selectedTicket.status !== "resolved" && (
//                     <button
//                       onClick={() =>
//                         updateStatus(selectedTicket.id, "resolved")
//                       }
//                       className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all"
//                     >
//                       <CheckCircle size={16} /> Mark Resolved
//                     </button>
//                   )}
//                   <button
//                     onClick={async () => {
//                       if (confirm("Permanently delete this record?")) {
//                         await deleteDoc(
//                           doc(db, "support_tickets", selectedTicket.id)
//                         );
//                         setSelectedTicket(null);
//                         toast.success("Record expunged");
//                       }
//                     }}
//                     className="p-3 border-2 border-gray-200 text-gray-400 hover:text-[#8b0000] hover:border-[#8b0000] transition-all"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </header>

//               <div className="bg-white border-2 border-black p-10 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
//                 <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
//                   <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-sm font-black">
//                     {selectedTicket.userEmail[0].toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="text-xs font-black uppercase tracking-tight">
//                       {selectedTicket.userEmail}
//                     </p>
//                     <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 italic">
//                       UID: {selectedTicket.userId}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="prose prose-sm max-w-none">
//                   <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap font-medium">
//                     {selectedTicket.message}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
//                   Communication
//                 </p>
//                 <a
//                   href={`mailto:${selectedTicket.userEmail}?subject=Re: ${selectedTicket.subject}`}
//                   className="inline-flex items-center gap-3 bg-white border-2 border-black text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
//                 >
//                   <Mail size={16} /> Open External Mail Client
//                 </a>
//               </div>
//             </div>
//           ) : (
//             <div className="h-full flex flex-col items-center justify-center text-gray-200">
//               <div className="p-10 border-2 border-dashed border-gray-100 rounded-full mb-6">
//                 <MessageSquare size={64} strokeWidth={1} />
//               </div>
//               <p className="text-[10px] font-black uppercase tracking-[0.4em]">
//                 Select a dossier to review
//               </p>
//             </div>
//           )}
//         </main>
//       </div>
//     </AdminGuard>
//   );
// }

// /* HELPER COMPONENT (Uniform Navigation) */
// function AdminNavItem({
//   href,
//   icon,
//   label,
//   active,
// }: {
//   href: string;
//   icon: any;
//   label: string;
//   active?: boolean;
// }) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center justify-between p-3 transition-all group",
//         active
//           ? "bg-white text-black font-black shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]"
//           : "text-gray-400 hover:text-white hover:bg-white/5"
//       )}
//     >
//       <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest">
//         {icon} {label}
//       </div>
//       {active && <ChevronRight size={14} />}
//     </Link>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import {
  LifeBuoy,
  Package,
  Inbox,
  LayoutDashboard,
  Home,
  ChevronRight,
  Menu,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";

export default function AdminSupport() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#fcfcfc] font-montserrat flex text-black">
        {/* DESKTOP SIDEBAR */}
        <aside className="w-64 bg-black text-white hidden lg:flex flex-col p-8 sticky top-0 h-screen z-30">
          <SidebarContent pathname={pathname} />
        </aside>

        <main className="flex-1 p-6 md:p-16 max-w-7xl mx-auto w-full">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* MOBILE MENU TRIGGER */}
              <div className="lg:hidden">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-black rounded-none"
                    >
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="bg-black text-white border-r-0 p-8 w-72"
                  >
                    <SheetHeader className="text-left mb-8">
                      <SheetTitle className="text-white border-2 border-white p-2 px-3 inline-block font-black text-xs uppercase leading-none tracking-tighter">
                        The Model <br /> Cabin Admin
                      </SheetTitle>
                    </SheetHeader>
                    <SidebarContent
                      pathname={pathname}
                      onNavItemClick={() => setIsMobileMenuOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div>
                <p className="text-[#8b0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                  Technical Assistance
                </p>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  Support <br /> Terminal
                </h1>
              </div>
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="SEARCH TICKETS..."
                className="pl-10 rounded-none border-2 border-black font-bold uppercase text-[10px] tracking-widest h-12 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* SUPPORT STATS / FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <SupportFilterCard
              icon={<AlertTriangle size={20} />}
              label="Critical Issues"
              count={2}
              color="text-red-600"
            />
            <SupportFilterCard
              icon={<Clock size={20} />}
              label="Pending Review"
              count={5}
              color="text-amber-600"
            />
            <SupportFilterCard
              icon={<CheckCircle2 size={20} />}
              label="Resolved Today"
              count={12}
              color="text-green-600"
            />
          </div>

          {/* PLACEHOLDER CONTENT FOR TICKETS */}
          <div className="space-y-6">
            <div className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-red-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-tighter">
                  Maintenance Alert
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  #TK-8821
                </span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">
                Sauna Heater Malfunction - Cabin 04
              </h3>
              <p className="text-sm text-gray-600 mb-6 italic">
                "The digital control panel in the Blackwood Sauna is showing an
                Error 04. Guests cannot adjust the heat."
              </p>
              <div className="flex gap-4">
                <Button className="rounded-none bg-black text-white uppercase text-[10px] font-black tracking-widest h-12 px-8">
                  Dispatch Team
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none border-2 border-black uppercase text-[10px] font-black tracking-widest h-12"
                >
                  Contact Guest
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

/* REUSABLE SIDEBAR CONTENT (Synced across all pages) */
function SidebarContent({
  pathname,
  onNavItemClick,
}: {
  pathname: string;
  onNavItemClick?: () => void;
}) {
  return (
    <>
      <div className="hidden lg:block border-2 border-white p-2 px-3 font-black text-sm uppercase leading-none tracking-tighter mb-12">
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
          onClick={onNavItemClick}
        />
        <AdminNavItem
          href="/admin/inbox"
          icon={<Inbox size={18} />}
          label="Inbox"
          active={pathname === "/admin/inbox"}
          onClick={onNavItemClick}
        />
        <AdminNavItem
          href="/admin/support"
          icon={<LifeBuoy size={18} />}
          label="Support"
          active={pathname === "/admin/support"}
          onClick={onNavItemClick}
        />

        <div className="pt-8">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
            Exit
          </p>
          <AdminNavItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="User Portal"
            onClick={onNavItemClick}
          />
          <AdminNavItem
            href="/"
            icon={<Home size={18} />}
            label="Public Site"
            onClick={onNavItemClick}
          />
        </div>
      </nav>
    </>
  );
}

function AdminNavItem({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
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

function SupportFilterCard({
  icon,
  label,
  count,
  color,
}: {
  icon: any;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="bg-white border-2 border-black p-6 flex items-center justify-between hover:bg-black hover:text-white transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "p-2 bg-gray-50 group-hover:bg-gray-800 transition-all",
            color
          )}
        >
          {icon}
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-300">
            {label}
          </p>
          <p className="text-2xl font-black">{count}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  );
}