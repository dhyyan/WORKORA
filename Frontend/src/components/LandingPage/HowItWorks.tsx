import { motion } from 'framer-motion';
import { SearchIcon, UsersIcon, CheckCircleIcon } from 'lucide-react';
export function HowItWorks() {
  const steps = [{
    icon: SearchIcon,
    title: 'Post or find jobs',
    description: 'Clients post projects or browse freelancer profiles. Freelancers discover opportunities that match their skills.'
  }, {
    icon: UsersIcon,
    title: 'Collaborate securely',
    description: 'Connect through our platform with built-in messaging, file sharing, and project management tools.'
  }, {
    icon: CheckCircleIcon,
    title: 'Get work done and paid easily',
    description: 'Complete projects with confidence using our secure payment system and milestone tracking.'
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => <motion.div key={index} initial={{
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
        }} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-300 to-transparent"></div>}
            </motion.div>)}
        </div>
      </div>
    </div>;
}