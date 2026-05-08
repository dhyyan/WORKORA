import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Check, Loader2, Briefcase, FileText } from 'lucide-react';
import { fetchJobs, fetchBids, fetchAcceptedJobs, fetchCompletedJobs } from '../../../service/freelancer/Jobs/JobService';
import { listCategoryService } from '../../../service/admin/Dashboard/client/clientService';
import type { IJob } from '../../../types/client/jobs/IJob';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import Pagination from '../../../components/common/Pagination';

// Mock Data Types
interface IMockProject {
    _id: string; // Keep string for consistent ID handling
    title?: string;
    client?: string;
    status: 'Ongoing' | 'Completed' | 'Bids' | string;
    price?: string | number;
    bidAmount?: string | number;
    createdAt: string;
    coverLetter?: string;
}

const FreelancerJobListing = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [loading, setLoading] = useState(true);
    const { freelancer } = useSelector((state: RootState) => state.freelancerAuth);
    const freelancerId = freelancer?._id;

    // Tab State
    const tabs = ['All', 'Ongoing', 'Bids', 'Completed'];
    const [activeTab, setActiveTab] = useState('All');
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [mockData, setMockData] = useState<IMockProject[]>([]);

    // Filters State (Only for 'All' tab)
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
    const [search, setSearch] = useState("")
    const [activeSearch, setActiveSearch] = useState("")

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    // Categories and Skills
    const [categories, setCategories] = useState<string[]>([]);
    const skills = ['React', 'Node.js', 'UI/UX', 'SEO', 'Python', 'Figma', 'TypeScript'];


    // Load categories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await listCategoryService();
                if (response && response.categories) {
                    const categoryNames = response.categories
                        .filter((cat: { isListed?: boolean; name: string }) => cat.isListed !== false)
                        .map((cat: { name: string }) => cat.name);
                    setCategories(categoryNames);
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        loadCategories();
    }, []);


    //Load jobs
    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs(selectedCategory, selectedSkills, priceRange, currentPage, limit, activeSearch);
                const responseData = (data as { response?: { jobs?: IJob[]; totalJobs?: number } })?.response || data;
                const jobsData = responseData?.jobs || (Array.isArray(data) ? data : []);
                const totalCount = responseData?.totalJobs || 0;

                console.log("listd jobsee", jobsData)
                if (Array.isArray(jobsData)) {
                    setJobs(jobsData);
                    setTotalPages(Math.ceil(totalCount / limit));
                } else {
                    setJobs([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, [priceRange, selectedCategory, selectedSkills, currentPage, activeSearch]);

    // Reset pagination when applying a new filter
    useEffect(() => {
        setCurrentPage(1);
    }, [priceRange, selectedCategory, selectedSkills, activeSearch]);


    // Tab Switcher Logic
    const handleTabChange = async (tab: string) => {
        if (tab === activeTab) return;
        setIsTabLoading(true);
        setActiveTab(tab);

        try {
            if (tab === 'All') {
                setMockData([]); // Clear other tab data
            } else if (tab === 'Bids') {
                if (freelancerId) {
                    const response = await fetchBids(freelancerId);
                    console.log("respose of bid", response)
                    if (response && response.bids) {
                        setMockData(response.bids.bids);
                    } else {
                        setMockData([]);
                    }
                }
            } else if (tab === 'Ongoing') {
                if (freelancerId) {

                    const response = await fetchAcceptedJobs(freelancerId);
                    console.log("accepted jobs", response)
                    if (response && response.jobs) {

                        setMockData(response.jobs);
                    } else {
                        setMockData([]);
                    }
                }
            } else if (tab === 'Completed') {
                if (freelancerId) {
                    const response = await fetchCompletedJobs(freelancerId);
                    console.log("response of completed jobs", response)
                    if (response && response.jobs) {

                        setMockData(response.jobs);
                    } else {
                        setMockData([]);
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching data for tab ${tab}:`, error);
            setMockData([]);
        } finally {
            setIsTabLoading(false);
        }
    };

    console.log("bids data", mockData)

    // Filter Logic (For 'All' tab)
    const getPriceValue = (priceStr?: string) => {
        if (!priceStr || typeof priceStr !== 'string') return 0;
        const numbers = priceStr.match(/\d+/g);
        if (!numbers) return 0;
        if (numbers.length >= 2) {
            return (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
        }
        return parseInt(numbers[0]);
    };

    const validJobs = jobs.filter(job => job && typeof job === 'object');
    const filteredJobs = validJobs.filter(job => {
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(job.category);

        let jobSkills: string[] = [];
        if (Array.isArray(job.features)) {
            jobSkills = job.features;
        } else if (typeof job.features === 'string') {
            try {
                jobSkills = JSON.parse(job.features);
            } catch {
                jobSkills = [job.features];
            }
        }

        const skillMatch = selectedSkills.length === 0 || jobSkills.some(tag => selectedSkills.includes(tag));
        const jobPriceVal = getPriceValue(job.price?.toString());

        const normalizedJobPriceVal = isNaN(jobPriceVal) ? 0 : jobPriceVal;
        const priceMatch = (priceRange[1] >= 50000) ? true : (normalizedJobPriceVal >= priceRange[0] && normalizedJobPriceVal <= priceRange[1]);

        return categoryMatch && skillMatch && priceMatch;
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    const handleSkillChange = (skill: string) => {
        setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ongoing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Bids': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };


    console.log("serach data", search)

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Main Layout - Offset for fixed navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Section with Tabs */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'All' ? 'Browse Jobs' : `My ${activeTab} Projects`}
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`
                                        relative pb-3 text-base font-medium transition-colors whitespace-nowrap
                                        ${activeTab === tab
                                            ? 'text-emerald-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }
                                    `}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabJobListing"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="min-h-[400px] relative">
                    <AnimatePresence mode="wait">
                        {isTabLoading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 pt-20"
                            >
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'All' ? (
                                    <div className="space-y-8">
                                        {/* Dark Search Header Area */}
                                        <div className="bg-[#18181B] text-white py-12 px-6 sm:px-10 lg:px-14 rounded-[2rem] relative overflow-hidden flex flex-col justify-center">
                                            {/* decorative star */}
                                            <div className="absolute top-8 right-12 text-white/50 text-opacity-30 text-8xl transform">✦</div>
                                            <div className="relative z-10 w-full max-w-4xl">
                                                <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-3 leading-tight tracking-tight">
                                                    Find Your Dream Job Here <span className="text-4xl leading-none font-light">✦</span>
                                                </h1>

                                                <div className="flex flex-col md:flex-row bg-white rounded-full p-2 gap-2 shadow-xl items-center">
                                                    <div className="flex-1 flex items-center pl-4 w-full">
                                                        <Search className="w-5 h-5 text-gray-400 shrink-0" />
                                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setActiveSearch(search)} placeholder="Job title or keyword" className="w-full px-4 py-3 bg-transparent text-gray-900 focus:outline-none font-medium placeholder:font-normal placeholder:text-gray-400" />
                                                    </div>

                                                    <button onClick={() => setActiveSearch(search)} className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-colors w-full md:w-auto mt-2 md:mt-0 shadow-md">
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Layout */}
                                        <div className="flex flex-col lg:flex-row gap-10 mt-12">

                                            {/* Left Sidebar */}
                                            <div className="w-full lg:w-64 shrink-0">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="font-semibold text-gray-900 text-base">Category</h3>
                                                    <button onClick={() => setSelectedCategory([])} className="text-xs text-red-500 font-medium hover:underline">Clear all</button>
                                                </div>

                                                <div className="space-y-3 mb-10">
                                                    {categories.map(cat => (
                                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group select-none">
                                                            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${selectedCategory.includes(cat) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                                                {selectedCategory.includes(cat) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                className="hidden"
                                                                checked={selectedCategory.includes(cat)}
                                                                onChange={() => handleCategoryChange(cat)}
                                                            />
                                                            <span className={`text-sm ${selectedCategory.includes(cat) ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{cat}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                <h3 className="font-semibold text-gray-900 text-base mb-6">Salary Range</h3>
                                                <div className="mb-10 px-1">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="50000"
                                                        step="500"
                                                        value={priceRange[1]}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            setPriceRange([0, val]);
                                                        }}
                                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                                                    />
                                                    <div className="flex justify-between text-xs font-semibold text-gray-600 mt-4 relative">
                                                        <span className="relative before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-gray-400 before:rounded-full">₹0</span>
                                                        <span className="relative before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-gray-400 before:rounded-full">
                                                            ₹{priceRange[1] >= 50000 ? '50k+' : (priceRange[1] >= 1000 ? `${priceRange[1] / 1000}k` : priceRange[1])}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="font-semibold text-gray-900 text-base">Skills</h3>
                                                    <button onClick={() => setSelectedSkills([])} className="text-xs text-transparent font-medium group-hover:text-red-500 hover:text-red-500 transition-colors">Clear</button>
                                                </div>
                                                <div className="space-y-3 mb-8">
                                                    {skills.map((skill, index) => (
                                                        <label key={skill} className="flex items-center justify-between cursor-pointer group select-none">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${selectedSkills.includes(skill) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                                                    {selectedSkills.includes(skill) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={selectedSkills.includes(skill)}
                                                                    onChange={() => handleSkillChange(skill)}
                                                                />
                                                                <span className={`text-sm ${selectedSkills.includes(skill) ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{skill}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{[392, 124, 3921, 45, 12, 532, 10][index] || 10}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right Job Listing Content */}
                                            <div className="flex-1">
                                                <div className="flex max-sm:flex-col sm:items-center justify-between mb-8 gap-4">
                                                    <h2 className="text-2xl md:text-[28px] font-bold text-gray-900">Recommended jobs</h2>
                                                    <button className="flex items-center justify-between gap-3 px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                                        Most recent
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                                    </button>
                                                </div>

                                                {loading ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                                            <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 animate-pulse h-[260px] shadow-sm"></div>
                                                        ))}
                                                    </div>
                                                ) : filteredJobs.length === 0 ? (
                                                    <div className="text-center py-24 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm">
                                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <Search className="w-6 h-6 text-gray-400" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                                                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Try adjusting your category, skills or salary range to find more opportunities.</p>
                                                        <button
                                                            onClick={() => { setSelectedCategory([]); setSelectedSkills([]); setPriceRange([0, 50000]); setSearch(''); setActiveSearch(''); }}
                                                            className="bg-[#3B82F6] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 transition-colors"
                                                        >
                                                            Clear filters
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-8">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                            {filteredJobs.map((job) => {
                                                                const sum = (job.title || "").split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                                                                const colors = [
                                                                    'bg-[#EBF5FF] text-[#2563EB] border-[#BFDBFE]',
                                                                    'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
                                                                    'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]',
                                                                    'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
                                                                    'bg-[#FAF5FF] text-[#9333EA] border-[#E9D5FF]',
                                                                ];
                                                                const logoColor = colors[sum % colors.length];

                                                                return (
                                                                    <motion.div
                                                                        key={job._id}
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                                                                        onClick={() => navigate(`/freelancer/jobs/${job._id}`)}
                                                                        className="bg-white border text-left border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col min-h-[250px] group"
                                                                    >
                                                                        <div className="flex justify-between items-start mb-4">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border shrink-0 shadow-sm overflow-hidden ${logoColor}`}>
                                                                                    {(job.title || "?").charAt(0).toUpperCase()}
                                                                                </div>
                                                                                <div>
                                                                                    <h3 className="font-bold text-gray-900 text-[15px] leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{job.title}</h3>
                                                                                    <p className="text-gray-500 text-[13px] mt-0.5">Global Client • {Math.floor(sum % 50) + 5} Applicants</p>
                                                                                </div>
                                                                            </div>
                                                                            <button className="text-gray-300 hover:text-red-500 transition-colors bg-white hover:bg-red-50 rounded-full p-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                                            </button>
                                                                        </div>

                                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                                            {(job.features?.slice(0, 3) || ['General']).map((tag, idx) => {
                                                                                const badgeColors = [
                                                                                    'bg-purple-50 text-purple-700 border-purple-100',
                                                                                    'bg-green-50 text-green-700 border-green-100',
                                                                                    'bg-orange-50 text-orange-700 border-orange-100',
                                                                                ];
                                                                                return (
                                                                                    <span key={idx} className={`px-2.5 py-1 text-[11px] font-bold rounded-md border ${badgeColors[idx % badgeColors.length]} capitalize tracking-wide`}>
                                                                                        {tag}
                                                                                    </span>
                                                                                )
                                                                            })}
                                                                        </div>

                                                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6 flex-1">{job.summary}</p>

                                                                        <div className="flex justify-between items-end pt-4 mt-auto">
                                                                            <div className="flex items-baseline gap-1">
                                                                                <span className="font-bold text-gray-900 text-lg">₹{job.price}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold">
                                                                                <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                                                Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'recently'}
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )
                                                            })}
                                                        </div>

                                                        {totalPages > 1 && (
                                                            <div className="pt-6">
                                                                <Pagination
                                                                    currentPage={currentPage}
                                                                    totalPages={totalPages}
                                                                    onPageChange={setCurrentPage}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Mock Data View for Other Tabs */
                                    <div className="space-y-8">
                                        <div className="flex max-sm:flex-col sm:items-center justify-between mb-8 gap-4">
                                            <h2 className="text-2xl md:text-[28px] font-bold text-gray-900">
                                                {activeTab === 'Ongoing' ? 'Active Projects' : activeTab === 'Bids' ? 'Your Proposals' : 'Completed Work'}
                                            </h2>
                                        </div>

                                        {mockData.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                {mockData.map((project) => {
                                                    const sum = (project.title || "").split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                                                    const colors = [
                                                        'bg-[#EBF5FF] text-[#2563EB] border-[#BFDBFE]',
                                                        'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
                                                        'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]',
                                                        'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
                                                        'bg-[#FAF5FF] text-[#9333EA] border-[#E9D5FF]',
                                                    ];
                                                    const logoColor = colors[sum % colors.length];

                                                    if (activeTab === 'Bids') {
                                                        return (
                                                            <motion.div
                                                                key={project._id}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
                                                                onClick={() => navigate(`/freelancer/jobs/${project._id}`)}
                                                                className="bg-white border text-left border-gray-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col min-h-[250px] group relative overflow-hidden"
                                                            >
                                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-80" />

                                                                <div className="flex justify-between items-start mb-5">
                                                                    <div className="pr-4">
                                                                        <h3 className="font-bold text-gray-900 text-[17px] leading-tight group-hover:text-amber-600 transition-colors line-clamp-1">{project.title || "Untitled Proposal"}</h3>
                                                                        <div className="flex items-center gap-2 mt-1.5 text-[12px] text-gray-500 font-medium">
                                                                            <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                                            Applied {new Date(project.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                        </div>
                                                                    </div>
                                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border flex items-center shrink-0 ${getStatusColor(project.status || 'pending')}`}>
                                                                        {project.status || 'Pending'}
                                                                    </span>
                                                                </div>

                                                                <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/30 rounded-xl p-4 border border-orange-100/50 mb-5 flex-1 relative">
                                                                    <div className="text-[10px] font-bold text-amber-800/70 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                                                        <FileText className="w-3.5 h-3.5" /> Proposal Excerpt
                                                                    </div>
                                                                    <p className="text-gray-700 text-[13px] line-clamp-3 italic leading-relaxed">
                                                                        "{project.coverLetter || "Your submitted proposal cover letter will appear here."}"
                                                                    </p>
                                                                </div>

                                                                <div className="flex justify-between items-end pt-2 mt-auto">
                                                                    <div className="flex flex-col gap-0.5">
                                                                        <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Your Bid Total</span>
                                                                        <span className="font-extrabold text-gray-900 text-xl tracking-tight">₹{project.bidAmount || project.price || 0}</span>
                                                                    </div>
                                                                    <button className="text-[13px] font-bold text-amber-700 group-hover:text-amber-800 bg-amber-50 group-hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors border border-amber-200/50 flex items-center gap-1.5 shadow-sm">
                                                                        Review Bid <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    }

                                                    return (
                                                        <motion.div
                                                            key={project._id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                                                            onClick={() => navigate(`/freelancer/jobs/${project._id}`)}
                                                            className="bg-white border text-left border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col min-h-[250px] group"
                                                        >
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border shrink-0 shadow-sm overflow-hidden ${logoColor}`}>
                                                                        {(project.title || "?").charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-bold text-gray-900 text-[15px] leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{project.title}</h3>
                                                                        <p className="text-gray-500 text-[13px] mt-0.5">Global Client</p>
                                                                    </div>
                                                                </div>
                                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border flex items-center shrink-0 ${getStatusColor(project.status)}`}>
                                                                    {project.status}
                                                                </span>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                <span className="px-2.5 py-1 text-[11px] font-bold rounded-md border bg-gray-50 text-gray-700 border-gray-200 capitalize tracking-wide">
                                                                    {activeTab} Role
                                                                </span>
                                                            </div>

                                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6 flex-1">
                                                                Progress updates and details about this {project.status?.toLowerCase() || ''} project can be found by opening the project portal.
                                                            </p>

                                                            <div className="flex justify-between items-end pt-4 mt-auto">
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Budget / Bid</span>
                                                                    <span className="font-bold text-gray-900 text-lg">₹{project.price || project.bidAmount || 0}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold">
                                                                    <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                                    {new Date(project.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Briefcase className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                                                <p className="text-gray-500 mt-1">You don't have any {activeTab.toLowerCase()} projects yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FreelancerJobListing;


