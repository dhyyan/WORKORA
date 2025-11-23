
import { motion } from 'framer-motion';
import { CodeIcon, PaletteIcon, PenToolIcon, MegaphoneIcon, VideoIcon, TrendingUpIcon } from 'lucide-react';
export function FeaturedCategories() {
  const categories = [{
    icon: CodeIcon,
    title: 'Web Development',
    count: '12,450+ freelancers',
    color: 'from-blue-500 to-blue-600'
  }, {
    icon: PaletteIcon,
    title: 'Design',
    count: '8,320+ freelancers',
    color: 'from-purple-500 to-purple-600'
  }, {
    icon: PenToolIcon,
    title: 'Writing',
    count: '6,780+ freelancers',
    color: 'from-pink-500 to-pink-600'
  }, {
    icon: MegaphoneIcon,
    title: 'Marketing',
    count: '5,640+ freelancers',
    color: 'from-orange-500 to-orange-600'
  }, {
    icon: VideoIcon,
    title: 'Video & Animation',
    count: '4,920+ freelancers',
    color: 'from-red-500 to-red-600'
  }, {
    icon: TrendingUpIcon,
    title: 'Business',
    count: '7,230+ freelancers',
    color: 'from-teal-500 to-teal-600'
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
            Featured Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore top talent across popular categories
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="group cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.count}</p>
              </div>
            </motion.div>)}
        </div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="text-center mt-12">
          <button className="px-8 py-3 text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300">
            View All Categories →
          </button>
        </motion.div>
      </div>
    </div>;
}