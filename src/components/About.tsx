
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const About = () => {
  const handlePortfolioRedirect = () => {
    // This would redirect to Mahedi's portfolio
    window.open('https://mahedi-portfolio.com', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-blue-600">Founders</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visionary leaders dedicated to revolutionizing education through technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Mahedi Hasan Nabil */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                MN
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mahedi Hasan Nabil</h3>
              <p className="text-blue-600 font-semibold mb-4">Co-Founder & COO</p>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              As a strategist at heart, I align internal operations with long-term business growth, giving ideas a clear structure, commercial direction, and the ability to scale. My focus is on building systems that make innovation sustainable.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handlePortfolioRedirect}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Portfolio
              </Button>
            </div>
          </div>

          {/* Adnan Shihab */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                AS
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Adnan Shihab</h3>
              <p className="text-blue-600 font-semibold mb-4">Co-Founder & CEO</p>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Passionate about building innovative educational solutions that not only make learning accessible to all, but also deliver a seamless user experience, with a vision to unify the fragmented education market under one powerful, integrated platform.
            </p>
            
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
