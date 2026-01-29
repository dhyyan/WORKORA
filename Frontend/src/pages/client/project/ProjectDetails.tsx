import React from 'react';
import { ArrowLeft, DollarSign, Tag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectDetails: React.FC = () => {
    const navigate = useNavigate();

    // Dummy Data - In real app, fetch by ID
    const project = {
        title: "E-commerce Website Re-design",
        description: "We are looking for an experienced UI/UX designer to redesign our core e-commerce platform with a focus on mobile conversion. The current site is built on Shopify but we are moving to a custom React-based solution. The ideal candidate should have a strong portfolio in e-commerce and a deep understanding of conversion rate optimization principles.\n\nKey Responsibilities:\n1. Conduct user research and analyze current pain points.\n2. Create wireframes and high-fidelity mockups for all core pages (Home, Category, Product, Cart, Checkout).\n3. Develop a comprehensive design system.\n\nRequirements:\n- 5+ years of experience in UI/UX design.\n- Proficiency in Figma and Adobe Suite.\n- Experience with e-commerce platforms.",
        category: "Web Design",
        budget: "$2,500 - $4,000",
        postedDate: "2 days ago",
        status: "Open",
        deadline: "30 Days"
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Projects
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                {project.status}
                            </span>
                        </div>
                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                            Posted {project.postedDate}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Tag size={16} /> Category
                        </div>
                        <div className="font-semibold text-gray-900">{project.category}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <DollarSign size={16} /> Budget
                        </div>
                        <div className="font-semibold text-gray-900">{project.budget}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Clock size={16} /> Deadline
                        </div>
                        <div className="font-semibold text-gray-900">{project.deadline}</div>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {project.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
