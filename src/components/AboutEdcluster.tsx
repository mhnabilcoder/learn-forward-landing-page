import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Target, Award, Heart, BookOpen, Star, Zap, Shield, Layers } from 'lucide-react';

const iconMap = {
  Users, Target, Award, Heart, BookOpen, Star, Zap, Shield, Layers
};

const colorSchemes = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  red: 'from-red-500 to-red-600',
  indigo: 'from-indigo-500 to-indigo-600'
};

const AboutEdcluster = () => {
  const [content, setContent] = useState({
    vision_title: 'Our Vision',
    vision_content: 'To reshape the future of online education by empowering educators and mentors with simple tools to deliver real-time support, personalized guidance, quality education, and human connection, for a generation that doesn\'t just want content, but clarity, connection, and change.',
    mission_title: 'Our Mission',
    mission_content: 'To empower educators and mentors with simple, flexible tools to teach, guide, and grow on their own terms. We help students access clarity, not just content, through real conversations, personalized mentorship, and instant support, delivering the best possible learning experience. By removing the tech stress, we let mentors focus on what truly matters: solving, teaching, and making impact.',
    what_sets_us_apart_title: 'What Sets Us Apart',
    what_sets_us_apart_content: 'Innovation, Quality, and a Student-First Mindset\nLetting Educators Do What They Do Best\nPersonalized Learning, Aligned with Student Goals\nA Thriving Community for Support and Growth'
  });
  
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    fetchContent();
    fetchTiles();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_mission')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching vision/mission content:', error);
        return;
      }
      
      if (data) {
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching vision/mission content:', error);
    }
  };

  const fetchTiles = async () => {
    try {
      const { data, error } = await supabase
        .from('about_tiles')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      
      if (data) {
        setTiles(data);
      }
    } catch (error) {
      console.error('Error fetching tiles:', error);
    }
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">EdCluster</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming education through technology and making quality learning accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Tiles */}
          <div className="space-y-3">
            {tiles.map((tile) => {
              const IconComponent = iconMap[tile.icon_name] || Users;
              const gradientClass = colorSchemes[tile.color_scheme] || colorSchemes.blue;
              const bgColorClass = tile.color_scheme === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
                                  tile.color_scheme === 'purple' ? 'from-purple-50 to-purple-100 border-purple-200' :
                                  tile.color_scheme === 'green' ? 'from-green-50 to-green-100 border-green-200' :
                                  tile.color_scheme === 'red' ? 'from-red-50 to-red-100 border-red-200' :
                                  'from-indigo-50 to-indigo-100 border-indigo-200';
              
              return (
                <div
                  key={tile.id}
                  className={`bg-gradient-to-br ${bgColorClass} rounded-3xl p-4 border`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradientClass} rounded-full mb-4 flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{tile.title}</h4>
                  <p className="text-gray-600 text-sm">{tile.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right side - Vision, Mission, What Sets Us Apart */}
          <div className="space-y-8">
            {/* Vision */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.vision_title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.vision_content}
              </p>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.mission_title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.mission_content}
              </p>
            </div>

            {/* What Sets Us Apart */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.what_sets_us_apart_title}</h3>
              <div className="space-y-3 mb-6">
                {content.what_sets_us_apart_content.split('\n').map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Platform Button */}
            {/*
            <div>
              <a href="https://edcluster.com/" target="_blank" rel="noopener noreferrer">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Visit The Platform
                </button>
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
