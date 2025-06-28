
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, Github } from 'lucide-react';

const About = () => {
  const handlePortfolioRedirect = () => {
    // This would redirect to Mahedi's portfolio
    window.open('https://mahedi-portfolio.com', '_blank');
  };

  return (
    <section className="py-20 bg-white">
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
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                MN
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mahedi Hasan Nabil</h3>
              <p className="text-blue-600 font-semibold mb-4">Co-Founder & CEO</p>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Passionate about creating innovative educational solutions that make learning accessible to everyone. 
              With extensive experience in edtech and a vision for the future of online education.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handlePortfolioRedirect}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Portfolio
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Adnan Shihab */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                AS
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Adnan Shihab</h3>
              <p className="text-orange-600 font-semibold mb-4">Co-Founder & CTO</p>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Technology enthusiast with a deep understanding of scalable educational platforms. 
              Dedicated to building robust, user-friendly systems that enhance the learning experience.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
