import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PetMural from '@/components/PetMural';
import HappyEndings from '@/components/HappyEndings';
import DonationSection from '@/components/DonationSection';
import ContactSection from '@/components/ContactSection';
import PartnerBanner from '@/components/PartnerBanner';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PetMural />
      <HappyEndings />
      <DonationSection />
      <PartnerBanner />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
