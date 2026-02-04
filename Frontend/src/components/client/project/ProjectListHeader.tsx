import { Plus } from 'lucide-react';

interface ProjectListHeaderProps {
    onCreate: () => void;
}

const ProjectListHeader = ({ onCreate }:ProjectListHeaderProps) => {
    
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                <p className="text-sm text-gray-500 mt-1">Manage all your active and closed job postings</p>
            </div>
            <button
                onClick={onCreate}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#10C0A2] hover:bg-[#0EA085] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
                <Plus size={18} />
                <span>Create Job</span>
            </button>
        </div>
    );
};

export default ProjectListHeader;
