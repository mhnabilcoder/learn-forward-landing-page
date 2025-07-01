
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AboutEdcluster = () => {
  const [content, setContent] = useState({
    vision_title: 'Our Vision',
    vision_content: 'To reshape the future of online education by empowering educators and mentors with simple tools to deliver real-time support, personalized guidance, quality education, and human connection, for a generation that doesn\'t just want content, but clarity, connection, and change.',
    mission_title: 'Our Mission',
    mission_content: 'To empower educators and mentors with simple, flexible tools to teach, guide, and grow on their own terms. We help students access clarity, not just content, through real conversations, personalized mentorship, and instant support, delivering the best possible learning experience. By removing the tech stress, we let mentors focus on what truly matters: solving, teaching, and making impact.',
    what_sets_us_apart_title: 'What Sets Us Apart',
    what_sets_us_apart_content: 'Innovation, Quality, and a Student-First Mindset\nLetting Educators Do What They Do Best\nPersonalized Learning, Aligned with Student Goals\nA Thriving Community for Support and Growth'
  });

  useEffect(() => {
    fetchContent();
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Vision */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.vision_title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {content.vision_content}
            </p>
          </div>

          {/* Mission */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.mission_title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {content.mission_content}
            </p>
          </div>

          {/* What Sets Us Apart */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.what_sets_us_apart_title}</h3>
            <div className="text-gray-600 leading-relaxed">
              {formatContent(content.what_sets_us_apart_content)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
