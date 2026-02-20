import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProjectListHeader from '../../../components/client/project/ProjectListHeader';
import ProjectCard from '../../../components/client/project/ProjectCard';
import ProjectListEmptyState from '../../../components/client/project/ProjectListEmptyState';
import EditProjectModal from '../../../components/client/project/EditProjectModal';
import ViewBidsModal from '../../../components/client/project/ViewBidsModal';
import CreateProjectModal from '../../../components/client/project/CreateProjectModal';
import ViewProposalModal from '../../../components/client/project/ViewProposalModal';
import type { IJob } from '../../../types/client/jobs/IJob';
import { jobListService, assignedJobService } from '../../../service/client/Project/jobService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { IBid } from '../../../types/freelancer/bid/IBid';

const ProjectList = () => {
    const navigate = useNavigate();
    // Toggle this to see empty state during development
    const [projects, setProjects] = useState<IJob[]>([])
    const [assignedProjects, setAssignedProjects] = useState<IJob[]>([])
    const user = useSelector((state: RootState) => state.clientAuth.client)
    const [refresh, setRefresh] = useState(false)

    // Tab State
    const tabs = ['All Jobs', 'Assigned Jobs'];
    const [activeTab, setActiveTab] = useState('All Jobs');
    const [isTabLoading, setIsTabLoading] = useState(false);

    // Modal State
    const [selectedProject, setSelectedProject] = useState<IJob | null>(null);
    const [selectedBid, setSelectedBid] = useState<IBid | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleEdit = (project: IJob) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const handleViewBids = (project: IJob) => {
        console.log("called bid")
        setSelectedProject(project);
        setIsBidsModalOpen(true);
    };

    const handleViewDetails = (id: string) => {
        navigate(`/client/profile/projects/${id}`);
    };


    const handleViewProposal = (bid: IBid) => {
        setSelectedBid(bid);
        setIsProposalModalOpen(true);
        // Note: ViewBidsModal stays open in the background, optional: close it if required
    };

    useEffect(() => {
        const refreshData = async () => {

            if (!user?._id) return;
            const id = user._id
            try {
                const response = await jobListService({ id });
                console.log("ress", response)
                setProjects(response.jobs.jobs);

                const assignedRess = await assignedJobService(id);
                console.log("assignedRess", assignedRess);
                if (assignedRess?.jobs) {
                    setAssignedProjects(assignedRess.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        setRefresh(false);
        refreshData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const handleTabChange = (tab: string) => {
        if (tab === activeTab) return;
        setIsTabLoading(true);
        setActiveTab(tab);

        // Simulate loading effect
        setTimeout(() => {
            setIsTabLoading(false);
        }, 500);
    };

    console.log("dataaa", projects)
    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto">
                <ProjectListHeader onCreate={() => setIsCreateModalOpen(true)} />

                {/* Tab Switcher */}
                <div className="mb-6 flex space-x-8 border-b border-gray-200">
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
                                    layoutId="activeTabClient"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
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
                                {activeTab === 'All Jobs' ? (
                                    projects.length > 0 ? (
                                        <div className="space-y-4">
                                            {projects.map((project) => (
                                                <ProjectCard
                                                    key={project._id}
                                                    _id={project._id!}
                                                    title={project.title}
                                                    description={project.summary}
                                                    category={project.category}
                                                    budget={project.price}
                                                    status={project.status ?? "open"}
                                                    postedDate={project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
                                                    onViewDetails={() => {
                                                        if (project._id) {
                                                            handleViewDetails(project._id);
                                                        }
                                                    }}
                                                    refresh={() => setRefresh(prev => !prev)}
                                                    onEdit={() => handleEdit(project)}
                                                    onBids={() => handleViewBids(project)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <ProjectListEmptyState />
                                    )
                                ) : (
                                    /* Assigned Jobs Tab */
                                    assignedProjects.length > 0 ? (
                                        <div className="space-y-4">
                                            {assignedProjects.map((project) => (
                                                <ProjectCard
                                                    key={project._id}
                                                    _id={project._id!}
                                                    title={project.title}
                                                    description={project.summary}
                                                    category={project.category}
                                                    budget={project.price}
                                                    status={project.status!}
                                                    postedDate={project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
                                                    onViewDetails={() => {
                                                        if (project._id) {
                                                            handleViewDetails(project._id);
                                                        }
                                                    }}
                                                    refresh={() => setRefresh(prev => !prev)}
                                                    onEdit={() => { }}
                                                    onBids={() => { }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <ProjectListEmptyState />
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Modals */}
                <CreateProjectModal
                    isOpen={isCreateModalOpen}
                    refresh={() => setRefresh(true)}
                    onClose={() => setIsCreateModalOpen(false)}
                />

                <EditProjectModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    refresh={() => setRefresh(true)}
                    project={
                        selectedProject
                            ? {
                                _id: selectedProject._id ?? '',
                                title: selectedProject.title,
                                category: selectedProject.category,
                                price: selectedProject.price,
                                summary: selectedProject.summary,
                                features: selectedProject.features,
                            }
                            : null
                    }
                />

                {selectedProject && (
                    <ViewBidsModal
                        isOpen={isBidsModalOpen}
                        onClose={() => setIsBidsModalOpen(false)}
                        project={selectedProject}
                        onViewProposal={handleViewProposal}
                    />
                )}

                {selectedBid && (
                    <ViewProposalModal
                        isOpen={isProposalModalOpen}
                        onClose={() => setIsProposalModalOpen(false)}
                        bid={selectedBid}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectList;
