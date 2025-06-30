
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const HeroEditor = () => {
  const [content, setContent] = useState({
    id: '',
    brand_name: '',
    title: '',
    subtitle: '',
    description: '',
    primary_button_text: '',
    secondary_button_text: '',
    stat1_number: '',
    stat1_label: '',
    stat2_number: '',
    stat2_label: '',
    stat3_number: '',
    stat3_label: ''
  });
  const [isLoading, setIsLoading] = useState(false);

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
      if (data) setContent(data);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast.error('Failed to load hero content');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('hero_content')
        .update(content)
        .eq('id', content.id);
      
      if (error) throw error;
      toast.success('Hero content updated successfully!');
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast.error('Failed to update hero content');
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <Input
            value={content.brand_name}
            onChange={(e) => setContent({...content, brand_name: e.target.value})}
            placeholder="EdCluster"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              placeholder="Transform Your"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              value={content.subtitle}
              onChange={(e) => setContent({...content, subtitle: e.target.value})}
              placeholder="Learning Journey"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={content.description}
            onChange={(e) => setContent({...content, description: e.target.value})}
            placeholder="Bangladesh's Gen Z Deserves Better..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primary Button Text</label>
            <Input
              value={content.primary_button_text}
              onChange={(e) => setContent({...content, primary_button_text: e.target.value})}
              placeholder="Visit The Platform"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
            <Input
              value={content.secondary_button_text}
              onChange={(e) => setContent({...content, secondary_button_text: e.target.value})}
              placeholder="Watch Intro"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stat 1 Number</label>
            <Input
              value={content.stat1_number}
              onChange={(e) => setContent({...content, stat1_number: e.target.value})}
              placeholder="50K+"
            />
            <label className="block text-sm font-medium mb-1 mt-2">Stat 1 Label</label>
            <Input
              value={content.stat1_label}
              onChange={(e) => setContent({...content, stat1_label: e.target.value})}
              placeholder="Active Learners"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stat 2 Number</label>
            <Input
              value={content.stat2_number}
              onChange={(e) => setContent({...content, stat2_number: e.target.value})}
              placeholder="1000+"
            />
            <label className="block text-sm font-medium mb-1 mt-2">Stat 2 Label</label>
            <Input
              value={content.stat2_label}
              onChange={(e) => setContent({...content, stat2_label: e.target.value})}
              placeholder="Expert Courses"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stat 3 Number</label>
            <Input
              value={content.stat3_number}
              onChange={(e) => setContent({...content, stat3_number: e.target.value})}
              placeholder="95%"
            />
            <label className="block text-sm font-medium mb-1 mt-2">Stat 3 Label</label>
            <Input
              value={content.stat3_label}
              onChange={(e) => setContent({...content, stat3_label: e.target.value})}
              placeholder="Success Rate"
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeroEditor;
