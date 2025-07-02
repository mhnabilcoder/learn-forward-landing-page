import React from 'react';
import { Award, Briefcase, GraduationCap, User } from 'lucide-react';

const advisors = [
  {
    id: 1,
    name: "Mujibur Rahman",
    credentials: "ACCA Member & CEO of MR-Accountants",
    expertise: "Financial Systems & Strategic Planning",
    description:
      "Has advised and supported multiple international EdTech startups, including CodeNinja, TutorChase, and Lumiere Education, serving as a Fractional CFO. As an advisor, he helps us build strong financial systems, establish transparent reporting practices, and craft smarter, long-term financial strategies. His guidance ensures we stay investor-ready, cost-efficient, and financially aligned with our growth goals.",
    image_url: "https://learnmore.edcluster.com/lovable-uploads/8b1a45e2-9d85-4b67-9eb6-59b0a2909411.png",
    has_image: true,
    color_scheme: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    name: "Md Mazidul Haque Farabi",
    credentials: "IBA DU Graduate & Edtech Veteran",
    expertise: "Business Strategy & Growth",
    description:
      "Previously worked in a leading edtech platform, helps us plan business strategic decisions and growth acceleration with precise timing and market insights.",
    image_url: "https://edcluster12.b-cdn.net/demo/513022902_1489033512086075_3768161686855583586_n.jpg",
    has_image: true,
    color_scheme: "from-purple-500 to-pink-500"
  }
];

const AdvisingBody = () => {
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
          {advisors.map((advisor) => (
            <div
              key={advisor.id}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
            >
              <div className="text-center mb-6">
                {advisor.has_image && advisor.image_url ? (
                  <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full shadow-lg">
                    <img
                      src={advisor.image_url}
                      alt={advisor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextSibling = target.nextSibling as HTMLElement;
                        if (nextSibling) nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${advisor.color_scheme} rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg`}
                      style={{ display: 'none' }}
                    >
                      <User className="h-12 w-12" />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${advisor.color_scheme} rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg`}
                  >
                    <User className="h-12 w-12" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-lg">{advisor.credentials}</p>
                <div className="flex items-center justify-center gap-2 text-purple-600 mb-4">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">{advisor.expertise}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-center mb-6 text-base">
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

