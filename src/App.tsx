import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PetMural from '@/components/PetMural';
import PixSection from '@/components/PixSection';
import DonationSection from '@/components/DonationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PetMural />
      <PixSection />
      <DonationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
