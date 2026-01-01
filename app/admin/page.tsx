// "use client";

// import React, { useState, useEffect } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import {
//   Plus,
//   Trash2,
//   Home,
//   LayoutDashboard,
//   Loader2,
//   Image as ImageIcon,
//   Edit3,
//   X,
// } from "lucide-react";
// import { toast } from "sonner";
// import Link from "next/link";
// import AdminGuard from "@/components/AdminGuard";

// export default function AdminPage() {
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [cabins, setCabins] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Form State
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Overnight Stays",
//     price: "",
//     location: "",
//     image: "",
//   });

//   const fetchCabins = async () => {
//     setLoading(true);
//     try {
//       const q = query(collection(db, "cabins"), orderBy("category", "asc"));
//       const querySnapshot = await getDocs(q);
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCabins(data);
//     } catch (error) {
//       toast.error("Failed to load catalog");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCabins();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       if (editingId) {
//         // Update existing item
//         await updateDoc(doc(db, "cabins", editingId), formData);
//         toast.success("Item updated successfully");
//       } else {
//         // Create new item
//         await addDoc(collection(db, "cabins"), formData);
//         toast.success("New item added to catalog");
//       }
//       resetForm();
//       fetchCabins();
//     } catch (error) {
//       toast.error("Error saving changes");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (cabin: any) => {
//     setEditingId(cabin.id);
//     setFormData({
//       name: cabin.name,
//       category: cabin.category,
//       price: cabin.price,
//       location: cabin.location,
//       image: cabin.image || "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to remove this item?")) return;
//     try {
//       await deleteDoc(doc(db, "cabins", id));
//       toast.success("Item removed");
//       fetchCabins();
//     } catch (error) {
//       toast.error("Error deleting item");
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       name: "",
//       category: "Overnight Stays",
//       price: "",
//       location: "",
//       image: "",
//     });
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-white font-montserrat flex text-black">
//         {/* Mini Sidebar */}
//         <aside className="w-20 bg-black flex flex-col items-center py-8 gap-8 border-r border-gray-100 shrink-0">
//           <Link
//             href="/dashboard"
//             className="text-white hover:text-[#8b0000] transition"
//           >
//             <LayoutDashboard size={24} />
//           </Link>
//           <div className="h-[1px] w-8 bg-gray-800" />
//           <Link href="/" className="text-gray-500 hover:text-white transition">
//             <Home size={24} />
//           </Link>
//         </aside>

//         <main className="flex-1 p-8 md:p-16 max-w-6xl mx-auto">
//           <header className="mb-12 flex justify-between items-start">
//             <div>
//               <h1 className="text-4xl font-black uppercase tracking-tighter">
//                 Inventory Control
//               </h1>
//               <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
//                 Manage the Model Cabin Catalog
//               </p>
//             </div>
//             {editingId && (
//               <Button
//                 onClick={resetForm}
//                 variant="ghost"
//                 className="text-[10px] font-black uppercase tracking-widest gap-2"
//               >
//                 <X size={14} /> Exit Edit Mode
//               </Button>
//             )}
//           </header>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//             {/* LEFT: FORM SECTION */}
//             <section className="space-y-8">
//               <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2 flex items-center gap-2">
//                 {editingId ? (
//                   <Edit3 size={14} className="text-[#8b0000]" />
//                 ) : (
//                   <Plus size={14} />
//                 )}
//                 {editingId ? "Update Existing Item" : "Add New Bookable"}
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="space-y-2">
//                   <Label className="text-[10px] uppercase font-black text-gray-500">
//                     Cabin/Service Name
//                   </Label>
//                   <Input
//                     required
//                     className="rounded-none border-gray-200 focus:border-black h-12"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     placeholder="e.g. The Glass House"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label className="text-[10px] uppercase font-black text-gray-500">
//                       Category
//                     </Label>
//                     <select
//                       className="w-full h-12 border border-gray-200 px-3 text-sm focus:outline-none focus:border-black rounded-none bg-white appearance-none"
//                       value={formData.category}
//                       onChange={(e) =>
//                         setFormData({ ...formData, category: e.target.value })
//                       }
//                     >
//                       <option>Overnight Stays</option>
//                       <option>Daytime Sessions</option>
//                       <option>Sauna & Wellness</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-[10px] uppercase font-black text-gray-500">
//                       Price (£)
//                     </Label>
//                     <Input
//                       required
//                       type="number"
//                       className="rounded-none border-gray-200 h-12"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({ ...formData, price: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-[10px] uppercase font-black text-gray-500">
//                     Location
//                   </Label>
//                   <Input
//                     className="rounded-none border-gray-200 h-12"
//                     value={formData.location}
//                     onChange={(e) =>
//                       setFormData({ ...formData, location: e.target.value })
//                     }
//                     placeholder="e.g. Derbyshire, UK"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-[10px] uppercase font-black text-gray-500">
//                     Image Direct URL
//                   </Label>
//                   <Input
//                     className="rounded-none border-gray-200 h-12"
//                     value={formData.image}
//                     onChange={(e) =>
//                       setFormData({ ...formData, image: e.target.value })
//                     }
//                     placeholder="https://images.unsplash.com/..."
//                   />
//                 </div>

