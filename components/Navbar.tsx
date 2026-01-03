"use client";

import * as React from "react";
import Link from "next/link";
import { HiBars2 } from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import {
  ShoppingBag,
  CreditCard,
  Users,
  HelpCircle,
  Map,
  ArrowRight,
} from "lucide-react";
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

const exploreLinks = [
  {
    title: "Rates & Bookings",
    href: "/rates&bookings",
    description: "Check seasonal pricing and stay dates.",
    icon: <CreditCard size={16} />,
  },
  {
    title: "Equipment Store",
    href: "/store",
    description: "Purchase our signature cabin-grade gear.",
    icon: <ShoppingBag size={16} />,
  },
  {
    title: "Membership",
    href: "/membership",
    description: "Priority access and exclusive member rates.",
    icon: <Users size={16} />,
  },
  {
    title: "Concierge Support",
    href: "/support",
    description: "Direct assistance for your upcoming stay.",
    icon: <HelpCircle size={16} />,
  },
];

export default function Navbar() {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-50 border-b border-gray-100 font-montserrat">
      {/* Logo */}
      <Link href="/">
        <div className="border-[3px] border-black p-1 px-3 font-black text-lg uppercase leading-none tracking-tighter hover:bg-black hover:text-white transition-all cursor-pointer">
          The Model <br /> Cabin UK
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-1 uppercase text-[11px] tracking-widest font-bold">
            {/* Cabins Section */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 uppercase tracking-widest text-gray-500 font-bold">
                Our Cabins
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full flex-col justify-end rounded-md bg-black p-6 no-underline hover:bg-gray-900 transition-colors group"
                        href="/our-cabins"
                      >
                        <Map
                          className="text-white mb-4 opacity-50 group-hover:opacity-100 transition-opacity"
                          size={24}
                        />
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          The Collection
                        </div>
                        <p className="text-xs text-gray-400 font-normal normal-case italic">
                          Explore our award-winning minimalist retreats across
                          the UK.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem title="The Hidden" href="/cabins/hidden" />
                  <ListItem title="The Original" href="/cabins/original" />
                  <ListItem title="The Boutique" href="/cabins/boutique" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/reservations" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-gray-500 font-bold uppercase tracking-widest"
                  )}
                >
                  Gallery
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Explore & Store (Clean Version) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 uppercase tracking-widest text-gray-500 font-bold">
                Explore & Store
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[450px] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {exploreLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                      >
                        <div className="mt-1 text-black group-hover:text-[#8b0000] transition-colors">
                          {link.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 flex items-center gap-2">
                            {link.title}
                            <ArrowRight
                              size={10}
                              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </div>
                          <div className="text-[9px] text-gray-400 font-medium normal-case leading-tight">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/faqs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-gray-500 font-bold uppercase tracking-widest"
                  )}
                >
                  FAQs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>

        {/* Auth Section */}
        <div className="ml-6 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                  {user.displayName || user.email?.split("@")[0] || "Member"}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 border-b border-gray-100"
                    onClick={() => setDropdownOpen(false)}
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
              className="uppercase text-[11px] tracking-widest bg-black text-white px-6 py-2.5 hover:bg-[#8b0000] transition font-black"
            >
              Login
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
          <SheetContent side="right">
            <div className="flex flex-col items-center pt-16 gap-y-6 font-black uppercase tracking-widest text-sm text-center">
              <Link href="/our-cabins">Our Cabins</Link>
              <Link href="/rates&bookings">Rates & Bookings</Link>
              <Link href="/store">Equipment Store</Link>
              <Link href="/membership">Membership</Link>
              <Link href="/faqs">FAQs</Link>
              <Link href="/support">Support</Link>
              <hr className="w-full border-gray-100" />
              {user ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <button onClick={handleLogout} className="text-[#8b0000]">
                    Sign Out
                  </button>
                </>
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
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100",
          className
        )}
        {...props}
      >
        <div className="text-[11px] font-black uppercase tracking-widest">
          {title}
        </div>
        {children && (
          <p className="line-clamp-2 text-xs leading-snug text-gray-500 font-normal">
            {children}
          </p>
        )}
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
