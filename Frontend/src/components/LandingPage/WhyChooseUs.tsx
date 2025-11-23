import { motion } from 'framer-motion';
import { ShieldCheckIcon, StarIcon, MessageSquareIcon, ClockIcon } from 'lucide-react';
export function WhyChooseUs() {
  const benefits = [{
    icon: ShieldCheckIcon,
    title: 'Secure Payments',
    description: "Your money is protected with our secure escrow system. Pay only when you're 100% satisfied with the work."
  }, {
    icon: StarIcon,
    title: 'Verified Freelancers',
    description: 'Every freelancer is vetted and verified. Browse portfolios, reviews, and ratings to find the perfect match.'
  }, {
    icon: MessageSquareIcon,
    title: 'Transparent Reviews',
    description: 'Real reviews from real clients. Make informed decisions based on honest feedback and detailed ratings.'
  }, {
    icon: ClockIcon,
    title: '24/7 Support',
    description: 'Our dedicated support team is always here to help. Get assistance whenever you need it, day or night.'
  }];
  return <div className="w-full py-24 bg-white">
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
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The platform that puts your success first
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-300">
                    <benefit.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}