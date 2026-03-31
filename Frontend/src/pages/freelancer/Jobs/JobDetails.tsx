
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, Calendar } from 'lucide-react';
import { fetchJobById, milestoneListService } from '../../../service/freelancer/Jobs/JobService';
import Navbar from '../../../components/freelancer/DashBoard/Navbar';
import type { IJob } from '../../../types/client/jobs/IJob';
import ApplyBidModal from './ApplyBidModal';
import toast from 'react-hot-toast';
import { createBidService } from '../../../service/freelancer/bid/bidService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { AxiosError } from 'axios';
import type { IMilestone, SubmitMiestone } from '../../../types/client/milestone/IMilestone';
import SubmitWorkModal from './SubmitWorkModal';
import { submitMilestoneService } from '../../../service/freelancer/milestone/milestoneService';
import type { IUser } from '../../../types/auth/IUser';

const JobDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<IJob | null>(null);
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [milestones, setMilestones] = useState<IMilestone[]>([])
    const [isSubmitWorkModalOpen, setIsSubmitWorkModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | null>(null);
    const [refresh, setRefresh] = useState(false)

    const userData = useSelector((state: RootState) => state.freelancerAuth.freelancer);

    //list job refresh
    useEffect(() => {
        const loadJob = async () => {
            if (!id) return;
            try {
                const data = await fetchJobById(id);
                // Handle different response structures gracefully
                const jobData = data?.response || data?.job || data;
                setJob(jobData.jobDetail);
                setUser(jobData.user)
            } catch (err) {
                console.error(err);
                setError('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };
        loadJob();
    }, [id]);
    console.log("jobbbe", job)


    //list milestone 
    useEffect(() => {
        const listMilestone = async () => {
            if (!id) return
            try {
                const response = await milestoneListService({ jobId: id })
                console.log("response of milestone", response)
                setMilestones(response.milestones)
            } catch (error) {
                console.error(error);
                setError('Failed to load job details');
            }
        }

        listMilestone()
    }, [id])



    const handleSubmitProposal = async (data: { coverLetter: string; bidAmount: string }) => {
        console.log("Proposal Submitted:", data);
        try {
            if (!userData || !userData._id) {
                toast.error("Please login to apply for a job.");
                return;
            }
            const response = await createBidService({
                jobId: id!,
                freelancerId: userData?._id, // This should come from authenticated user context
                coverLetter: data.coverLetter,
                bidAmount: parseFloat(data.bidAmount),
            });
            console.log("response create bid", response)
            toast.success("Proposal sent successfully!");

        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>

            const message = axiosError.response?.data?.message || "Failed to hire freelancer"

            toast.error(message)
        }
        // Here you would typically call an API to submit the proposal
    };

    const handleSubmitWork = async (data: SubmitMiestone) => {
        try {
            const response = await submitMilestoneService(data)
            console.log('response of submit milestone', response)
            setRefresh(true)

        } catch (error) {

            console.log("error while submit milestone ", error);
        }
    };

    //page refresh
    useEffect(() => {
        setRefresh(false)
    }, [refresh])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
                <p className="text-red-500 font-medium">{error || 'Job not found'}</p>
                <button
                    onClick={() => navigate('/jobs')}
                    className="text-emerald-600 hover:underline"
                >
                    Back to Jobs
                </button>
            </div>
        );
    }
    console.log("mileee", milestones)
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Jobs</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Job Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-1.5">
                                    <div className="p-1.5 bg-emerald-50 rounded-full text-emerald-600">
                                        <FolderIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-medium text-gray-700">{job.category}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="p-1.5 bg-blue-50 rounded-full text-blue-600">
                                        <Clock className="w-3.5 h-3.5" />
                                    </div>
                                    <span>Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'recently'}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {(job.skill || []).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Job Description</h3>
                                <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {job.summary}
                                </div>
                            </div>

                            {job.features && job.features.length > 0 && (
                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Requirements</h3>
                                    <ul className="space-y-3">
                                        {job.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-600">
                                                <div className="mt-1.5 min-w-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Milestones Card */}
                        {milestones && milestones.length > 0 && (
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Milestones</h3>
                                <div className="space-y-4">
                                    {milestones.map((milestone) => (
                                        <div key={milestone._id || milestone.title} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                                            <div className="space-y-1">
                                                <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="text-emerald-600 font-medium">${milestone.amount}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${milestone.status === 'funded' ? 'bg-blue-100 text-blue-700' :
                                                        milestone.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                            milestone.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {milestone.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {milestone.status === 'rejected' ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedMilestone(milestone);
                                                        setIsRejectModalOpen(true);
                                                    }}
                                                    className="px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all focus:ring-2 focus:outline-none bg-red-600 hover:bg-red-700 text-white shadow-red-200 hover:shadow-red-300 active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    View
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        if (milestone.status === 'funded') {
                                                            setSelectedMilestone(milestone);
                                                            setIsSubmitWorkModalOpen(true);
                                                        }
                                                    }}
                                                    disabled={milestone.status === 'pending' || milestone.status === 'submited' || milestone.status === 'approved' || milestone.status === 'released'}
                                                    className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all focus:ring-2 focus:outline-none ${milestone.status === 'funded'
                                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 hover:shadow-emerald-300 active:scale-95'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    Submit Work
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Client & Action */}
                    <div className="space-y-6">

                        {/* Action Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-emerald-600" />
                                        <span className="text-gray-600 text-sm font-medium">Budget</span>
                                    </div>
                                    <span className="text-gray-900 font-bold">{job.price}</span>
                                </div>

                                {job.duration && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            <span className="text-gray-600 text-sm font-medium">Duration</span>
                                        </div>
                                        <span className="text-gray-900 font-bold">{job.duration}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setIsApplyModalOpen(true)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
                            >
                                Apply Bid
                            </button>
                        </div>

                        {/* Client Details Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">About the Client</h3>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-12 bg-gradient-to-br  to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                        <img src={user?.profileImage} alt="" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Client Info</p>
                                        {/* <p className="text-xs text-gray-500">Member since 2024</p> */}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        {/* <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> */}
                                        <span className="font-medium">{user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        {/* <MapPin className="w-4 h-4 text-gray-400" /> */}
                                        <span>{user?.email} </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        {/* <Shield className="w-4 h-4 text-emerald-500" /> */}
                                        <span className="text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded-full">{user?.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Apply Bid Modal */}
                {job && (
                    <ApplyBidModal
                        isOpen={isApplyModalOpen}
                        onClose={() => setIsApplyModalOpen(false)}
                        jobTitle={job.title}
                        jobBudget={job.price}
                        onSubmit={handleSubmitProposal}
                    />
                )}

                {/* Submit Work Modal */}
                {selectedMilestone && (
                    <SubmitWorkModal
                        isOpen={isSubmitWorkModalOpen}
                        onClose={() => setIsSubmitWorkModalOpen(false)}
                        milestoneTitle={selectedMilestone.title}
                        milestoneId={selectedMilestone._id!}
                        onSubmit={handleSubmitWork}
                    />
                )}

                {/* Reject Reason Modal */}
                {isRejectModalOpen && selectedMilestone && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl border border-gray-100 flex flex-col gap-6 transform transition-all">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Changes Requested</h3>
                                    <p className="text-sm text-gray-500 mt-1">{selectedMilestone.title}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsRejectModalOpen(false);
                                        setSelectedMilestone(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <span className="text-xl font-bold">&times;</span>
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for modification</label>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-gray-700 whitespace-pre-wrap min-h-[100px] leading-relaxed">
                                    {selectedMilestone.reason || 'No reason provided by the client.'}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                                <button
                                    onClick={() => {
                                        setIsRejectModalOpen(false);
                                        setSelectedMilestone(null);
                                        console.log("Raise Dispute clicked for", selectedMilestone._id);
                                    }}
                                    className="px-6 py-2.5 border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold flex items-center justify-center"
                                >
                                    Raise Dispute
                                </button>
                                <button
                                    onClick={() => {
                                        setIsRejectModalOpen(false);
                                        setIsSubmitWorkModalOpen(true);
                                    }}
                                    className="px-6 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all font-semibold shadow-sm hover:shadow-md flex items-center justify-center"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// Helper icon component since Folder is not imported
const FolderIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /></svg>
);

export default JobDetails;
