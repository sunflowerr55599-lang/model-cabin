"use client";

import * as React from "react";
import Link from "next/link";
import { HiBars2 } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2"; // Import Profile Icon
import { useAuth } from "@/context/AuthContext"; // Import your Auth Hook
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const cabins: { title: string; href: string; description: string }[] = [
  {
    title: "The Hidden Cabin",
    href: "/cabins/hidden",
    description: "Our flagship overnight stay deep in the woods.",
  },
  {
    title: "The Original Cabin",
    href: "/cabins/original",
    description: "The one that started it all. Rustic and steamy.",
  },
  {
    title: "The Boutique Cabin",
    href: "/cabins/boutique",
    description: "Modern luxury with high-end wellness features.",
  },
];

export default function Navbar() {
  const { user } = useAuth(); // Capture the persisted user state
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // Refresh to clear state
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-50 border-b border-gray-100 font-montserrat">
      {/* Logo */}
      <Link href="/">
        <div className="border-[3px] border-black p-1 px-3 font-black text-lg uppercase leading-none tracking-tighter">
          The Model <br /> Cabin UK
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-2 uppercase text-[12px] tracking-widest font-poppins">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 uppercase tracking-widest text-gray-500">
                Our Cabins
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full flex-col justify-end rounded-md bg-black p-6 no-underline outline-none select-none hover:bg-gray-900 transition-colors"
                        href="/our-cabins"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          Featured: <br /> The Hidden Cabin
                        </div>
                        <p className="text-sm leading-tight text-gray-400">
                          Voted UK&apos;s best minimalist escape 2024.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {cabins.map((cabin) => (
                    <ListItem
                      key={cabin.title}
                      title={cabin.title}
                      href={cabin.href}
                    >
                      {cabin.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/reservations"
                  className="text-gray-500 uppercase tracking-widest"
                >
                  Reservations
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/faqs"
                  className="text-gray-500 uppercase tracking-widest"
                >
                  FAQs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>

        {/* --- DYNAMIC AUTH BUTTON --- */}
        <div className="ml-6 relative">
          {user ? (
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none">
                  Logged in as
                </p>
                <p className="text-[12px] font-black uppercase tracking-widest">
                  {user.displayName || user.email?.split("@")[0] || "Guest"}
                </p>
              </div>
              {/* <HiOutlineUserCircle
                size={32}
                className="text-black group-hover:text-[#8b0000] transition-colors"
              /> */}

              {/* Simple Sign Out Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border-2 border-black shadow-xl z-50">
                  <Link
                    href="/account"
                    className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 border-b border-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8b0000] hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/account"
              className="uppercase text-[11px] tracking-widest bg-black text-white px-6 py-2.5 hover:bg-gray-800 transition font-bold"
            >
              Account Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger>
            <HiBars2 className="text-4xl" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col items-center pt-16 gap-y-6 font-bold uppercase tracking-widest text-sm">
              <Link href="/">Home</Link>
              <Link href="/our-cabins">Our Cabins</Link>
              <Link href="/reservations">Reservations</Link>
              <Link href="/faqs">FAQs</Link>
              <hr className="w-full border-gray-100" />
              {user ? (
                <button onClick={handleLogout} className="text-[#8b0000]">
                  Sign Out
                </button>
              ) : (
                <Link href="/account">Login</Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground focus:bg-gray-100 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none uppercase tracking-tight">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
