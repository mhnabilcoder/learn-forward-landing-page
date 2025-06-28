
import React from 'react';
import { BookOpen, Users, Award, Target } from 'lucide-react';

const AboutEdcluster = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with peers and build lasting professional relationships"
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Earn recognized certifications to advance your career"
    },
    {
      icon: Target,
      title: "Personalized Path",
      description: "Customized learning journeys tailored to your goals"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Edcluster</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Edcluster is revolutionizing education by making quality learning accessible to everyone. 
            Our platform combines cutting-edge technology with expert instruction to deliver 
            transformative educational experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering Learners Worldwide
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Edcluster, we believe education should be flexible, engaging, and results-driven. 
              Our comprehensive platform offers courses across various disciplines, designed by 
              industry experts and delivered through innovative learning methodologies.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're a student looking to enhance your skills, a professional seeking 
              career advancement, or an organization aiming to upskill your workforce, 
              Edcluster provides the tools and resources you need to succeed.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-700">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-700">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-700">Course Offerings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-700">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
