import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import PromosSection from './components/PromosSection';
import IndustrySection from './components/IndustrySection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <PromosSection />
        <IndustrySection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
