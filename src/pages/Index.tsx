import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import MarqueeSection from "@/components/MarqueeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {

  const location = useLocation();

  useEffect(() => {

    if (location.hash) {

      const element = document.querySelector(location.hash);

      if (element) {

        setTimeout(() => {

          element.scrollIntoView({
            behavior: "smooth"
          });

        }, 100);

      }

    }

  }, [location]);

  return (

    <div className="min-h-screen bg-background overflow-x-hidden">

      <Navbar />

      <main>

        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <WhyUsSection />
        <MarqueeSection />
        <ContactSection />

      </main>

      <Footer />

    </div>

  );

};

export default Index;