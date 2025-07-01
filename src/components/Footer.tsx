import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PlatformLink {
  name: string;
  url: string;
}

const Footer = () => {
  const [footerSettings, setFooterSettings] = useState({
    company_name: 'EdCluster',
    company_description: 'Transforming education through innovative technology',
    email: 'info@edcluster.com',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    platform_links: [] as PlatformLink[],
    access_platform_url: 'https://platform.edcluster.com'
  });

  useEffect(() => {
    fetchFooterSettings();
  }, []);

  const fetchFooterSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setFooterSettings({
          ...data,
          platform_links: Array.isArray(data.platform_links) ? data.platform_links as PlatformLink[] : []
        });
      }
    } catch (error) {
      console.error('Error fetching footer settings:', error);
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: footerSettings.facebook_url },
    { name: 'Instagram', icon: Instagram, url: footerSettings.instagram_url },
    { name: 'LinkedIn', icon: Linkedin, url: footerSettings.linkedin_url },
    { name: 'YouTube', icon: Youtube, url: footerSettings.youtube_url }
  ].filter(social => social.url);

  const handlePlatformRedirect = () => {
    window.open(footerSettings.access_platform_url, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {footerSettings.company_name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {footerSettings.company_description}
            </p>
            <button 
              onClick={handlePlatformRedirect}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              Access Platform
            </button>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Platform</h4>
            <ul className="space-y-3">
              {footerSettings.platform_links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Connect</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 mb-2">Email</p>
                <a href={`mailto:${footerSettings.email}`} className="text-white hover:text-blue-400 transition-colors">
                  {footerSettings.email}
                </a>
              </div>
              {socialLinks.length > 0 && (
                <div>
                  <p className="text-gray-300 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 {footerSettings.company_name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/support" className="text-gray-400 hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
