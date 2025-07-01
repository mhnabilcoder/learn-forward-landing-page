
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, TrendingUp, Users, Award, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    brand_name: 'EdCluster',
    title: 'Transform Your',
    subtitle: 'Learning Journey',
    description: "Bangladesh's Gen Z Deserves Better. We're Building Tomorrow's Learning Platform Today.",
    primary_button_text: 'Visit The Platform',
    primary_button_url: 'https://platform.edcluster.com',
    secondary_button_text: 'Watch Intro',
    secondary_button_url: '#',
    stat1_number: '50K+',
    stat1_label: 'Active Learners',
    stat2_number: '1000+',
    stat2_label: 'Expert Courses',
    stat3_number: '95%',
    stat3_label: 'Success Rate'
  });

  const [generalSettings, setGeneralSettings] = useState({
    scroll_text: 'Scroll down to explore'
  });

  useEffect(() => {
    fetchHeroContent();
    fetchGeneralSettings();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setHeroContent({
          brand_name: data.brand_name || 'EdCluster',
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          primary_button_text: data.primary_button_text,
          primary_button_url: data.primary_button_url || 'https://platform.edcluster.com',
          secondary_button_text: data.secondary_button_text,
          secondary_button_url: data.secondary_button_url || '#',
          stat1_number: data.stat1_number,
          stat1_label: data.stat1_label,
          stat2_number: data.stat2_number,
          stat2_label: data.stat2_label,
          stat3_number: data.stat3_number,
          stat3_label: data.stat3_label
        });
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    }
  };

  const fetchGeneralSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('general_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setGeneralSettings({
          scroll_text: data.scroll_text || 'Scroll down to explore'
        });
      }
    } catch (error) {
      console.error('Error fetching general settings:', error);
    }
  };

  const handlePrimaryButton = () => {
    window.open(heroContent.primary_button_url, '_blank');
  };

  const handleSecondaryButton = () => {
    if (heroContent.secondary_button_url !== '#') {
      window.open(heroContent.secondary_button_url, '_blank');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8">
          <Award className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{heroContent.brand_name} - Empowering Bangladesh's Future</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          {heroContent.title}
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {heroContent.subtitle}
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
          {heroContent.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            onClick={handlePrimaryButton}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            {heroContent.primary_button_text}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleSecondaryButton}
            className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-300"
          >
            <Play className="mr-2 h-5 w-5" />
            {heroContent.secondary_button_text}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{heroContent.stat1_number}</div>
            <div className="text-blue-200 font-medium">{heroContent.stat1_label}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{heroContent.stat2_number}</div>
            <div className="text-blue-200 font-medium">{heroContent.stat2_label}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-pink-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{heroContent.stat3_number}</div>
            <div className="text-blue-200 font-medium">{heroContent.stat3_label}</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center animate-bounce">
          <p className="text-white/80 text-sm mb-2">{generalSettings.scroll_text}</p>
          <ChevronDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
