
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, Link } from 'lucide-react';

const FoundersEditor = () => {
  const [founders, setFounders] = useState([]);
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
      setFounders(data || []);
    } catch (error) {
      console.error('Error fetching founders:', error);
      toast.error('Failed to load founders');
    }
  };

  const handleImageUpload = async (index, file) => {
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
      for (const founder of founders) {
        if (founder.id) {
          const { error } = await supabase
            .from('founders')
            .update(founder)
            .eq('id', founder.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('founders')
            .insert(founder);
          
          if (error) throw error;
        }
      }
      
      toast.success('Founders updated successfully!');
      // Refresh data after successful save
      await fetchFounders();
    } catch (error) {
      console.error('Error updating founders:', error);
      toast.error('Failed to update founders');
    }
    setIsLoading(false);
  };

  const addFounder = () => {
    const newFounder = {
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

  const removeFounder = async (index) => {
    const founder = founders[index];
    if (founder.id) {
      try {
        const { error } = await supabase
          .from('founders')
          .delete()
          .eq('id', founder.id);
        
        if (error) throw error;
        toast.success('Founder removed successfully');
      } catch (error) {
        console.error('Error deleting founder:', error);
        toast.error('Failed to delete founder');
        return;
      }
    }
    
    const newFounders = founders.filter((_, i) => i !== index);
    setFounders(newFounders);
  };

  const updateFounder = (index, field, value) => {
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
          <Card key={index} className="p-4">
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
