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

const AboutTiles = () => {
  const [tiles, setTiles] = useState([]);
  const [sectionSettings, setSectionSettings] = useState({
    section_title: 'About EdCluster',
    section_tagline: 'Why Choose Us'
  });

  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      const { data, error } = await supabase
        .from('about_tiles')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTiles(data);
        setSectionSettings({
          section_title: data[0].section_title || 'About EdCluster',
          section_tagline: data[0].section_tagline || 'Why Choose Us'
        });
      }
    } catch (error) {
      console.error('Error fetching tiles:', error);
    }
  };

  if (tiles.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {sectionSettings.section_title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {sectionSettings.section_tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiles.map((tile) => {
            const IconComponent = iconMap[tile.icon_name] || Users;
            const gradientClass = colorSchemes[tile.color_scheme] || colorSchemes.blue;
            
            return (
              <div
                key={tile.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {tile.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {tile.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTiles;