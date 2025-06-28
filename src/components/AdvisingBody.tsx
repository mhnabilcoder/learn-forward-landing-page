
import React from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const AdvisingBody = () => {
  const advisors = [
    {
      name: "Mujibur Rahman",
      credentials: "ACCA Member & CEO of MR-Accountants",
      expertise: "Financial Systems & Strategic Planning",
      description: "Multiple edtech startups Chief Accountant, helps us with financial systems implementation, transparent financials preparation, and better financial planning.",
      icon: "MR",
      bgColor: "from-green-500 to-emerald-600"
    },
    {
      name: "Md. Farabi",
      credentials: "IBA DU Graduate & Edtech Veteran",
      expertise: "Business Strategy & Operations",
      description: "Previously worked in a leading edtech platform, helps us plan business strategic decisions and operational excellence.",
      icon: "MF",
      bgColor: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Advisory Board</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Industry experts guiding our vision and strategic direction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center mb-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${advisor.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                  {advisor.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{advisor.name}</h3>
                <p className="text-yellow-400 font-semibold mb-2">{advisor.credentials}</p>
                <div className="flex items-center justify-center gap-2 text-blue-300 mb-4">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">{advisor.expertise}</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-center">
                {advisor.description}
              </p>
              
              <div className="mt-6 flex justify-center gap-4">
                <div className="flex items-center gap-2 text-green-400">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm">Strategic Advisor</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm">Industry Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisingBody;
