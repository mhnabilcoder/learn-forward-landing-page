
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
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h4>
              <p className="text-gray-600 text-sm">Join a vibrant community of learners, mentors, and industry professionals.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Goal Oriented</h4>
              <p className="text-gray-600 text-sm">Every course designed with clear learning objectives and practical outcomes.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellence First</h4>
              <p className="text-gray-600 text-sm">Highest standards in content quality, instructor expertise, and student success.</p>
            </div>
          </div>

          {/* Right side - Mission, Vision, What Sets Us Apart */}
          <div className="space-y-8">
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
            <div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Visit The Platform
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEdcluster;
