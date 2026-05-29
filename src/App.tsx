import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages (to be created)
import Home from './pages/Home';
import About from './pages/About';
import ServiceCategory from './pages/ServiceCategory';
import ServiceDetails from './pages/ServiceDetails';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ApplyService from './pages/ApplyService';
import WebServices from './pages/WebServices';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import WelcomeToast from './components/WelcomeToast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/:category" element={<ServiceCategory />} />
            <Route path="/services/:category/:serviceSlug" element={<ServiceDetails />} />
            <Route path="/apply/:category/:serviceSlug" element={<ApplyService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/web-services" element={<WebServices />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <WelcomeToast />
      </div>
    </Router>
  );
}

export default App;
