
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const FeaturesEditor = () => {
  const [features, setFeatures] = useState([]);
  const [sectionSettings, setSectionSettings] = useState({
    section_title: 'Our Features',
    section_tagline: 'Finally! a platform that works for educators'
  });
  const [isLoading, setIsLoading] = useState(false);

  const iconOptions = ['Users', 'Target', 'Award', 'Heart', 'BookOpen'];
  const colorOptions = ['blue', 'purple', 'green', 'red', 'indigo'];

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setFeatures(data || []);
      
      if (data && data[0]) {
        setSectionSettings({
          section_title: data[0].section_title || 'Our Features',
          section_tagline: data[0].section_tagline || 'Finally! a platform that works for educators'
        });
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      toast.error('Failed to load features');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      for (const feature of features) {
        const featureData = {
          ...feature,
          section_title: sectionSettings.section_title,
          section_tagline: sectionSettings.section_tagline
        };

        if (feature.id) {
          const { error } = await supabase
            .from('features')
            .update(featureData)
            .eq('id', feature.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('features')
            .insert(featureData);
          
          if (error) throw error;
        }
      }
      
      toast.success('Features updated successfully!');
      fetchFeatures();
    } catch (error) {
      console.error('Error updating features:', error);
      toast.error('Failed to update features');
    }
    setIsLoading(false);
  };

  const addFeature = () => {
    const newFeature = {
      title: '',
      description: '',
      icon_name: 'Users',
      color_scheme: 'blue',
      order_index: features.length + 1
    };
    setFeatures([...features, newFeature]);
  };

  const removeFeature = async (index) => {
    const feature = features[index];
    if (feature.id) {
      try {
        const { error } = await supabase
          .from('features')
          .delete()
          .eq('id', feature.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting feature:', error);
        toast.error('Failed to delete feature');
        return;
      }
    }
    
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Section Title</label>
            <Input
              value={sectionSettings.section_title}
              onChange={(e) => setSectionSettings({...sectionSettings, section_title: e.target.value})}
              placeholder="Our Features"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Section Tagline</label>
            <Input
              value={sectionSettings.section_tagline}
              onChange={(e) => setSectionSettings({...sectionSettings, section_tagline: e.target.value})}
              placeholder="Finally! a platform that works for educators"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Features</h3>
          <Button onClick={addFeature} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Feature {index + 1}</h4>
                <Button
                  onClick={() => removeFeature(index)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Feature 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <Select value={feature.icon_name} onValueChange={(value) => updateFeature(index, 'icon_name', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(icon => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Advanced learning management system..."
                  rows={3}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Color Scheme</label>
                <Select value={feature.color_scheme} onValueChange={(value) => updateFeature(index, 'color_scheme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturesEditor;
