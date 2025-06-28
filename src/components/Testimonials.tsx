
import React from 'react';
import { Star, Quote } from 'lucide-react';

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
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-blue-600">Learners Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              <Quote className="absolute top-4 right-4 h-6 w-6 text-blue-300" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      </div>
    </section>
  );
};

export default Testimonials;
