"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import SignalAcquisition from "@/components/scenes/SignalAcquisition";
import { ScrollTrigger } from "@/lib/animations/gsap";

// Lazy-load all heavy scenes so they are not mounted (and GSAP doesn't run)
// until the intro is completely done and the DOM is fully laid out.
const HeroScene = dynamic(() => import("@/components/scenes/HeroScene"), { ssr: false });
const DisconnectedOrganisation = dynamic(() => import("@/components/scenes/DisconnectedOrganisation"), { ssr: false });
const NervousSystemScene = dynamic(() => import("@/components/scenes/NervousSystemScene"), { ssr: false });
const TwoEnginesScene = dynamic(() => import("@/components/scenes/TwoEnginesScene"), { ssr: false });
const ConversationScene = dynamic(() => import("@/components/scenes/ConversationScene"), { ssr: false });
const FrameworkGraphScene = dynamic(() => import("@/components/scenes/FrameworkGraphScene"), { ssr: false });
const PlatformModulesScene = dynamic(() => import("@/components/scenes/PlatformModulesScene"), { ssr: false });
const RegulatoryClockScene = dynamic(() => import("@/components/scenes/RegulatoryClockScene"), { ssr: false });
const ServicePillarsScene = dynamic(() => import("@/components/scenes/ServicePillarsScene"), { ssr: false });
const TechnicalSecurityScene = dynamic(() => import("@/components/scenes/TechnicalSecurityScene"), { ssr: false });
const MarketsScene = dynamic(() => import("@/components/scenes/MarketsScene"), { ssr: false });
const PricingScene = dynamic(() => import("@/components/scenes/PricingScene"), { ssr: false });
const ServiceSelectorScene = dynamic(() => import("@/components/scenes/ServiceSelectorScene"), { ssr: false });
const WhySecurithumScene = dynamic(() => import("@/components/scenes/WhySecurithumScene"), { ssr: false });
const FinalRhythmScene = dynamic(() => import("@/components/scenes/FinalRhythmScene"), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [scenesReady, setScenesReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    // Unlock scroll
    document.body.style.overflow = "";
    // Wait a frame for React to mount scenes, then refresh ScrollTrigger
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setScenesReady(true);
      });
    });
  }, []);

  useEffect(() => {
    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="flex flex-col w-full bg-background relative font-sans text-foreground">

      {!introComplete && (
        <SignalAcquisition onComplete={handleIntroComplete} />
      )}

      {/* Only mount scenes after intro is done — prevents GSAP from pinning zero-height elements */}
      {introComplete && (
        <div className={`transition-opacity duration-500 ${scenesReady ? "opacity-100" : "opacity-0"}`}>
          <HeroScene />
          <DisconnectedOrganisation />
          <NervousSystemScene />
          <TwoEnginesScene />
          <ConversationScene />
          <FrameworkGraphScene />
          <PlatformModulesScene />
          <RegulatoryClockScene />
          <ServicePillarsScene />
          <TechnicalSecurityScene />
          <MarketsScene />
          <PricingScene />
          <ServiceSelectorScene />
          <WhySecurithumScene />
          <FinalRhythmScene />
        </div>
      )}

    </main>
  );
}
