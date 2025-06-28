
import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      avatar: "SJ",
      rating: 5,
      comment: "This platform completely changed how I approach learning. The courses are incredibly well-structured and the instructors are top-notch."
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      avatar: "MC",
      rating: 5,
      comment: "I've tried many online learning platforms, but this one stands out. The interactive elements and practical projects make all the difference."
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "ER",
      rating: 5,
      comment: "The quality of education here is exceptional. I was able to advance my career significantly thanks to the skills I learned."
    },
    {
      name: "David Thompson",
      role: "UX Designer",
      avatar: "DT",
      rating: 5,
      comment: "Amazing learning experience! The platform is intuitive and the course content is always up-to-date with industry standards."
    },
    {
      name: "Lisa Wang",
      role: "Marketing Director",
      avatar: "LW",
      rating: 5,
      comment: "The best investment I've made in my professional development. The courses are engaging and the community is incredibly supportive."
    },
    {
      name: "James Wilson",
      role: "Full Stack Developer",
      avatar: "JW",
      rating: 5,
      comment: "Fantastic platform with excellent instructors. The hands-on approach really helps in understanding complex concepts."
    },
    {
      name: "Anna Martinez",
      role: "Business Analyst",
      avatar: "AM",
      rating: 5,
      comment: "The beta experience has been incredible. Looking forward to seeing more features as the platform evolves."
    },
    {
      name: "Robert Kim",
      role: "AI Engineer",
      avatar: "RK",
      rating: 5,
      comment: "Being part of the beta program gave me early access to cutting-edge courses. Highly recommend this platform!"
    }
  ];

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
                  className="flex-none w-96 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
                >
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-blue-300" />
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.comment}"</p>
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
