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
  ShieldAlert,
  Key,
  ClipboardCheck,
  Menu,
  MapPin,
  PoundSterling,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Overnight Stays",
    price: "",
    location: "",
    image: "",
    entryCode: "",
    safetyStatus: "Verified",
  });

  const fetchCabins = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "cabins"), orderBy("name", "asc"));
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

  const generateEntryCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setFormData({ ...formData, entryCode: code });
    toast.info("Secure code generated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Name and Price are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "cabins", editingId), formData);
        toast.success("Resource updated successfully");
      } else {
        await addDoc(collection(db, "cabins"), formData);
        toast.success("New resource added to catalog");
      }
      resetForm();
      fetchCabins();
    } catch (error) {
      toast.error("Database error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (cabin: any) => {
    setEditingId(cabin.id);
    setFormData({
      name: cabin.name || "",
      category: cabin.category || "Overnight Stays",
      price: cabin.price || "",
      location: cabin.location || "",
      image: cabin.image || "",
      entryCode: cabin.entryCode || "",
      safetyStatus: cabin.safetyStatus || "Verified",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this resource from the catalog?")) return;
    try {
      await deleteDoc(doc(db, "cabins", id));
      toast.success("Resource removed");
      fetchCabins();
    } catch (error) {
      toast.error("Error deleting document");
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
      entryCode: "",
      safetyStatus: "Verified",
    });
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#fcfcfc] font-montserrat flex text-black">
        {/* DESKTOP SIDEBAR */}
        <aside className="w-64 bg-black text-white hidden lg:flex flex-col p-8 sticky top-0 h-screen z-30">
          <SidebarContent pathname={pathname} />
        </aside>

        <main className="flex-1 p-6 md:p-16 max-w-7xl mx-auto w-full">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
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
                        <Link href="/">
                        The Model <br /> Cabin Admin
                        </Link>
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
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Command Centre
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                  Logistics & Safety Control
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {editingId && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-2 border-[#8b0000] text-[#8b0000] rounded-none text-[10px] font-black uppercase h-12 flex-1 md:flex-none"
                >
                  <X size={14} className="mr-2" /> Cancel Edit
                </Button>
              )}
            </div>
          </header>

          {/* DASHBOARD STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard label="Total Items" value={cabins.length} />
            <StatCard label="Security Clear" value="100%" />
            <StatCard
              label="Active Codes"
              value={cabins.filter((c) => c.entryCode).length}
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
            {/* LEFT COLUMN: MANAGEMENT FORM */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-[#8b0000]" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                  {editingId ? "Edit Resource" : "Add New Resource"}
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Cabin Identity
                    </Label>
                    <Input
                      placeholder="e.g. THE BLACKWOOD"
                      className="rounded-none border-2 border-black font-bold h-12 mt-1"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Price per night
                      </Label>
                      <div className="relative">
                        <PoundSterling
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <Input
                          type="number"
                          placeholder="250"
                          className="pl-10 rounded-none border-2 border-black font-bold h-12 mt-1"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Location
                      </Label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <Input
                          placeholder="Lake District"
                          className="pl-10 rounded-none border-2 border-black font-bold h-12 mt-1"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Image URL
                    </Label>
                    <Input
                      placeholder="https://..."
                      className="rounded-none border-2 border-black font-bold h-12 mt-1"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-4 border-t-2 border-gray-50 flex items-end gap-4">
                    <div className="flex-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Entry Security Code
                      </Label>
                      <Input
                        readOnly
                        placeholder="####"
                        className="bg-gray-50 rounded-none border-2 border-black font-mono font-black text-center text-lg h-12 mt-1 tracking-[0.5em]"
                        value={formData.entryCode}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={generateEntryCode}
                      variant="outline"
                      className="border-2 border-black rounded-none h-12 px-6 hover:bg-black hover:text-white transition-all"
                    >
                      <Key size={16} />
                    </Button>
                  </div>
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-black hover:bg-[#8b0000] text-white rounded-none h-14 font-black uppercase tracking-[0.2em] transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Deploy to Catalog"
                  )}
                </Button>
              </form>
            </section>

            {/* RIGHT COLUMN: OPERATIONAL GRID */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-black" />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                    Operational Grid
                  </h2>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase">
                  {cabins.length} Active Items
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-300 gap-4">
                  <Loader2 className="animate-spin" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Syncing Data...
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {cabins.map((cabin) => (
                    <div
                      key={cabin.id}
                      className="bg-white border-2 border-black p-5 flex items-center justify-between group hover:border-[#8b0000] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 overflow-hidden hidden sm:block">
                          {cabin.image ? (
                            <img
                              src={cabin.image}
                              className="w-full h-full object-cover grayscale"
                            />
                          ) : (
                            <ImageIcon className="w-full h-full p-3 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black uppercase text-sm leading-none mb-1">
                            {cabin.name}
                          </h3>
                          <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                            <span className="flex items-center gap-1 text-black">
                              <PoundSterling size={10} /> {cabin.price}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={10} /> {cabin.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleEdit(cabin)}
                          size="icon"
                          variant="ghost"
                          className="hover:bg-black hover:text-white rounded-none"
                        >
                          <Edit3 size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(cabin.id)}
                          size="icon"
                          variant="ghost"
                          className="hover:bg-[#8b0000] hover:text-white rounded-none"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

// SidebarContent and StatCard components stay the same as previous implementations...
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
        <Link href="/">
        The Model <br /> Cabin Admin
        </Link>
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

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border-2 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black tracking-tighter">{value}</p>
    </div>
  );
}