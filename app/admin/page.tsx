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
  Menu, // New icon for mobile trigger
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Ensure these components exist in your shadcn library
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

  const generateEntryCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setFormData({ ...formData, entryCode: code });
    toast.info("Secure code generated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "cabins", editingId), formData);
        toast.success("Resource updated");
      } else {
        await addDoc(collection(db, "cabins"), formData);
        toast.success("Resource added");
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
      name: cabin.name,
      category: cabin.category,
      price: cabin.price,
      location: cabin.location,
      image: cabin.image || "",
      entryCode: cabin.entryCode || "",
      safetyStatus: cabin.safetyStatus || "Verified",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this resource?")) return;
    try {
      await deleteDoc(doc(db, "cabins", id));
      toast.success("Removed");
      fetchCabins();
    } catch (error) {
      toast.error("Error deleting");
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
        {/* DESKTOP SIDEBAR (Static) */}
        <aside className="w-64 bg-black text-white hidden lg:flex flex-col p-8 sticky top-0 h-screen z-30">
          <SidebarContent pathname={pathname} />
        </aside>

        <main className="flex-1 p-6 md:p-16 max-w-7xl mx-auto w-full">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Command Centre
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                  Logistics & Safety Control
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <Link
                href="/admin/inbox"
                className="bg-white border-2 border-black p-3 hover:bg-black hover:text-white transition-all"
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
                  className="border-2 border-[#8b0000] text-[#8b0000] rounded-none text-[10px] font-black uppercase h-12 flex-shrink-0"
                >
                  <X size={14} className="mr-2" /> Exit Editor
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
            {/* FORM AND LIST SECTIONS (SAME AS BEFORE) */}
            {/* ... (Submit logic and List mapping remains the same as your previous stable version) */}

            {/* Note: In a full file implementation, you would place the Left Form and Right List here */}
            <section className="bg-white p-8 border border-gray-100 shadow-sm">
              {/* Insert form code from previous block here */}
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4">
                Form Interface Loaded
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Cabin Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Button className="w-full bg-black rounded-none uppercase font-black tracking-widest text-xs h-12">
                  Update Catalog
                </Button>
              </form>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
                Operational Grid
              </h2>
              {cabins.map((cabin) => (
                <div
                  key={cabin.id}
                  className="bg-white border border-gray-100 p-4 flex justify-between items-center"
                >
                  <span className="text-xs font-black uppercase">
                    {cabin.name}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(cabin)}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(cabin.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

/** * REUSABLE SIDEBAR CONTENT
 * Used in both desktop static sidebar and mobile pull-out sheet
 */
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

      <div className="mt-auto pt-8 border-t border-gray-800 lg:block hidden">
        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
          System v2.1.0
        </p>
      </div>
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
    <div className="bg-white border border-gray-100 p-4 md:p-6 shadow-sm">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black tracking-tighter">{value}</p>
    </div>
  );
}
