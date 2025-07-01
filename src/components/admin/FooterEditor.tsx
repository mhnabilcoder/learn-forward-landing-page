import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

interface PlatformLink {
  name: string;
  url: string;
}

const FooterEditor = () => {
  const [settings, setSettings] = useState({
    id: '',
    company_name: '',
    company_description: '',
    email: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    platform_links: [] as PlatformLink[],
    access_platform_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setSettings({
          ...data,
          platform_links: Array.isArray(data.platform_links) ? data.platform_links as PlatformLink[] : []
        });
      }
    } catch (error) {
      console.error('Error fetching footer settings:', error);
      toast.error('Failed to load footer settings');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('footer_settings')
        .update({
          ...settings,
          platform_links: JSON.stringify(settings.platform_links)
        })
        .eq('id', settings.id);
      
      if (error) throw error;
      toast.success('Footer settings updated successfully!');
    } catch (error) {
      console.error('Error updating footer settings:', error);
      toast.error('Failed to update footer settings');
    }
    setIsLoading(false);
  };

  const addPlatformLink = () => {
    setSettings({
      ...settings,
      platform_links: [...settings.platform_links, { name: '', url: '' }]
    });
  };

  const removePlatformLink = (index: number) => {
    const newLinks = settings.platform_links.filter((_, i) => i !== index);
    setSettings({ ...settings, platform_links: newLinks });
  };

  const updatePlatformLink = (index: number, field: keyof PlatformLink, value: string) => {
    const newLinks = [...settings.platform_links];
    newLinks[index][field] = value;
    setSettings({ ...settings, platform_links: newLinks });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <Input
              value={settings.company_name}
              onChange={(e) => setSettings({...settings, company_name: e.target.value})}
              placeholder="EdCluster"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
              placeholder="info@edcluster.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Description</label>
          <Textarea
            value={settings.company_description}
            onChange={(e) => setSettings({...settings, company_description: e.target.value})}
            placeholder="Transforming education through innovative technology"
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook URL</label>
              <Input
                value={settings.facebook_url}
                onChange={(e) => setSettings({...settings, facebook_url: e.target.value})}
                placeholder="https://facebook.com/edcluster"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <Input
                value={settings.instagram_url}
                onChange={(e) => setSettings({...settings, instagram_url: e.target.value})}
                placeholder="https://instagram.com/edcluster"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <Input
                value={settings.linkedin_url}
                onChange={(e) => setSettings({...settings, linkedin_url: e.target.value})}
                placeholder="https://linkedin.com/company/edcluster"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">YouTube URL</label>
              <Input
                value={settings.youtube_url}
                onChange={(e) => setSettings({...settings, youtube_url: e.target.value})}
                placeholder="https://youtube.com/@edcluster"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Platform Links</h3>
            <Button onClick={addPlatformLink} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
          
          {settings.platform_links.map((link, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Link Name</label>
                <Input
                  value={link.name}
                  onChange={(e) => updatePlatformLink(index, 'name', e.target.value)}
                  placeholder="Learning Dashboard"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input
                  value={link.url}
                  onChange={(e) => updatePlatformLink(index, 'url', e.target.value)}
                  placeholder="/dashboard"
                />
              </div>
              <Button onClick={() => removePlatformLink(index)} variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FooterEditor;
