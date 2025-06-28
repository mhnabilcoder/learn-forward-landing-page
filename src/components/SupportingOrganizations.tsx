
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const SupportingOrganizations = () => {
  const supporters = [
    { name: "University Tech Club", logo: "UTC" },
    { name: "Daily Education News", logo: "DEN" },
    { name: "Innovation Hub BD", logo: "IHB" },
    { name: "Student Press Association", logo: "SPA" },
    { name: "Tech Times Bangladesh", logo: "TTB" },
    { name: "Education Today", logo: "ET" },
    { name: "Digital Learning Forum", logo: "DLF" },
    { name: "Future Leaders Club", logo: "FLC" },
    { name: "Academic Excellence Society", logo: "AES" },
    { name: "Knowledge Network BD", logo: "KNB" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Organizations <span className="text-blue-600">Supporting Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognized and supported by leading educational institutions and media outlets
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-6 p-4">
            {supporters.map((supporter, index) => (
              <div 
                key={index}
                className="flex-none w-64 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-sm">
                    {supporter.logo}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{supporter.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default SupportingOrganizations;
