
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const TestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      for (const testimonial of testimonials) {
        if (testimonial.id) {
          const { error } = await supabase
            .from('testimonials')
            .update(testimonial)
            .eq('id', testimonial.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('testimonials')
            .insert(testimonial);
          
          if (error) throw error;
        }
      }
      
      toast.success('Testimonials updated successfully!');
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonials:', error);
      toast.error('Failed to update testimonials');
    }
    setIsLoading(false);
  };

  const addTestimonial = () => {
    const newTestimonial = {
      name: '',
      role: '',
      avatar_text: '',
      rating: 5,
      comment: '',
      order_index: testimonials.length + 1
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const removeTestimonial = async (index) => {
    const testimonial = testimonials[index];
    if (testimonial.id) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', testimonial.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Failed to delete testimonial');
        return;
      }
    }
    
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
  };

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setTestimonials(newTestimonials);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Testimonials Editor
          <Button onClick={addTestimonial} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Testimonial {index + 1}</h4>
              <Button
                onClick={() => removeTestimonial(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  placeholder="Sarah Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  value={testimonial.role}
                  onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                  placeholder="Software Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar Text</label>
                <Input
                  value={testimonial.avatar_text}
                  onChange={(e) => updateTestimonial(index, 'avatar_text', e.target.value)}
                  placeholder="SJ"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Comment</label>
              <Textarea
                value={testimonial.comment}
                onChange={(e) => updateTestimonial(index, 'comment', e.target.value)}
                placeholder="This platform completely changed how I approach learning..."
                rows={3}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <Input
                type="number"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
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

export default TestimonialsEditor;
