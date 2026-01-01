"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQ_CATEGORIES = [
  {
    id: "privacy",
    title: "Privacy & Location",
    questions: [
      {
        q: "Where are you located?",
        a: "We are nestled in well-appointed areas around the UK, with over 23 established cabin complexes to cater to our ever-growing customer base. Kindly confirm your location on the “Booking” page in order to know our closest cabin to you. Ps. This is in line with our updated customer’s privacy and discretion policy.",
      },
      {
        q: "How do I access the cabin?",
        a: "After your reservation is confirmed and your membership tag verified, you will get a confirmation mail containing details of your reservation and an exact map direction down to your designated cabin. You are expected to present your “Booking code” for checking-in. Ps. This is in line with our updated customer’s privacy and discretion policy.",
      },
      {
        q: "Will I see anyone else during my stay?",
        a: "Total privacy is our hallmark. Check-in is self-service via secure lockboxes, and cabins are spaced to ensure you do not see other guests or staff unless a service (like a massage) has been requested.",
      },
    ],
  },
  {
    id: "booking",
    title: "Rates & Reservations",
    questions: [
      {
        q: "How do I book a cabin?",
        a: "Kindly see “rates and bookings” to confirm your ideal plan and date. You will get a reply containing your date confirmation and reservation invoice to process your booking payment.",
      },
      {
        q: "What does my booking and membership fee cover?",
        a: "Your booking fee covers rental of the cabin for the period of time you paid for with special cabin services included like a fully furnished kitchen. Your membership tag fee covers check-ins, special access to the smoking room, self-service bar, primary sex toys and protection. Ps. This is valid for a period of 10 months.",
      },
      {
        q: "Can I cancel my booking?",
        a: "Cancellations should be made within 1 week of your reserved date and your deposit will be refunded back to you. Cancellations made within 4 days of your reserved date will attract an admin fee of 20%. Please contact support for more details.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "Many guests book weeks or months in advance. That is not always necessary; kindly confirm your ideal date is free and available. Be aware that the cabin on special holidays and occasions such as Valentine’s Day and Christmas tends to be more in demand and early bookings are advised.",
      },
      {
        q: "Do I have to pay a security deposit?",
        a: "We only require a security deposit if you are 3 or more guests. Please “contact us” to reserve for 3 or more guests (separate rules apply for overnight hire).",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Methods",
    questions: [
      {
        q: "How can I pay?",
        a: "We accept bank transfer, PayPal, payment vouchers, and cryptocurrencies.",
      },
      {
        q: "Can I pay cash?",
        a: "We do not accept cash on arrival as we currently offer pre-reserved bookings only.",
      },
    ],
  },
  {
    id: "house-rules",
    title: "House Rules & Guidelines",
    questions: [
      {
        q: "Are there any house rules?",
        a: "Yes, we expect our guests to adhere to them. It is imperative that they exercise an appropriate duty of care with all plays ranging from kinky fun to more serious BDSM. We request that you respect your partner/s and the premises. Always remember your safe words.",
      },
      {
        q: "Is there an age restriction?",
        a: "We do not host persons under the age of 18. Please ensure to bring a valid photo ID if you are fortunate enough to look between 18-25.",
      },
      {
        q: "Can I smoke inside?",
        a: "Our cabins are smoke-free, but there is a dedicated and covered area for smoking in the yard. Please keep conversations off BDSM topics as this area is shared with other residents.",
      },
      {
        q: "Who cleans up?",
        a: "Customers should ensure to leave the cabin how they find it. A designated staff will explain more and show you where the cleaning products are located. We pride ourselves on our spotlessly clean facilities so ensure to help us maintain it.",
      },
      {
        q: "Is there parking available?",
        a: "We provide off-road private parking in all of our establishments and in rare cases there are also a couple of paid-for spaces in the surroundings.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white font-montserrat">
      <Navbar />

      <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
          The Vault <br /> Knowledge Base
        </h1>
        <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold">
          Detailed Information & Guest Guidelines
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <aside className="w-full md:w-1/4 space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b0000] mb-6">
              Categories
            </h3>
            <nav className="flex flex-col gap-4 border-l border-gray-100 sticky top-32">
              {FAQ_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="pl-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="w-full md:w-3/4 space-y-20">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <h2 className="text-2xl font-black uppercase tracking-tight border-b-2 border-black pb-4 mb-8">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.id}-${i}`}
                      className="border-b border-gray-100"
                    >
                      <AccordionTrigger className="text-left font-bold uppercase tracking-widest text-[12px] hover:no-underline py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 font-medium leading-relaxed text-sm pb-8 uppercase">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <div className="pt-12 border-t border-gray-200">
              <h3 className="text-xl font-black uppercase mb-4">
                I have a different inquiry?
              </h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-6">
                Kindly contact us for a prompt response.
              </p>
              <Button className="bg-black text-white rounded-none px-8 py-6 font-black uppercase tracking-widest text-[10px]">
                Contact Concierge
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<MessageSquare className="text-[#8b0000]" />}
            title="Live Chat"
            detail="9am - 6pm GMT"
          />
          <ContactCard
            icon={<Phone className="text-[#8b0000]" />}
            title="Concierge"
            detail="+44 (0) 20 1234 5678"
          />
          <ContactCard
            icon={<Mail className="text-[#8b0000]" />}
            title="Email Support"
            detail="bookings@themodelcabin.uk"
          />
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, detail }: any) {
  return (
    <div className="bg-white p-8 border border-gray-200 text-center space-y-3">
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-black uppercase tracking-widest text-[10px]">
        {title}
      </h4>
      <p className="text-gray-500 text-xs font-bold uppercase">{detail}</p>
    </div>
  );
}
