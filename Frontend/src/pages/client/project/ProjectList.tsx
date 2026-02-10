import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectListHeader from '../../../components/client/project/ProjectListHeader';
import ProjectCard from '../../../components/client/project/ProjectCard';
import ProjectListEmptyState from '../../../components/client/project/ProjectListEmptyState';
import EditProjectModal from '../../../components/client/project/EditProjectModal';
import ViewBidsModal from '../../../components/client/project/ViewBidsModal';
import CreateProjectModal from '../../../components/client/project/CreateProjectModal';
import ViewProposalModal from '../../../components/client/project/ViewProposalModal';
import type { IJob } from '../../../types/client/jobs/IJob';
import { jobListService } from '../../../service/client/Project/jobService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { IBid } from '../../../types/freelancer/bid/IBid';





const ProjectList = () => {
    const navigate = useNavigate();
    // Toggle this to see empty state during development
    const [projects, setProjects] = useState<IJob[]>([])
    const user = useSelector((state: RootState) => state.clientAuth.client)
    const [refresh, setRefresh] = useState(false)

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
            } catch (error) {
                console.log(error);
            }
        };
        setRefresh(false);
        refreshData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    console.log("dataaa", projects)
    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto">
                <ProjectListHeader onCreate={() => setIsCreateModalOpen(true)} />

                {projects.length > 0 ? (
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
                )}

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
