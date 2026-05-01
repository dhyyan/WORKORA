import { useState, useEffect } from 'react';
import ProjectModalWrapper from './ProjectModalWrapper';
import { Plus, X, Calendar, DollarSign, Clock } from 'lucide-react';
import { jobCreateService } from '../../../service/client/Project/jobService';
import { listCategoryService } from '../../../service/admin/Dashboard/client/clientService';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../../../store/store';
import type { IJob } from '../../../types/client/jobs/IJob';
import SubscriptionLimitModal from '../../common/SubscriptionLimitModal';


interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    refresh: () => void;
}

const CreateProjectModal = ({ isOpen, onClose, refresh }: CreateProjectModalProps) => {
    const [features, setFeatures] = useState<string[]>([]);
    const [currentFeature, setCurrentFeature] = useState('');
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [budget, setBudget] = useState("")
    const [duration, setDuration] = useState("")
    const [summary, setSummary] = useState("")
    const [deadline, setDeadline] = useState("")
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [availableCategories, setAvailableCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await listCategoryService();
                if (response && response.categories) {
                    setAvailableCategories(response.categories.filter((cat: any) => cat.isListed !== false));
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setBudget("");
        setDuration("");
        setSummary("");
        setDeadline("");
        setFeatures([]);
        setErrors({});
        setCurrentFeature("");
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Project title is required";
        if (!category) newErrors.category = "Please select a category";
        if (!budget || Number(budget) <= 0) newErrors.budget = "Please enter a valid budget amount";
        if (!duration.trim()) newErrors.duration = "Expected duration is required";
        if (!deadline) newErrors.deadline = "Please set a deadline";
        else if (new Date(deadline) <= new Date()) newErrors.deadline = "Deadline must be a future date";
        if (!summary.trim()) newErrors.summary = "Project summary is required";
        else if (summary.trim().length < 20) newErrors.summary = "Summary must be at least 20 characters";
        if (features.length === 0) newErrors.features = "Please add at least one key skill or feature";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addFeature = () => {
        if (currentFeature.trim()) {
            setFeatures([...features, currentFeature.trim()]);
            setCurrentFeature('');
            if (errors.features) setErrors({ ...errors, features: "" });
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const user = useSelector((state: RootState) => state.clientAuth.client)

    const handleSubmitJov = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly");
            return;
        }

        setIsLoading(true);
        try {
            const data: IJob = {
                clientId: user?._id,
                title,
                category,
                price: budget,
                duration,
                deadline,
                summary,
                features,
                status: "open",
            };
            const response = await jobCreateService(data)
            
            if (response) {
                toast.success("Job posted successfully!");
                resetForm();
                refresh();
                onClose();
            }
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message;
            
            if (errorMessage?.includes("limit reached")) {
                setIsLimitModalOpen(true);
            } else {
                toast.error(errorMessage || "Failed to post job");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title="Post a New Project">
            <form className="space-y-6" onSubmit={handleSubmitJov}>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (errors.title) setErrors({ ...errors, title: "" });
                        }}
                        value={title}
                        className={`w-full px-4 py-2.5 rounded-xl border transition-all ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                        placeholder="e.g. Java Developer Needed"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Category & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (errors.category) setErrors({ ...errors, category: "" });
                            }}
                            className={`w-full px-4 py-2.5 rounded-xl border transition-all bg-white ${errors.category ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                        >
                            <option value="">Select Category</option>
                            {availableCategories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Budget ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="number"
                                onChange={(e) => {
                                    setBudget(e.target.value);
                                    if (errors.budget) setErrors({ ...errors, budget: "" });
                                }}
                                value={budget}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${errors.budget ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                                placeholder="3223"
                            />
                        </div>
                        {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                    </div>
                </div>

                {/* Duration & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Duration</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                onChange={(e) => {
                                    setDuration(e.target.value);
                                    if (errors.duration) setErrors({ ...errors, duration: "" });
                                }}
                                value={duration}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${errors.duration ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                                placeholder="e.g. 4 weeks"
                            />
                        </div>
                        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Deadline</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => {
                                    setDeadline(e.target.value);
                                    if (errors.deadline) setErrors({ ...errors, deadline: "" });
                                }}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${errors.deadline ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                            />
                        </div>
                        {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Summary</label>
                    <textarea
                        rows={4}
                        onChange={(e) => {
                            setSummary(e.target.value);
                            if (errors.summary) setErrors({ ...errors, summary: "" });
                        }}
                        value={summary}
                        className={`w-full px-4 py-2.5 rounded-xl border transition-all resize-none ${errors.summary ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                        placeholder="Need a Java developer for backend feature development..."
                    />
                    {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
                </div>

                {/* Features Tag Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Key Features / Skills</label>
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {features.map((feature, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {feature}
                                <button type="button" onClick={() => removeFeature(index)} className="hover:text-red-500"><X size={14} /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={currentFeature}
                            onChange={(e) => setCurrentFeature(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                            className={`flex-1 px-4 py-2.5 rounded-xl border transition-all ${errors.features ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none'}`}
                            placeholder="Add a skill or feature (e.g. Spring Boot)..."
                        />
                        <button
                            type="button"
                            onClick={addFeature}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-[#10C0A2] hover:bg-[#0EA085] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Posting..." : "Post Job"}
                    </button>
                </div>
            </form>
            <SubscriptionLimitModal 
                isOpen={isLimitModalOpen}
                onClose={() => setIsLimitModalOpen(false)}
                title="Free Job Limit Reached"
                description="You've posted 5 free jobs. Upgrade to Workora Pro to post unlimited jobs and reach more talented freelancers."
                role="client"
            />
        </ProjectModalWrapper>

    );
};

export default CreateProjectModal;
