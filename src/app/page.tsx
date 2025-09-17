// app/page.tsx
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TheChallenge from "@/components/sections/TheChallenge";
import OurResponse from "@/components/sections/OurResponse";
import Solutions from "@/components/sections/Solutions";
import Differentials from "@/components/sections/Differentials";
import Impact from "@/components/sections/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionFade from "@/components/dividers/SectionFade";
import AngleDivider from "@/components/dividers/AngleDivider";
import WaveDivider from "@/components/dividers/WaveDivider";
import SectionGradient from "@/components/dividers/SectionGradient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DADODADO — Insights estratégicos em tempo real",
    description:
      "Central de inteligência para compreender influência, opinião, sentimento e narrativa em tempo real.",
    openGraph: {
      title: "DADODADO — Insights estratégicos em tempo real",
      description:
        "Do social listening à pesquisa online, insights claros e acionáveis para marcas, políticos e organizações.",
      type: "website",
    },
  };
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <>
        <Hero />
        <SectionFade from="#0a0f1a" to="#D9D9D9" height={5} />
        <TheChallenge />
      </>
      <OurResponse />
      <Solutions />
      <Differentials />
      <Impact />
      <CTA />
      <Footer />
    </main>
  );
}
