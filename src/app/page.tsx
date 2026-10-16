import { BeforeAfter } from "@/components/BeforeAfter";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { MotionProvider } from "@/components/MotionProvider";
import { Process3D } from "@/components/Process3D";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only z-[60] bg-navy px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Process3D />
        <WhyUs />
        <BeforeAfter />
        <Gallery />
        <Testimonials />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
    </MotionProvider>
  );
}
