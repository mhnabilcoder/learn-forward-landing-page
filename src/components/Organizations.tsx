
import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

const Organizations = () => {
  const organizations = [
    {
      name: "TechCorp Solutions",
      logo: "TC",
      website: "https://techcorp.com",
      testimonial: "Amazing platform that transformed our employee training programs.",
      rating: 5
    },
    {
      name: "EduInnovate",
      logo: "EI",
      website: "https://eduinnovate.com",
      testimonial: "The best investment we made for our educational initiatives.",
      rating: 5
    },
    {
      name: "Global Learning Hub",
      logo: "GLH",
      website: "https://globallearning.com",
      testimonial: "Exceptional quality and outstanding support from the team.",
      rating: 5
    },
    {
      name: "FutureTech Academy",
      logo: "FTA",
      website: "https://futuretech.com",
      testimonial: "Our students love the interactive learning experience.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-blue-600">Leading Organizations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of organizations that have chosen us to power their learning initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {organizations.map((org, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                  {org.logo}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{org.name}</h3>
                <div className="flex justify-center mb-3">
                  {[...Array(org.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 italic">"{org.testimonial}"</p>
              
              <button 
                onClick={() => window.open(org.website, '_blank')}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Visit Website
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organizations;
