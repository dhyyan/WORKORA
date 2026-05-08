import React, { useState, useEffect } from 'react';
import ProjectModalWrapper from './ProjectModalWrapper';
import { Save } from 'lucide-react';
import { updateJob } from '../../../service/client/Project/jobService';
import { listCategoryService } from '../../../service/admin/Dashboard/client/clientService';
import type { IJob } from '../../../types/client/jobs/IJob';

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    refresh: () => void;
    project: {
        _id: string;
        title: string;
        category: string;
        price: string;
        summary: string;
        features?: string[];
    } | null;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, project, refresh }) => {
    const [jobUpdate, setJobUpdate] = useState<IJob | null>(null);
    const [newFeature, setNewFeature] = useState<string>("");
    const [availableCategories, setAvailableCategories] = useState<{ _id: string; name: string; isListed?: boolean }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await listCategoryService();
                if (response && response.categories) {
                    setAvailableCategories(response.categories.filter((cat: { isListed?: boolean }) => cat.isListed !== false));
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {

        const handleUseEffect = async () => {
            setJobUpdate(project as IJob | null);
        }
        handleUseEffect()
    }, [project]);

    if (!project || !jobUpdate) return null;
    console.log("edit project", project._id)

    // ✅ add feature
    const addFeature = (feature: string) => {
        if (!jobUpdate.features || !feature.trim()) return;
        setJobUpdate({ ...jobUpdate, features: [...jobUpdate.features, feature.trim()] });
    }



    // ✅ remove feature
    const removeFeature = (index: number) => {
        setJobUpdate({ ...jobUpdate, features: jobUpdate.features?.filter((_, i) => i !== index) });
    };
    const handleUpdateJob = async () => {
        try {
            if (!jobUpdate) return;
            const response = await updateJob(jobUpdate)
            console.log("response in update", response)

            onClose()
            refresh()
        } catch (error) {
            console.log("error in update job", error)
        }
    }

    return (
        <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Job Posting">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input
                        type="text"
                        value={jobUpdate.title}
                        onChange={(e) => setJobUpdate({ ...jobUpdate, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                        placeholder="e.g. E-commerce Website Re-design"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={jobUpdate.category}
                        onChange={(e) => setJobUpdate({ ...jobUpdate, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all bg-white"
                    >
                        <option value="">Select Category</option>
                        {availableCategories.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Budget Range</label>
                    <input
                        type="text"
                        value={jobUpdate.price}
                        onChange={(e) => setJobUpdate({ ...jobUpdate, price: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
                        placeholder="e.g. $2,500 - $4,000"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={jobUpdate.summary}
                        onChange={(e) => setJobUpdate({ ...jobUpdate, summary: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all resize-none"
                        placeholder="Describe your project..."
                    />
                </div>

                {/* Features */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Features</label>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            onChange={(e) => setNewFeature(e.target.value)}
                            value={newFeature}
                            className="flex-1 px-4 py-2 rounded-xl border"
                            placeholder="Add a feature"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                addFeature(newFeature);
                                setNewFeature("");
                            }}
                            className="px-4 py-2 bg-[#10C0A2] hover:bg-[#0EA085] text-white cursor-pointer rounded-xl"
                        >
                            Add
                        </button>
                    </div>

                    <ul className="space-y-1">

                        {jobUpdate.features?.map((feature, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded-lg"
                            >
                                <span>{feature}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="text-red-500 text-sm"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="pt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-400 hover:text-white bg-gray-100 rounded-xl transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateJob}

                        className="flex items-center gap-2 px-6 py-2.5 bg-[#10C0A2] hover:bg-[#0EA085] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
                    >

                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </form>
        </ProjectModalWrapper>
    );
};

export default EditProjectModal;
