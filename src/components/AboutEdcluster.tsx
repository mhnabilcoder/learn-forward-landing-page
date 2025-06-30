
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Users, Target, Award, Heart, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AboutEdcluster = () => {
  const [aboutTiles, setAboutTiles] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const [tilesResult, featuresResult] = await Promise.all([
        supabase.from('about_tiles').select('*').order('order_index'),
        supabase.from('features').select('*').order('order_index')
      ]);
      
      if (tilesResult.error) throw tilesResult.error;
      if (featuresResult.error) throw featuresResult.error;
      
      setAboutTiles(tilesResult.data || []);
      setFeatures(featuresResult.data || []);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const getIconComponent = (iconName) => {
    const icons = { Users, Target, Award, Heart, BookOpen };
    return icons[iconName] || Users;
  };

  const getColorClasses = (colorScheme) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100 text-blue-600',
      purple: 'from-purple-50 to-purple-100 text-purple-600',
      green: 'from-green-50 to-green-100 text-green-600',
      red: 'from-red-50 to-red-100 text-red-600',
      indigo: 'from-indigo-50 to-indigo-100 text-indigo-600'
    };
    return colors[colorScheme] || colors.blue;
  };

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
          {/* Left side - Dynamic tiles */}
          <div className="space-y-4">
            {aboutTiles.map((tile, index) => {
              const IconComponent = getIconComponent(tile.icon_name);
              const colorClasses = getColorClasses(tile.color_scheme);
              
              return (
                <div key={index} className={`bg-gradient-to-r ${colorClasses} rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300`}>
                  <div className={`w-12 h-12 bg-gradient-to-br from-${tile.color_scheme}-500 to-${tile.color_scheme}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{tile.title}</h4>
                    <p className="text-gray-600 text-sm">{tile.description}</p>
                  </div>
                </div>
              );
            })}
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

        {/* Dynamic Features Section */}
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
            {features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon_name);
              const colorClasses = getColorClasses(feature.color_scheme);
              
              return (
                <div key={index} className={`bg-gradient-to-br ${colorClasses} rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300`}>
                  <IconComponent className={`h-16 w-16 ${feature.color_scheme === 'blue' ? 'text-blue-600' : feature.color_scheme === 'purple' ? 'text-purple-600' : feature.color_scheme === 'green' ? 'text-green-600' : 'text-blue-600'} mx-auto mb-6`} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
