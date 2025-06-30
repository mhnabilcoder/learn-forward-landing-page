
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

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
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById('testimonials-scroll');
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('testimonials-scroll');
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Beta Users</span> Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our early adopters who experienced Edcluster during beta testing
          </p>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <ScrollArea className="w-full whitespace-nowrap">
            <div id="testimonials-scroll" className="flex w-max space-x-6 p-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-none w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col min-h-[280px]"
                >
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-blue-300" />
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {testimonial.avatar_text}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 truncate">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm truncate">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed italic text-sm flex-1 whitespace-normal overflow-hidden text-ellipsis">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
