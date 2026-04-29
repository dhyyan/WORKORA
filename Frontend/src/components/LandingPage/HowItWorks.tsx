import { motion } from 'framer-motion';
import { SearchIcon, UsersIcon, CheckCircleIcon } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: SearchIcon,
      title: 'Post or find jobs',
      description: 'Clients post projects or browse freelancer profiles. Freelancers discover opportunities that match their skills.'
    },
    {
      icon: UsersIcon,
      title: 'Collaborate securely',
      description: 'Connect through our platform with built-in messaging, file sharing, and project management tools.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Get work done and paid easily',
      description: 'Complete projects with confidence using our secure payment system and milestone tracking.'
    }
  ];

  return (
    <div className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to success in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: index * 0.2 }} 
              className="relative group"
            >
              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-emerald-50 z-0">
                  <div className="h-full bg-emerald-200 w-0 group-hover:w-full transition-all duration-700 delay-300"></div>
                </div>
              )}

              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 group-hover:-translate-y-2">
                <div className="absolute -top-5 left-8 w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-500">
                  <step.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}