// "use client";

// import React, { useState, useEffect } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Plus,
//   Trash2,
//   Home,
//   LayoutDashboard,
//   Loader2,
//   Image as ImageIcon,
// } from "lucide-react";
// import { toast } from "sonner";
// import Link from "next/link";

// export default function AdminPage() {
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [cabins, setCabins] = useState<any[]>([]);

//   // Form State
//   const [newCabin, setNewCabin] = useState({
//     name: "",
//     category: "Overnight Stays",
//     price: "",
//     location: "",
//     image: "", // URL for the image
//   });

//   // Fetch all items on load
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

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await addDoc(collection(db, "cabins"), newCabin);
//       toast.success("Item added to catalog");
//       setNewCabin({
//         name: "",
//         category: "Overnight Stays",
//         price: "",
//         location: "",
//         image: "",
//       });
//       fetchCabins();
//     } catch (error) {
//       toast.error("Error adding item");
//     } finally {
//       setIsSubmitting(false);
//     }
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

//   return (
//     <div className="min-h-screen bg-white font-montserrat flex text-black">
//       {/* Mini Admin Sidebar */}
//       <aside className="w-20 bg-black flex flex-col items-center py-8 gap-8 border-r border-gray-100">
//         <Link
//           href="/dashboard"
//           className="text-white hover:text-[#8b0000] transition"
//         >
//           <LayoutDashboard size={24} />
//         </Link>
//         <div className="h-[1px] w-8 bg-gray-800" />
//         <Link href="/" className="text-gray-500 hover:text-white transition">
//           <Home size={24} />
//         </Link>
//       </aside>

//       <main className="flex-1 p-8 md:p-16 max-w-6xl">
//         <header className="mb-12">
//           <h1 className="text-4xl font-black uppercase tracking-tighter">
//             Inventory Control
//           </h1>
//           <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mt-2">
//             Manage Cabins & Services
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//           {/* LEFT: ADD NEW FORM */}
//           <section className="space-y-8">
//             <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black pb-2">
//               Add New Bookable
//             </h2>
//             <form onSubmit={handleCreate} className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-[10px] uppercase font-bold text-gray-400">
//                   Cabin/Service Name
//                 </Label>
//                 <Input
//                   required
//                   className="rounded-none border-gray-200 focus:border-black"
//                   value={newCabin.name}
//                   onChange={(e) =>
//                     setNewCabin({ ...newCabin, name: e.target.value })
//                   }
//                   placeholder="e.g. The Boutique Cabin"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-[10px] uppercase font-bold text-gray-400">
//                     Category
//                   </Label>
//                   <select
//                     className="w-full h-10 border border-gray-200 px-3 text-sm focus:outline-none focus:border-black rounded-none bg-white"
//                     value={newCabin.category}
//                     onChange={(e) =>
//                       setNewCabin({ ...newCabin, category: e.target.value })
//                     }
//                   >
//                     <option>Overnight Stays</option>
//                     <option>Daytime Sessions</option>
//                     <option>Sauna & Wellness</option>
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-[10px] uppercase font-bold text-gray-400">
//                     Base Price (£)
//                   </Label>
//                   <Input
//                     required
//                     type="number"
//                     className="rounded-none border-gray-200"
//                     value={newCabin.price}
//                     onChange={(e) =>
//                       setNewCabin({ ...newCabin, price: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-[10px] uppercase font-bold text-gray-400">
//                   Location Description
//                 </Label>
//                 <Input
//                   className="rounded-none border-gray-200"
//                   value={newCabin.location}
//                   onChange={(e) =>
//                     setNewCabin({ ...newCabin, location: e.target.value })
//                   }
//                   placeholder="e.g. Derbyshire, UK"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-[10px] uppercase font-bold text-gray-400">
//                   Image URL
//                 </Label>
//                 <Input
//                   className="rounded-none border-gray-200"
//                   value={newCabin.image}
//                   onChange={(e) =>
//                     setNewCabin({ ...newCabin, image: e.target.value })
//                   }
//                   placeholder="https://images.unsplash.com/..."
//                 />
//               </div>

//               <Button
//                 disabled={isSubmitting}
//                 className="w-full bg-black text-white rounded-none uppercase font-black text-xs h-14 tracking-widest mt-4"
//               >
//                 {isSubmitting ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <>
//                     <Plus className="mr-2" size={16} /> Add to Catalog
//                   </>
//                 )}
//               </Button>
//             </form>
//           </section>

