import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon } from 'lucide-react';
export function Testimonials() {
  const testimonials = [{
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    text: "Finding the right freelancer has never been easier. The platform is intuitive, and the quality of talent is exceptional. We've completed over 20 projects with amazing results."
  }, {
    name: 'Michael Chen',
    role: 'Freelance Designer',
    company: 'Independent',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
    text: "As a freelancer, this platform has transformed my business. The secure payment system and professional clients make it the best marketplace I've used. Highly recommend!"
  }, {
    name: 'Emily Rodriguez',
    role: 'Startup Founder',
    company: 'InnovateLabs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    text: 'We built our entire product with freelancers from this platform. The verification process ensures quality, and the support team is always there when we need them.'
  }];
  return <div className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied clients and freelancers
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.2
        }} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 h-full flex flex-col">
                <QuoteIcon className="w-10 h-10 text-teal-500 mb-4 opacity-50" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-100" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-teal-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}