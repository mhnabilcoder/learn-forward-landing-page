
import React from 'react';
import { Award, Briefcase, GraduationCap, User } from 'lucide-react';

const AdvisingBody = () => {
  const advisors = [
    {
      name: "Mujibur Rahman",
      credentials: "ACCA Member & CEO of MR-Accountants",
      expertise: "Financial Systems & Strategic Planning",
      description: "Multiple edtech startups Chief Accountant, helps us with financial systems implementation, transparent financials preparation, and better financial planning.",
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      name: "Md. Farabi",
      credentials: "IBA DU Graduate & Edtech Veteran",
      expertise: "Business Strategy & Operations",
      description: "Previously worked in a leading edtech platform, helps us plan business strategic decisions and operational excellence.",
      bgColor: "from-purple-500 to-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Advisory Board</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry experts guiding our vision and strategic direction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
            >
              <div className="text-center mb-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${advisor.bgColor} rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg`}>
                  <User className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-lg">{advisor.credentials}</p>
                <div className="flex items-center justify-center gap-2 text-purple-600 mb-4">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">{advisor.expertise}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-center mb-6 text-lg">
                {advisor.description}
              </p>
              
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2 text-blue-500 bg-blue-50 px-4 py-2 rounded-full">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm font-medium">Strategic Advisor</span>
                </div>
                <div className="flex items-center gap-2 text-purple-500 bg-purple-50 px-4 py-2 rounded-full">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm font-medium">Industry Expert</span>
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
