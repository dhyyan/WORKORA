import { ArrowLeft, Clock, DollarSign, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobViewService } from '../../../service/client/Project/jobService';
import { useEffect, useState } from 'react';
import type { IJob } from '../../../types/client/jobs/IJob';

const ProjectDetails = () => {
    const navigate = useNavigate();


    const [project, setProject] = useState<IJob>()
    const { id } = useParams()
    console.log("id param", id)

    useEffect(() => {
        const viewJobDetails = async () => {
            try {
                if (!id) return;
                const response = await jobViewService({ id });
                setProject(response.job.job);
            } catch (error) {
                console.log(error);
            }
        };

        viewJobDetails();
    }, [id]);
    console.log("project", project)
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
                            <h1 className="text-2xl font-bold text-gray-900">{project?.title}</h1>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                {project?.status}
                            </span>
                        </div>
                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                            Posted {project?.createdAt?.toString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Tag size={16} /> Category
                        </div>
                        <div className="font-semibold text-gray-900">{project?.category}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <DollarSign size={16} /> Budget
                        </div>
                        <div className="font-semibold text-gray-900">{project?.price}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Clock size={16} /> Deadline
                        </div>
                        <div className="font-semibold text-gray-900">{project?.deadline}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Clock size={16} /> Duration
                        </div>
                        <div className="font-semibold text-gray-900">
                            {project?.duration}
                        </div>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {project?.summary}
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Project Features
                    </h3>

                    {project?.features && project.features.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-2 text-gray-700"
                                >
                                    <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            No features mentioned for this project.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;

