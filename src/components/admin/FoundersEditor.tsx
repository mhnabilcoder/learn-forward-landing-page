
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, Link } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar_text: string;
  portfolio_url: string;
  has_image: boolean;
  image_url: string;
  order_index: number;
  section_title?: string;
  section_tagline?: string;
  created_at?: string;
  updated_at?: string;
}

const FoundersEditor = () => {
  const [founders, setFounders] = useState<Founder[]>([
    {
      id: crypto.randomUUID(),
      name: 'Mahedi Hasan Nabil',
      title: 'Co-Founder & COO',
      description: 'As a strategist at heart, I align internal operations with our vision to create seamless experiences for educators and learners.',
      avatar_text: 'MN',
      portfolio_url: 'https://mahedi-portfolio.com',
      has_image: true,
      image_url: '/lovable-uploads/2f879a8f-cf5b-4a2b-9c36-e4dee45dfcb0.png',
      order_index: 1
    },
    {
      id: crypto.randomUUID(),
      name: 'Founder 2',
      title: 'Co-Founder & CEO',
      description: 'Leading the vision and strategy for transforming education through technology.',
      avatar_text: 'F2',
      portfolio_url: '',
      has_image: true,
      image_url: '/lovable-uploads/ef90aa0d-99e8-4068-8331-bcad247cb460.png',
      order_index: 2
    },
    {
      id: crypto.randomUUID(),
      name: 'Founder 3',
      title: 'Co-Founder & CTO',
      description: 'Architecting the technical infrastructure that powers our educational platform.',
      avatar_text: 'F3',
      portfolio_url: '',
      has_image: true,
      image_url: '/lovable-uploads/c144ce34-13da-4028-a404-db140f3cc600.png',
      order_index: 3
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Map database data to match our interface
        const mappedData = data.map(founder => ({
          id: founder.id,
          name: founder.name,
          title: founder.title,
          description: founder.description,
          avatar_text: founder.avatar_text,
          portfolio_url: founder.portfolio_url || '',
          has_image: founder.has_image || false,
          image_url: founder.image_url || '',
          order_index: founder.order_index,
          section_title: founder.section_title,
          section_tagline: founder.section_tagline,
          created_at: founder.created_at,
          updated_at: founder.updated_at
        }));
        setFounders(mappedData);
      }
    } catch (error) {
      console.error('Error fetching founders:', error);
      toast.error('Failed to load founders');
    }
  };

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `founder-${Date.now()}.${fileExt}`;
      const filePath = `founders/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      updateFounder(index, 'image_url', publicUrl);
      updateFounder(index, 'has_image', true);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Clear existing data first
      const { error: deleteError } = await supabase
        .from('founders')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all existing records
      
      if (deleteError) throw deleteError;

      // Insert new data - map our interface back to database schema
      const foundersData = founders.map(founder => ({
        id: founder.id,
        name: founder.name,
        title: founder.title,
        description: founder.description,
        avatar_text: founder.avatar_text,
        portfolio_url: founder.portfolio_url,
        has_image: founder.has_image,
        image_url: founder.image_url,
        order_index: founder.order_index
      }));

      const { error } = await supabase
        .from('founders')
        .insert(foundersData);
      
      if (error) throw error;
      
      toast.success('Founders updated successfully!');
      await fetchFounders();
    } catch (error) {
      console.error('Error updating founders:', error);
      toast.error('Failed to update founders');
    }
    setIsLoading(false);
  };

  const addFounder = () => {
    const newFounder: Founder = {
      id: crypto.randomUUID(),
      name: '',
      title: '',
      description: '',
      avatar_text: '',
      portfolio_url: '',
      has_image: false,
      image_url: '',
      order_index: founders.length + 1
    };
    setFounders([...founders, newFounder]);
  };

  const removeFounder = async (index: number) => {
    const newFounders = founders.filter((_, i) => i !== index);
    setFounders(newFounders);
    toast.success('Founder removed');
  };

  const updateFounder = (index: number, field: keyof Founder, value: any) => {
    const newFounders = [...founders];
    newFounders[index] = { ...newFounders[index], [field]: value };
    setFounders(newFounders);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Founders Editor
          <Button onClick={addFounder} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Founder
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {founders.map((founder, index) => (
          <Card key={founder.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Founder {index + 1}</h4>
              <Button
                onClick={() => removeFounder(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={founder.name || ''}
                  onChange={(e) => updateFounder(index, 'name', e.target.value)}
                  placeholder="Mahedi Hasan Nabil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={founder.title || ''}
                  onChange={(e) => updateFounder(index, 'title', e.target.value)}
                  placeholder="Co-Founder & COO"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Avatar Text</label>
                <Input
                  value={founder.avatar_text || ''}
                  onChange={(e) => updateFounder(index, 'avatar_text', e.target.value)}
                  placeholder="MN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                <Input
                  value={founder.portfolio_url || ''}
                  onChange={(e) => updateFounder(index, 'portfolio_url', e.target.value)}
                  placeholder="https://mahedi-portfolio.com"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <Tabs defaultValue="link" className="w-full">
                <TabsList>
                  <TabsTrigger value="link">
                    <Link className="h-4 w-4 mr-2" />
                    Image Link
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="link" className="space-y-2">
                  <Input
                    value={founder.image_url || ''}
                    onChange={(e) => {
                      const url = e.target.value;
                      updateFounder(index, 'image_url', url);
                      updateFounder(index, 'has_image', !!url);
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  {founder.image_url && (
                    <div className="mt-2">
                      <img src={founder.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                  />
                  {founder.image_url && (
                    <div className="mt-2">
                      <img src={founder.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={founder.description || ''}
                onChange={(e) => updateFounder(index, 'description', e.target.value)}
                placeholder="As a strategist at heart, I align internal operations..."
                rows={4}
              />
            </div>
          </Card>
        ))}

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoundersEditor;
