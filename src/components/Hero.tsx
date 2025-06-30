
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Transform Your',
    subtitle: 'Learning Journey',
    description: "Bangladesh's Gen Z Deserves Better — An Upcoming EdTech Revolution",
    primary_button_text: 'Visit The Platform',
    secondary_button_text: 'Watch Intro',
    stat1_number: '50K+',
    stat1_label: 'Active Learners',
    stat2_number: '1000+',
    stat2_label: 'Expert Courses',
    stat3_number: '95%',
    stat3_label: 'Success Rate'
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) setHeroContent(data);
    } catch (error) {
      console.error('Error fetching hero content:', error);
    }
  };

  const handleVisitPlatform = () => {
    console.log('Redirecting to platform...');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900"></div>
      
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-indigo-600/30 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {heroContent.title}
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              {heroContent.subtitle}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-300">
          <Button 
            onClick={handleVisitPlatform}
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            {heroContent.primary_button_text}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10"
          >
            <Play className="mr-2 h-5 w-5" />
            {heroContent.secondary_button_text}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in delay-500">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Users className="h-12 w-12 text-blue-300 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{heroContent.stat1_number}</div>
            <div className="text-blue-100">{heroContent.stat1_label}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{heroContent.stat2_number}</div>
            <div className="text-blue-100">{heroContent.stat2_label}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{heroContent.stat3_number}</div>
            <div className="text-blue-100">{heroContent.stat3_label}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
