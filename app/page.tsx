import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServiceSection from '@/components/sections/ServiceSection';
import GiphyPortfolioSection from '@/components/sections/GiphyPortfolioSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AIResourceSection from '@/components/sections/AIResourceSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceSection />
        <GiphyPortfolioSection />
        <PortfolioSection />
        <AIResourceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
