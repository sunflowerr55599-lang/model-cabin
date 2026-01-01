"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { GiTrophyCup } from "react-icons/gi";
import {
  Search,
  Star,
  Flower2,
  Wind,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  // Integrated the full list of new FAQs
  const faqs = [
    {
      question: "Where are you located?",
      answer:
        "We are nestled in well appointed areas around the UK, with over 23 established cabin complexes to cater for our ever growing customer base. Kindly confirm your location on the “Booking” page in order to know our closest cabin to you. Ps. This is in line with our updated customer’s privacy and discretion policy.",
    },
    {
      question: "How do I access the cabin?",
      answer:
        "After your reservation is confirmed and your membership tag verified, you will get a confirmation mail containing details of your reservation and an exact map direction down to your designated cabin. You are expected to present your “Booking code” for checking-in. Ps. This is in line with our updated customer’s privacy and discretion policy.",
    },
    {
      question: "Is there parking available?",
      answer:
        "We provide off-road private parking in all of our establishments and in rare cases there are also a couple of paid for spaces in the surroundings.",
    },
    {
      question: "Is there an age restriction?",
      answer:
        "We do not host persons under the age of 18. Please ensure to bring a valid photo ID if you are fortunate enough to look between 18-25.",
    },
    {
      question: "How do I book a cabin?",
      answer:
        "Kindly see “rates and bookings” to confirm your ideal plan and date, you will get a reply containing your date confirmation and reservation invoice to process your booking payment.",
    },
    {
      question: "What does my booking and membership fee cover?",
      answer:
        "Your booking fee covers rental of the cabin for the period of time you paid for with special cabin services included like a fully furnished kitchen. Your membership tag fee covers check-ins, special access to the smoking room, self-service bar, primary sex toys and protection. Ps. This is valid for a period of 10months.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Cancellations should be made within 1week of your reserved date and your deposit will be refunded back to you, while cancellations made within 4days of your reserved date will attract an admin fee of 20%. Please contact support for more details.",
    },
    {
      question: "How far in advance do I need to book?",
      answer:
        "Many guests book weeks or months in advance. That is not always necessary, kindly confirm your ideal date is free and available. Be aware that the cabin on special holidays and occasions such as Valentine’s Day and Christmas tends to be more in demand and early bookings are advised.",
    },
    {
      question: "How can I pay?",
      answer:
        "We accept bank transfer, PayPal, payment vouchers and cryptocurrencies. We do not accept cash on arrival as we currently offer pre-reserved bookings only.",
    },
    {
      question: "Do I have to pay a security deposit?",
      answer:
        "We only require a security deposit if you are 3 or more guests. Please “contact us” to reserve for 3 or more guests (separate rules applies for overnight hire).",
    },
    {
      question: "Are there any house rules?",
      answer:
        "Yes, we expect our guests to adhere to them. It is imperative that they exercise an appropriate duty of care with all plays ranging from kinky fun to more serious BDSM, we request that you respect your partner/s and the premises. Always remember your safe words.",
    },
    {
      question: "Can I smoke inside?",
      answer:
        "Our cabins are smoke free, but there is a dedicated and covered area for smoking in the yard. Please keep conversations off BDSM topics as this is shared with other residents.",
    },
    {
      question: "Who cleans up?",
      answer:
        "Customers should ensure to leave the cabin how they find it. A designated staff will explain more and show you where the cleaning products are located, we pride ourselves with our spotlessly clean facilities so ensure to help us maintain it.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="bg-[url('/img17.jpg')] bg-cover bg-fixed bg-center flex flex-col py-10 px-4 justify-center h-[94vh]">
        <div className="bg-white p-10 shadow-2xl max-w-md w-full rounded-sm font-montserrat mx-auto border-t-4 border-[#8b0000]">
          <h2 className="text-3xl font-black text-center text-gray-800 leading-tight mb-8 uppercase tracking-tighter">
            Book Your <br /> Private Escape
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                Select Dates
              </label>
              <DatePickerWithRange />
            </div>

            <button className="w-full bg-[#1a1a1a] text-white py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition text-xs">
              <Search size={16} />
              Check Availability
            </button>
          </div>
        </div>
      </section>

      {/* 3. Intro Text */}
      <section className="max-w-4xl mx-auto text-center py-24 px-6 font-montserrat">
        <h1 className="text-4xl font-serif text-[#8b0000] mb-8 uppercase tracking-tight leading-tight">
          Luxury Stays & <br /> Sensorial Wellness
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed font-light italic">
          Experience the ultimate UK escape. Beyond our flagship cabins, we
          offer
          <strong> professional in-cabin massage therapy</strong>, private
          saunas, and curated daytime sessions. Whether it&apos;s an overnight
          stay or a steamy afternoon retreat, your privacy is our absolute
          priority.
        </p>
      </section>

      {/* 4. Cabins Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
          The Residences
        </h2>
        <h3 className="text-center text-3xl font-serif text-[#8b0000] mb-12">
          Overnight Accommodations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CabinCard title="The Hidden Cabin" price="165.00" image="/1.jpg" />
          <CabinCard title="The Original Cabin" price="165.00" image="/2.jpg" />
          <CabinCard title="The Boutique Cabin" price="149.00" image="/3.jpg" />
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-bold text-[#8b0000] uppercase tracking-[0.4em] mb-4">
              Enhance Your Stay
            </h2>
            <h3 className="text-4xl font-serif mb-4">
              Bespoke Wellness Services
            </h3>
            <p className="text-gray-400 font-light">
              Available for both overnight and daytime guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceIconCard
              icon={<Flower2 className="text-[#8b0000]" />}
              title="Masseuse"
              desc="Deep tissue or Swedish massage in your cabin."
            />
            <ServiceIconCard
              icon={<Wind className="text-[#8b0000]" />}
              title="Private Sauna"
              desc="Pre-heated wood-fired sauna sessions."
            />
            <ServiceIconCard
              icon={<Sparkles className="text-[#8b0000]" />}
              title="Daytime Rituals"
              desc="Exclusive 1pm–4pm intimate cabin access."
            />
            <ServiceIconCard
              icon={<Star className="text-[#8b0000]" />}
              title="Luxury Kits"
              desc="Organic oils and premium wellness equipment."
            />
          </div>
        </div>
      </section>

      {/* 6. Updated FAQs Section */}
      <section className="bg-white py-24 px-6 border-t border-gray-100 font-montserrat">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-[#8b0000] text-center mb-16 uppercase tracking-tight leading-tight">
            Commonly Asked <br /> Regarding Your Stay
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200 py-2"
              >
                <AccordionTrigger className="text-left font-bold uppercase tracking-widest text-[11px] hover:text-[#8b0000] transition-colors hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed font-light text-sm pt-2 pb-4 uppercase tracking-wide">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Have a different inquiry?
            </p>
            <button className="text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#8b0000] hover:border-[#8b0000] transition-all">
              Contact Concierge Directly
            </button>
          </div>
        </div>
      </section>

      {/* 7. Award & Footer */}
      <section className="py-20 text-center bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl md:text-4xl font-extralight text-gray-400 uppercase tracking-[0.3em] px-6">
            Voted UK most pleasurable <br /> Cabin/Dungeon 2024
          </p>
          <GiTrophyCup size={40} className="text-[#DAA520] " />
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Helper Components
function ServiceIconCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 p-8 border border-white/10 text-center hover:border-[#8b0000] transition-colors group">
      <div className="mb-4 flex justify-center scale-125 group-hover:scale-150 transition-transform duration-500">
        {icon}
      </div>
      <h4 className="uppercase font-black tracking-widest text-sm mb-2">
        {title}
      </h4>
      <p className="text-gray-500 text-[12px] font-light leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function CabinCard({ title, price, image, type = "OVERNIGHT STAYS" }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 group cursor-pointer">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition duration-700 ease-in-out"
        />
      </div>
      <h3 className="uppercase text-[13px] font-black tracking-widest text-center mb-1 px-4">
        {title} — {type}
      </h3>
      <p className="text-[#8b0000] font-bold text-lg mb-4">£{price}</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="bg-[#1a1a1a] text-white px-12 py-3 font-bold uppercase text-xs tracking-[0.2em] hover:bg-black transition">
            Book now
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="rounded-none border-2 border-black font-montserrat max-w-[90vw] md:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="uppercase font-black text-2xl tracking-tighter">
              Confirm Selection
            </AlertDialogTitle>
            <div className="flex items-center gap-2 py-2 text-[#8b0000]">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Discreet Private Venue
              </span>
            </div>
            <AlertDialogDescription className="text-gray-600 text-sm leading-relaxed pt-2">
              You are requesting to book{" "}
              <span className="font-bold text-black">{title}</span>.
              <br />
              <br />
              Please note that all **wellness services and masseuse treatments**
              must be pre-arranged via your dashboard at least 48 hours prior to
              arrival.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction className="w-full bg-black text-white rounded-none uppercase font-bold tracking-widest text-xs py-6 hover:bg-gray-800 border border-black">
              Proceed to Dates
            </AlertDialogAction>
            <AlertDialogCancel className="w-full rounded-none border-black uppercase font-bold tracking-widest text-xs py-6 mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}