
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Users, Target, Award, Heart, BookOpen } from 'lucide-react';

const AboutEdcluster = () => {
  const handleVisitPlatform = () => {
    console.log('Redirecting to main platform...');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Edcluster</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforming education through technology and making quality learning accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left side - Tile layout */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Community Driven</h4>
                <p className="text-gray-600 text-sm">Connect with learners and industry professionals</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Goal Oriented</h4>
                <p className="text-gray-600 text-sm">Clear learning objectives with practical outcomes</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Excellence First</h4>
                <p className="text-gray-600 text-sm">Highest standards in content quality and expertise</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Student Focused</h4>
                <p className="text-gray-600 text-sm">Putting student success at the center of everything we do</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Innovation Driven</h4>
                <p className="text-gray-600 text-sm">Constantly evolving with the latest educational technologies</p>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Edcluster, we're on a mission to bridge the gap between education and career success. We believe that quality education should be accessible to everyone, regardless of their background or location.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a unified educational ecosystem that empowers Bangladesh's Gen Z with world-class learning opportunities, fostering innovation and preparing the next generation for a technology-driven future.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">What Sets Us Apart</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Industry-leading experts as instructors</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Hands-on projects and real-world applications</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Personalized learning paths tailored to your goals</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Community support and networking opportunities</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleVisitPlatform}
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Visit The Platform
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful features that make learning effective and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Feature 1</h3>
              <p className="text-gray-700 leading-relaxed">
                Advanced learning management system with personalized dashboards and progress tracking for optimal learning outcomes.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <Target className="h-16 w-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Feature 2</h3>
              <p className="text-gray-700 leading-relaxed">
                Interactive learning modules with real-time feedback and adaptive content delivery for enhanced engagement.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Feature 3</h3>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive certification system with industry-recognized credentials and career advancement opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
