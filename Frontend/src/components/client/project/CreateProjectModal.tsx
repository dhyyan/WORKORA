import { useState } from 'react';
import ProjectModalWrapper from './ProjectModalWrapper';
import { Plus, X, Calendar, DollarSign, Clock } from 'lucide-react';
import { jobCreateService } from '../../../service/client/Project/jobService';
import { createSubscriptionSession } from '../../../service/subscription/subscriptionService';
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


    const addFeature = () => {
        if (currentFeature.trim()) {
            setFeatures([...features, currentFeature.trim()]);
            setCurrentFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };
    console.log("job data", features)
    const user = useSelector((state: RootState) => state.clientAuth.client)
    console.log("job creating user details", user)

    const handleSubmitJov = async () => {
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
                refresh();
                onClose();
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message;
            
            if (errorMessage?.includes("limit reached")) {
                setIsLimitModalOpen(true);
            } else {
                toast.error(errorMessage || "Failed to post job");
            }

        }
    }
    return (
        <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title="Post a New Project">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                        placeholder="e.g. Java Developer Needed"
                    />
                </div>

                {/* Category & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="development">Development</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Budget ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="number"
                                onChange={(e) => setBudget(e.target.value)}
                                value={budget}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                                placeholder="3223"
                            />
                        </div>
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
                                onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                                placeholder="e.g. 4 weeks"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Deadline</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="date"
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Summary</label>
                    <textarea
                        rows={4}
                        onChange={(e) => setSummary(e.target.value)}
                        value={summary}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all resize-none"
                        placeholder="Need a Java developer for backend feature development..."
                    />
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
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
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
                        onClick={handleSubmitJov}
                        className="flex items-center gap-2 px-8 py-2.5 bg-[#10C0A2] hover:bg-[#0EA085] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                    >
                        Post Job
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
