import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const founders = [
  {
    id: 1,
    name: "Mahedi Hasan Nabil",
    title: "Co-Founder & COO",
    avatar_text: "MN",
    description:
      "As a strategist at heart, I align internal operations with long-term business growth, giving ideas a clear structure, commercial direction, and the ability to scale. My focus is on building systems that make innovation sustainable.",
    image_url: "https://edcluster12.b-cdn.net/demo/513771098_2195229314253580_7542455361396977482_n.jpg",
    has_image: true,
    portfolio_url: "https://mhnabil.edcluster.com/"
  },
  {
    id: 2,
    name: "Adnan Shihab",
    title: "Co-Founder & CEO",
    avatar_text: "AS",
    description:
      "Passionate about building innovative educational solutions that not only make learning accessible to all, but also deliver a seamless user experience, with a vision to unify the fragmented education market under one powerful, integrated platform.",
    image_url: "https://edcluster12.b-cdn.net/demo/adnan.jpg",
    has_image: true,
    portfolio_url: "https://www.linkedin.com/in/adnan-shihab-5a1749267/"
  }
];

const About = () => {
  const handlePortfolioRedirect = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
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
          {founders.map((founder) => (
            <div key={founder.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                {founder.has_image && founder.image_url ? (
                  <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full shadow-lg">
                    <img
                      src={founder.image_url}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', founder.image_url);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold"
                      style={{ display: 'none' }}
                    >
                      {founder.avatar_text}
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                    {founder.avatar_text}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{founder.title}</p>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {founder.description}
              </p>

              <div className="flex justify-center">
                {founder.portfolio_url ? (
                  <Button
                    onClick={() => handlePortfolioRedirect(founder.portfolio_url)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Portfolio
                  </Button>
                ) : (
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
