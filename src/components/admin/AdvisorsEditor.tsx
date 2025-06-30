
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const AdvisorsEditor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const colorOptions = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-blue-600',
    'from-green-500 to-blue-600',
    'from-red-500 to-pink-600',
    'from-yellow-500 to-orange-600'
  ];

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('advisors')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching advisors:', error);
      toast.error('Failed to load advisors');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      for (const advisor of advisors) {
        if (advisor.id) {
          const { error } = await supabase
            .from('advisors')
            .update(advisor)
            .eq('id', advisor.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('advisors')
            .insert(advisor);
          
          if (error) throw error;
        }
      }
      
      toast.success('Advisors updated successfully!');
      fetchAdvisors();
    } catch (error) {
      console.error('Error updating advisors:', error);
      toast.error('Failed to update advisors');
    }
    setIsLoading(false);
  };

  const addAdvisor = () => {
    const newAdvisor = {
      name: '',
      credentials: '',
      expertise: '',
      description: '',
      color_scheme: 'from-blue-500 to-indigo-600',
      has_image: false,
      image_url: '',
      order_index: advisors.length + 1
    };
    setAdvisors([...advisors, newAdvisor]);
  };

  const removeAdvisor = async (index) => {
    const advisor = advisors[index];
    if (advisor.id) {
      try {
        const { error } = await supabase
          .from('advisors')
          .delete()
          .eq('id', advisor.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting advisor:', error);
        toast.error('Failed to delete advisor');
        return;
      }
    }
    
    const newAdvisors = advisors.filter((_, i) => i !== index);
    setAdvisors(newAdvisors);
  };

  const updateAdvisor = (index, field, value) => {
    const newAdvisors = [...advisors];
    newAdvisors[index] = { ...newAdvisors[index], [field]: value };
    setAdvisors(newAdvisors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Advisors Editor
          <Button onClick={addAdvisor} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Advisor
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {advisors.map((advisor, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Advisor {index + 1}</h4>
              <Button
                onClick={() => removeAdvisor(index)}
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
                  value={advisor.name}
                  onChange={(e) => updateAdvisor(index, 'name', e.target.value)}
                  placeholder="Mujibur Rahman"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Credentials</label>
                <Input
                  value={advisor.credentials}
                  onChange={(e) => updateAdvisor(index, 'credentials', e.target.value)}
                  placeholder="ACCA Member & CEO of MR-Accountants"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Expertise</label>
              <Input
                value={advisor.expertise}
                onChange={(e) => updateAdvisor(index, 'expertise', e.target.value)}
                placeholder="Financial Systems & Strategic Planning"
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={advisor.description}
                onChange={(e) => updateAdvisor(index, 'description', e.target.value)}
                placeholder="Has advised and supported multiple international EdTech startups..."
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Color Scheme</label>
                <Select value={advisor.color_scheme} onValueChange={(value) => updateAdvisor(index, 'color_scheme', value)}>
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
              <div>
                <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                <Input
                  value={advisor.image_url || ''}
                  onChange={(e) => {
                    updateAdvisor(index, 'image_url', e.target.value);
                    updateAdvisor(index, 'has_image', !!e.target.value);
                  }}
                  placeholder="/lovable-uploads/image.png"
                />
              </div>
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

export default AdvisorsEditor;
