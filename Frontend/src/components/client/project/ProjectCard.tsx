import React from 'react';
import { Eye, FileText, Edit, XCircle } from 'lucide-react';
import { deleteJob } from '../../../service/client/Project/jobService';

interface ProjectCardProps {
    _id:string,
    title: string;
    description: string;
    category: string;
    budget: string;
    status: "open" | "assigned" | "close";
    postedDate: string;
    onViewDetails: () => void;
    onEdit: () => void;
    refresh: () => void;
    // onBids: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    _id,
    title,
    description,
    category,
    budget,
    status,
    postedDate,
    onViewDetails,
    onEdit,
    refresh
    // onBids
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Assigned':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Closed':
                return 'bg-gray-100 text-gray-600 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };
    const hanleDeleteJob = async() => {
        console.log("delete job called")
        try {
            console.log("keyyy",_id)
            if(!_id) return;
            const response = await deleteJob({_id:_id})

            console.log("response in delete", response)
            // onClose()
            refresh()            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white rounded-2xl p-6 mb-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-nowrap">
                <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-1">{description}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">{budget}</p>
                    <p className="text-xs text-gray-400 mt-1">Posted {postedDate}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-50 gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                    {category}
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <button
                        onClick={onViewDetails}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        <Eye size={16} />
                        <span>View Details</span>
                    </button>
                    <button
                        // onClick={onBids}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        <FileText size={16} />
                        <span>View Bids</span>
                    </button>
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </button>
                    <button
                    onClick={hanleDeleteJob}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
                        <XCircle size={16} />
                        <span>Close Job</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
