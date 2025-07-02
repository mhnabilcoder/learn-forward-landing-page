
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Hero from '../components/Hero';
import AboutEdcluster from '../components/AboutEdcluster';
import AboutTiles from '../components/AboutTiles';
import Features from '../components/Features';
import About from '../components/About';
import SupportingOrganizations from '../components/SupportingOrganizations';
import Organizations from '../components/Organizations';
import Testimonials from '../components/Testimonials';
import AdvisingBody from '../components/AdvisingBody';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Admin Panel Link - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <Link to="/admin/login">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </Link>
      </div>

      <Hero />
      <AboutEdcluster />
      <AboutTiles />
      <Features />
      <About />
      <SupportingOrganizations />
      <Organizations />
      <Testimonials />
      <AdvisingBody />
      <Footer />
    </div>
  );
};

export default Index;
