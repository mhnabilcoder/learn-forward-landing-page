
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const GeneralEditor = () => {
  const [settings, setSettings] = useState({
    id: '',
    site_title: '',
    meta_description: '',
    motto: '',
    tagline: '',
    scroll_text: '',
    access_platform_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('general_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching general settings:', error);
      toast.error('Failed to load general settings');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('general_settings')
        .update(settings)
        .eq('id', settings.id);
      
      if (error) throw error;
      toast.success('General settings updated successfully!');
    } catch (error) {
      console.error('Error updating general settings:', error);
      toast.error('Failed to update general settings');
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Site Title</label>
          <Input
            value={settings.site_title}
            onChange={(e) => setSettings({...settings, site_title: e.target.value})}
            placeholder="EdCluster"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <Textarea
            value={settings.meta_description}
            onChange={(e) => setSettings({...settings, meta_description: e.target.value})}
            placeholder="Transform your learning journey with EdCluster"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Motto</label>
            <Input
              value={settings.motto}
              onChange={(e) => setSettings({...settings, motto: e.target.value})}
              placeholder="Empowering Bangladesh's Future"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tagline</label>
            <Input
              value={settings.tagline}
              onChange={(e) => setSettings({...settings, tagline: e.target.value})}
              placeholder="Gen Z Deserves Better"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scroll Text (Hero Section)</label>
          <Input
            value={settings.scroll_text}
            onChange={(e) => setSettings({...settings, scroll_text: e.target.value})}
            placeholder="Scroll down to explore"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Access Platform URL</label>
          <Input
            value={settings.access_platform_url}
            onChange={(e) => setSettings({...settings, access_platform_url: e.target.value})}
            placeholder="https://platform.edcluster.com"
          />
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneralEditor;
