"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Loader2, ShieldAlert } from "lucide-react";

const ADMIN_EMAIL = "clavicular@gmail.com";

export default function AdminGuard({ children }: { children: ReactNode }) {
  // TypeScript now recognizes 'loading' because we added it to the Interface above
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white font-montserrat">
        <Loader2 className="animate-spin text-black mb-4" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          Authenticating Admin...
        </p>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null; // Prevents content flash before redirect
  }

  return <>{children}</>;
}