//                 <Button
//                   disabled={isSubmitting}
//                   className={cn(
//                     "w-full rounded-none uppercase font-black text-xs h-14 tracking-widest mt-4 transition-all",
//                     editingId
//                       ? "bg-[#8b0000] hover:bg-black"
//                       : "bg-black hover:bg-[#8b0000]"
//                   )}
//                 >
//                   {isSubmitting ? (
//                     <Loader2 className="animate-spin" />
//                   ) : editingId ? (
//                     "Save Changes"
//                   ) : (
//                     "Confirm Entry"
//                   )}
//                 </Button>
//               </form>
//             </section>

//             {/* RIGHT: LIST SECTION */}
//             <section className="space-y-8">
//               <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
//                 Live Catalog
//               </h2>

//               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//                 {loading ? (
//                   <div className="flex justify-center py-10 text-gray-200">
//                     <Loader2 className="animate-spin" size={32} />
//                   </div>
//                 ) : cabins.length === 0 ? (
//                   <p className="text-[10px] uppercase text-gray-400 text-center py-10">
//                     No items found in database
//                   </p>
//                 ) : (
//                   cabins.map((cabin) => (
//                     <div
//                       key={cabin.id}
//                       className="group border border-gray-100 p-4 flex items-center justify-between hover:border-black transition-all"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
//                           {cabin.image ? (
//                             <img
//                               src={cabin.image}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <ImageIcon size={20} className="text-gray-200" />
//                           )}
//                         </div>
//                         <div>
//                           <p className="text-[10px] font-black uppercase tracking-tight">
//                             {cabin.name}
//                           </p>
//                           <p className="text-[9px] text-[#8b0000] font-black uppercase tracking-widest mt-0.5">
//                             £{cabin.price} • {cabin.category}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => handleEdit(cabin)}
//                           className="p-2 hover:bg-black hover:text-white transition-colors"
//                           title="Edit Item"
//                         >
//                           <Edit3 size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(cabin.id)}
//                           className="p-2 hover:bg-red-600 hover:text-white transition-colors"
//                           title="Delete Item"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </section>
//           </div>
//         </main>
//       </div>
//     </AdminGuard>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Home,
  LayoutDashboard,
  Loader2,
  Image as ImageIcon,
  Edit3,
  X,
  Inbox,
  LifeBuoy,
  Package,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";