//           {/* RIGHT: CURRENT CATALOG */}
//           <section className="space-y-8">
//             <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black pb-2">
//               Current Catalog
//             </h2>

//             <div className="space-y-3">
//               {loading ? (
//                 <div className="flex justify-center py-10">
//                   <Loader2 className="animate-spin text-gray-200" size={32} />
//                 </div>
//               ) : (
//                 cabins.map((cabin) => (
//                   <div
//                     key={cabin.id}
//                     className="flex items-center justify-between p-4 border border-gray-100 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-300">
//                         {cabin.image ? (
//                           <img
//                             src={cabin.image}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <ImageIcon size={18} />
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-[10px] font-black uppercase tracking-tight">
//                           {cabin.name}
//                         </p>
//                         <p className="text-[9px] text-[#8b0000] font-bold uppercase tracking-widest">
//                           {cabin.category} — £{cabin.price}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDelete(cabin.id)}
//                       className="text-gray-300 hover:text-red-600 transition-colors"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
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
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminPage() {
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
        // Update existing item
        await updateDoc(doc(db, "cabins", editingId), formData);
        toast.success("Item updated successfully");
      } else {
        // Create new item
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
    <div className="min-h-screen bg-white font-montserrat flex text-black">
      {/* Mini Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center py-8 gap-8 border-r border-gray-100 shrink-0">
        <Link
          href="/dashboard"
          className="text-white hover:text-[#8b0000] transition"
        >
          <LayoutDashboard size={24} />
        </Link>
        <div className="h-[1px] w-8 bg-gray-800" />
        <Link href="/" className="text-gray-500 hover:text-white transition">
          <Home size={24} />
        </Link>
      </aside>

      <main className="flex-1 p-8 md:p-16 max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Inventory Control
            </h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Manage the Model Cabin Catalog
            </p>
          </div>
          {editingId && (
            <Button
              onClick={resetForm}
              variant="ghost"
              className="text-[10px] font-black uppercase tracking-widest gap-2"
            >
              <X size={14} /> Exit Edit Mode
            </Button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT: FORM SECTION */}
          <section className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2 flex items-center gap-2">
              {editingId ? (
                <Edit3 size={14} className="text-[#8b0000]" />
              ) : (
                <Plus size={14} />
              )}
              {editingId ? "Update Existing Item" : "Add New Bookable"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-500">
                  Cabin/Service Name
                </Label>
                <Input
                  required
                  className="rounded-none border-gray-200 focus:border-black h-12"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. The Glass House"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-gray-500">
                    Category
                  </Label>
                  <select
                    className="w-full h-12 border border-gray-200 px-3 text-sm focus:outline-none focus:border-black rounded-none bg-white appearance-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option>Overnight Stays</option>
                    <option>Daytime Sessions</option>
                    <option>Sauna & Wellness</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-gray-500">
                    Price (£)
                  </Label>
                  <Input
                    required
                    type="number"
                    className="rounded-none border-gray-200 h-12"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-500">
                  Location
                </Label>
                <Input
                  className="rounded-none border-gray-200 h-12"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Derbyshire, UK"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black text-gray-500">
                  Image Direct URL
                </Label>
                <Input
                  className="rounded-none border-gray-200 h-12"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <Button
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-none uppercase font-black text-xs h-14 tracking-widest mt-4 transition-all",
                  editingId
                    ? "bg-[#8b0000] hover:bg-black"
                    : "bg-black hover:bg-[#8b0000]"
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : editingId ? (
                  "Save Changes"
                ) : (
                  "Confirm Entry"
                )}
              </Button>
            </form>
          </section>

          {/* RIGHT: LIST SECTION */}
          <section className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
              Live Catalog
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-10 text-gray-200">
                  <Loader2 className="animate-spin" size={32} />
                </div>
              ) : cabins.length === 0 ? (
                <p className="text-[10px] uppercase text-gray-400 text-center py-10">
                  No items found in database
                </p>
              ) : (
                cabins.map((cabin) => (
                  <div
                    key={cabin.id}
                    className="group border border-gray-100 p-4 flex items-center justify-between hover:border-black transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                        {cabin.image ? (
                          <img
                            src={cabin.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-gray-200" />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-tight">
                          {cabin.name}
                        </p>
                        <p className="text-[9px] text-[#8b0000] font-black uppercase tracking-widest mt-0.5">
                          £{cabin.price} • {cabin.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(cabin)}
                        className="p-2 hover:bg-black hover:text-white transition-colors"
                        title="Edit Item"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cabin.id)}
                        className="p-2 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={14} />
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
  );
}