import React from 'react';
import { Briefcase, Plus } from 'lucide-react';

interface ProjectListEmptyStateProps {
    title?: string;
    description?: string;
    showButton?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
}

const ProjectListEmptyState: React.FC<ProjectListEmptyStateProps> = ({
    title = "You haven't posted any jobs yet",
    description = "Get started by creating your first job posting to find the perfect freelancer for your project.",
    showButton = true,
    buttonText = "Create Your First Job",
    onButtonClick
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-8 max-w-sm">
                {description}
            </p>
            {showButton && (
                <button
                    onClick={onButtonClick}
                    className="flex items-center gap-2 px-6 py-3 bg-[#10C0A2] hover:bg-[#0EA085] text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/20 active:scale-95"
                >
                    <Plus size={20} />
                    <span>{buttonText}</span>
                </button>
            )}
        </div>
    );
};

export default ProjectListEmptyState;