export default function AdminPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cabins, setCabins] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Overnight Stays",
    price: "",
    location: "",
    image: "",
  });

  const fetchCabins = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "cabins"), orderBy("category", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCabins(data);
    } catch (error) {
      toast.error("Failed to load catalog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCabins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "cabins", editingId), formData);
        toast.success("Item updated successfully");
      } else {
        await addDoc(collection(db, "cabins"), formData);
        toast.success("New item added to catalog");
      }
      resetForm();
      fetchCabins();
    } catch (error) {
      toast.error("Error saving changes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (cabin: any) => {
    setEditingId(cabin.id);
    setFormData({
      name: cabin.name,
      category: cabin.category,
      price: cabin.price,
      location: cabin.location,
      image: cabin.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    try {
      await deleteDoc(doc(db, "cabins", id));
      toast.success("Item removed");
      fetchCabins();
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Overnight Stays",
      price: "",
      location: "",
      image: "",
    });
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#fcfcfc] font-montserrat flex text-black">
        {/* ENHANCED ADMIN SIDEBAR */}
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

          <div className="mt-auto pt-8 border-t border-gray-800">
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
              System v2.0.6
            </p>
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                Inventory Control
              </h1>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                Manage the bookable catalog and rates
              </p>
            </div>

            {/* QUICK LINKS MOBILE/COMMAND BAR */}
            <div className="flex gap-2">
              <Link
                href="/admin/inbox"
                className="bg-white border-2 border-black p-3 hover:bg-black hover:text-white transition-all group"
              >
                <Inbox size={20} />
              </Link>
              <Link
                href="/admin/support"
                className="bg-white border-2 border-black p-3 hover:bg-black hover:text-white transition-all"
              >
                <LifeBuoy size={20} />
              </Link>
              {editingId && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-2 border-[#8b0000] text-[#8b0000] rounded-none text-[10px] font-black uppercase tracking-widest h-12"
                >
                  <X size={14} className="mr-2" /> Cancel Edit
                </Button>
              )}
            </div>
          </header>

          {/* QUICK DASHBOARD STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <StatCard label="Total Items" value={cabins.length} />
            <StatCard
              label="Active Categories"
              value={new Set(cabins.map((c) => c.category)).size}
            />
            <StatCard
              label="Catalog Value"
              value={`£${cabins.reduce(
                (acc, curr) => acc + Number(curr.price || 0),
                0
              )}`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* LEFT: FORM SECTION */}
            <section className="space-y-8 bg-white p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2 flex items-center gap-2">
                {editingId ? (
                  <Edit3 size={14} className="text-[#8b0000]" />
                ) : (
                  <Plus size={14} />
                )}
                {editingId ? "Modify Resource" : "Register New Resource"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    Entry Name
                  </Label>
                  <Input
                    required
                    className="rounded-none border-gray-200 focus:border-black h-12 font-bold"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. THE BLACKWOOD CABIN"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                      Category
                    </Label>
                    <select
                      className="w-full h-12 border border-gray-200 px-3 text-xs font-bold focus:outline-none focus:border-black rounded-none bg-white appearance-none"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option>Overnight Stays</option>
                      <option>Daytime Sessions</option>
                      <option>Sauna & Wellness</option>
                      <option>Premium Experiences</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                      Base Rate (£)
                    </Label>
                    <Input
                      required
                      type="number"
                      className="rounded-none border-gray-200 h-12 font-bold"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    Location Identifier
                  </Label>
                  <Input
                    className="rounded-none border-gray-200 h-12 font-bold"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. ZONE A / DERBYSHIRE"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    Asset URL (Unsplash/CDN)
                  </Label>
                  <Input
                    className="rounded-none border-gray-200 h-12 font-bold"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <Button
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-none uppercase font-black text-xs h-14 tracking-[0.2em] mt-4 transition-all",
                    editingId
                      ? "bg-[#8b0000] hover:bg-black"
                      : "bg-black hover:bg-[#8b0000]"
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : editingId ? (
                    "Save Resource"
                  ) : (
                    "Commit to Database"
                  )}
                </Button>
              </form>
            </section>

            {/* RIGHT: LIST SECTION */}
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
                Operational Catalog
              </h2>

              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-gray-200" size={40} />
                  </div>
                ) : cabins.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-100 p-20 text-center uppercase font-black text-gray-300 text-[10px] tracking-widest">
                    No Active Records
                  </div>
                ) : (
                  cabins.map((cabin) => (
                    <div
                      key={cabin.id}
                      className="group bg-white border border-gray-100 p-5 flex items-center justify-between hover:border-black transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gray-50 overflow-hidden border border-gray-100 grayscale group-hover:grayscale-0 transition-all">
                          {cabin.image ? (
                            <img
                              src={cabin.image}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon size={20} className="text-gray-200" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">
                            {cabin.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                              £{cabin.price}
                            </span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                              {cabin.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cabin)}
                          className="p-2 border border-transparent hover:border-black transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cabin.id)}
                          className="p-2 border border-transparent hover:text-white hover:bg-[#8b0000] transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

/* HELPER COMPONENTS */

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

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-gray-100 p-6 shadow-sm">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-2xl font-black tracking-tighter">{value}</p>
    </div>
  );
}