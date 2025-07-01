
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const VisionMissionEditor = () => {
  const [content, setContent] = useState({
    id: '',
    vision_title: 'Our Vision',
    vision_content: 'To reshape the future of online education by empowering educators and mentors with simple tools to deliver real-time support, personalized guidance, quality education, and human connection, for a generation that doesn\'t just want content, but clarity, connection, and change.',
    mission_title: 'Our Mission',
    mission_content: 'To empower educators and mentors with simple, flexible tools to teach, guide, and grow on their own terms. We help students access clarity, not just content, through real conversations, personalized mentorship, and instant support, delivering the best possible learning experience. By removing the tech stress, we let mentors focus on what truly matters: solving, teaching, and making impact.',
    what_sets_us_apart_title: 'What Sets Us Apart',
    what_sets_us_apart_content: 'Innovation, Quality, and a Student-First Mindset\nLetting Educators Do What They Do Best\nPersonalized Learning, Aligned with Student Goals\nA Thriving Community for Support and Growth'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_mission')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching vision/mission content:', error);
      toast.error('Failed to load vision/mission content');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('vision_mission')
        .update(content)
        .eq('id', content.id);
      
      if (error) throw error;
      toast.success('Vision/Mission content updated successfully!');
      // Refresh data after successful save
      await fetchContent();
    } catch (error) {
      console.error('Error updating vision/mission content:', error);
      toast.error('Failed to update vision/mission content');
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vision, Mission & What Sets Us Apart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vision</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Vision Title</label>
            <Input
              value={content.vision_title}
              onChange={(e) => setContent({...content, vision_title: e.target.value})}
              placeholder="Our Vision"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vision Content</label>
            <Textarea
              value={content.vision_content}
              onChange={(e) => setContent({...content, vision_content: e.target.value})}
              placeholder="To reshape the future of online education..."
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mission</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Mission Title</label>
            <Input
              value={content.mission_title}
              onChange={(e) => setContent({...content, mission_title: e.target.value})}
              placeholder="Our Mission"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mission Content</label>
            <Textarea
              value={content.mission_content}
              onChange={(e) => setContent({...content, mission_content: e.target.value})}
              placeholder="To empower educators and mentors..."
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What Sets Us Apart</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={content.what_sets_us_apart_title}
              onChange={(e) => setContent({...content, what_sets_us_apart_title: e.target.value})}
              placeholder="What Sets Us Apart"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              value={content.what_sets_us_apart_content}
              onChange={(e) => setContent({...content, what_sets_us_apart_content: e.target.value})}
              placeholder="Innovation, Quality, and Student-Centric Approach"
              rows={4}
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

export default VisionMissionEditor;
