
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, Filter, Check } from 'lucide-react';
import { fetchJobs } from '../../../service/freelancer/Jobs/JobService';
import Navbar from '../../../components/freelancer/DashBoard/Navbar';
import type { IJob } from '../../../types/client/jobs/IJob';

import { useNavigate } from 'react-router-dom';

const FreelancerJobListing = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<IJob[]>([]);

    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 200]);

    // // Mock Data for filters
    const categories = ['Development', 'Design', 'Marketing', 'Writing', 'Admin'];
    const skills = ['React', 'Node.js', 'UI/UX', 'SEO', 'Python', 'Figma', 'TypeScript'];

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs();
                console.log("Job API Response:", data);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const jobsData = (data as any)?.response?.jobs || (data as any)?.jobs || (Array.isArray(data) ? data : []);

                if (Array.isArray(jobsData)) {
                    console.log("Extracted jobs array:", jobsData);
                    setJobs(jobsData);
                } else {
                    console.error("Jobs data is not an array:", jobsData);
                    setJobs([]);
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, []);

    // Extract unique categories and skills from jobs (safely)
    const validJobs = jobs.filter(job => job && typeof job === 'object');
    // const categories = Array.from(new Set(validJobs.map(job => job?.category).filter(Boolean)));
    // const skills = Array.from(new Set(validJobs.flatMap(job => job?.skill || [])));

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleSkillChange = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    // Helper to parse price from string
    const getPriceValue = (priceStr?: string) => {
        if (!priceStr || typeof priceStr !== 'string') return 0;
        const numbers = priceStr.match(/\d+/g);
        if (!numbers) return 0;
        if (numbers.length >= 2) {
            return (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
        }
        return parseInt(numbers[0]);
    };

    const filteredJobs = validJobs.filter(job => {
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(job.category);
        const skillMatch = selectedSkills.length === 0 || (job.skill || []).some(tag => selectedSkills.includes(tag));
        const jobPriceVal = getPriceValue(job.price);
        const priceMatch = jobPriceVal >= priceRange[0] && (priceRange[1] === 200 ? true : jobPriceVal <= priceRange[1]);

        return categoryMatch && skillMatch && priceMatch;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Navbar />

            {/* Main Layout - Offset for fixed navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content - Job List */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Recommended Jobs <span className="text-gray-500 font-normal">({filteredJobs.length})</span></h2>
                            <div className="text-sm text-gray-500">Sort by: <span className="text-emerald-600 font-medium cursor-pointer hover:underline">Newest</span></div>
                        </div>

                        {/* Search Bar Mobile */}
                        <div className="lg:hidden relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search for jobs..."
                                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse h-48"></div>
                                ))}
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <p className="text-gray-500">No jobs found matching your filters.</p>
                                <button
                                    onClick={() => { setSelectedCategory([]); setSelectedSkills([]); setPriceRange([0, 200]); }}
                                    className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -2, borderColor: 'rgba(16, 185, 129, 0.4)' }} // Emerald-500
                                        onClick={() => navigate(`/freelancer/jobs/${job._id}`)}
                                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                                                {/* <p className="text-sm text-gray-500 mb-2 font-medium">{job.company}</p> */}
                                            </div>
                                            <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center border border-emerald-100 text-emerald-600 font-bold text-xs">
                                                {/* {job.company.substring(0, 2).toUpperCase()} */}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">{job.summary}</p>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {(job.skill || []).map(tag => (
                                                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <DollarSign className="w-4 h-4 text-emerald-500" />
                                                <span className="font-medium text-gray-700">{job.price}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span>{job.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 hidden md:flex">
                                                <MapPin className="w-4 h-4 text-purple-500" />
                                                <span>{job.deadline}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Filters */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="sticky top-24 space-y-6">

                            {/* Search (Desktop) */}
                            <div className="relative hidden lg:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search keywords..."
                                    className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                                />
                            </div>

                            {/* Filter Container */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Filter className="w-4 h-4 text-emerald-600" /> Filters
                                    </h3>
                                    <button
                                        onClick={() => { setSelectedCategory([]); setSelectedSkills([]); setPriceRange([0, 200]); }}
                                        className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline"
                                    >
                                        Clear all
                                    </button>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Category</h4>
                                    <div className="space-y-2">
                                        {categories.map(cat => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group select-none">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategory.includes(cat) ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400 bg-white'}`}>
                                                    {selectedCategory.includes(cat) && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={selectedCategory.includes(cat)}
                                                    onChange={() => handleCategoryChange(cat)}
                                                />
                                                <span className={`text-sm ${selectedCategory.includes(cat) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => (
                                            <button
                                                key={skill}
                                                onClick={() => handleSkillChange(skill)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedSkills.includes(skill)
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-semibold text-gray-800">Hourly Rate</h4>
                                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            ${priceRange[0]} - ${priceRange[1] === 200 ? '200+' : priceRange[1]}
                                        </span>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="200"
                                        step="10"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>$0</span>
                                        <span>$100</span>
                                        <span>$200+</span>
                                    </div>
                                </div>

                            </div>

                            {/* Promo Card */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6 text-center text-white relative overflow-hidden shadow-lg">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <h4 className="text-lg font-bold relative z-10 mb-2">Upgrade to Pro</h4>
                                <p className="text-emerald-50 text-sm mb-4 relative z-10 font-light opacity-90">Get instant alerts and see jobs before others.</p>
                                <button className="relative z-10 bg-white text-emerald-700 px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-emerald-50 transition-colors w-full">
                                    View Plans
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        // <div>
        //     <h1>hyy</h1>
        // </div>
    );
};

export default FreelancerJobListing;
