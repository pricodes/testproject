import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-stone-200 selection:text-stone-900">
      <Navbar />
      <Hero />
      <Gallery />
      <LeadForm />
      <Footer />
    </main>
  );
}
