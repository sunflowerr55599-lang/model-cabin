"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    id: "stay",
    title: "The Stay",
    questions: [
      {
        q: "What is included in the 'Daytime Session'?",
        a: "Our daytime sessions (Mon-Thu, 1pm-4pm) provide full, private access to the cabin facilities including the sauna and hot tubs where applicable. It’s designed for those seeking a brief, intimate escape.",
      },
      {
        q: "Are the cabins pet-friendly?",
        a: "To maintain the high standard of our equipment and fabrics for all guests, we currently maintain a no-pet policy across all venues.",
      },
    ],
  },
  {
    id: "wellness",
    title: "Masseuse & Wellness",
    questions: [
      {
        q: "How do I book a masseuse for my stay?",
        a: "Masseuse services are an 'Add-on'. Once you select your dates and cabin, you will be prompted to add wellness services. You can also book these via your Account Dashboard up to 48 hours before arrival.",
      },
      {
        q: "Are the massage therapists qualified?",
        a: "Yes, we work exclusively with certified professional therapists who are experienced in providing discreet, high-end in-cabin treatments.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Location",
    questions: [
      {
        q: "Will I see anyone else during my stay?",
        a: "Total privacy is our hallmark. Check-in is self-service via secure lockboxes, and cabins are spaced to ensure you do not see other guests or staff unless a service (like a massage) has been requested.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
          How can we <br /> help you?
        </h1>
        <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold">
          Detailed Information & Guest Guidelines
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-1/4 space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b0000] mb-6">
              Categories
            </h3>
            <nav className="flex flex-col gap-4 border-l border-gray-100">
              {FAQ_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="pl-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:border-l-2 hover:border-black transition-all"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* FAQ Content */}
          <div className="w-full md:w-3/4 space-y-20">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <h2 className="text-2xl font-black uppercase tracking-tight border-b border-gray-900 pb-4 mb-8">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.id}-${i}`}
                      className="border-b border-gray-100 py-2"
                    >
                      <AccordionTrigger className="text-left font-bold uppercase tracking-widest text-[13px] hover:no-underline py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 font-light leading-relaxed text-base pb-8">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Contact Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<MessageSquare className="text-[#8b0000]" />}
            title="Live Chat"
            detail="Available 9am - 6pm"
          />
          <ContactCard
            icon={<Phone className="text-[#8b0000]" />}
            title="Concierge"
            detail="+44 (0) 123 456 789"
          />
          <ContactCard
            icon={<Mail className="text-[#8b0000]" />}
            title="Email"
            detail="bookings@themodelcabin.uk"
          />
        </div>
      </section>

      {/* Footer code... */}
    </main>
  );
}

function ContactCard({ icon, title, detail }: any) {
  return (
    <div className="bg-white p-8 border border-gray-200 text-center space-y-3">
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-black uppercase tracking-widest text-xs">{title}</h4>
      <p className="text-gray-500 text-sm font-light">{detail}</p>
    </div>
  );
}
