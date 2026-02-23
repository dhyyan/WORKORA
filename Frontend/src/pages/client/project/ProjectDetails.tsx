import { ArrowLeft, Clock, DollarSign, Tag, CheckCircle, Plus, Wallet, AlertCircle, Eye, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { contractDetailService, jobViewService } from '../../../service/client/Project/jobService';
import { useEffect, useState } from 'react';
import type { IJob } from '../../../types/client/jobs/IJob';
import type { IFreelancer } from '../../../types/freelancer/Ifreelancer';
import type { IMilestone } from '../../../types/client/milestone/IMilestone';
import type { IContract } from '../../../types/client/jobs/IContract';
import { paymentMilestone } from '../../../service/client/payment/paymentService';
import { approveMilestonPaymentService, milestoneCreateService, milestoneListService, requestMilestonChangeService } from '../../../service/client/milestone/milestonService';

const ProjectDetails = () => {
    const navigate = useNavigate();
    const [freelancer, setFreelancer] = useState<IFreelancer>()
    const [contract, setContract] = useState<IContract>() // Using any for now or define interface if known
    const [project, setProject] = useState<IJob>()
    const [milestones, setMilestones] = useState<IMilestone[]>([])
    const [milestoneForm, setMilestoneForm] = useState({ title: '', amount: '' })
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | null>(null);
    const [isRequestChangeModalOpen, setIsRequestChangeModalOpen] = useState(false);
    const [changeReason, setChangeReason] = useState("");

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

        const viewContractDetails = async () => {
            try {
                if (!id) return;
                const response = await contractDetailService({ _id: id })
                setFreelancer(response.freelancer)
                setContract(response.contract)
            } catch (error) {
                console.log(error)
            }
        }

        const fetchMilestones = async () => {
            try {
                if (!id) return;
                const response = await milestoneListService({ jobId: id })
                if (response.milestones) setMilestones(response.milestones)
            } catch (error) {
                console.log(error)
            }
        }

        viewJobDetails();
        viewContractDetails();
        fetchMilestones();
    }, [id, refreshPage]);

    const handleCreateMilestone = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !milestoneForm.title || !milestoneForm.amount) return;

        try {
            setLoading(true);
            const response = await milestoneCreateService({
                jobId: id,
                title: milestoneForm.title,
                amount: Number(milestoneForm.amount)
            });
            if (response.success) {
                setMilestoneForm({ title: '', amount: '' });
                // Refresh list
                const listResponse = await milestoneListService({ jobId: id });
                if (listResponse.milestones) setMilestones(listResponse.milestones);
            }
            setMilestoneForm({ title: "", amount: "" })
            setRefreshPage(true)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handlefundMilestone = async (milestoneId: string) => {
        try {
            const response = await paymentMilestone(milestoneId)
            console.log("response of milestone fund", response.url)
            window.location.href = response.url
        } catch (error) {
            console.log(error)
        }
    }

    //handle approve milestone fund
    const handleApproveFund = async (milestoneId: string) => {
        try {
            const response = await approveMilestonPaymentService(milestoneId)
            console.log("response of approve milestone", response)
            setSelectedMilestone(null);
            setRefreshPage(prev => !prev);
        } catch (error) {
            console.log("error while approve milestone fund", error)
        }
    }

    //handle request milestone change
    const handleRequestChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMilestone?._id || !changeReason.trim()) return;
        try {
            const response = await requestMilestonChangeService({ milestoneId: selectedMilestone._id, reason: changeReason })
            console.log("response of request change milestone", response)
            setIsRequestChangeModalOpen(false);
            setSelectedMilestone(null);
            setChangeReason("");
            setRefreshPage(prev => !prev);
        } catch (error) {
            console.log("error while request change milestone ", error)
        }
    }



    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Projects
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">{project?.title}</h1>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 uppercase">
                                {project?.status}
                            </span>
                        </div>
                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                            Posted {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
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
                        <div className="font-semibold text-gray-900">${project?.price}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-1 text-sm">
                            <Clock size={16} /> Deadline
                        </div>
                        <div className="font-semibold text-gray-900">{project?.deadline}</div>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {project?.summary}
                    </div>
                </div>
            </div>

            {freelancer && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle className="text-green-500" /> Hired Freelancer
                        </h2>
                        {contract?.totalAmount && (
                            <div className="text-right">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Contract Amount</span>
                                <p className="text-xl font-bold text-gray-900">${contract.totalAmount}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <img
                            src={freelancer.profileImage || "https://ui-avatars.com/api/?name=" + freelancer.name}
                            alt={freelancer.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
                            <p className="text-gray-500">{freelancer.email}</p>
                            {freelancer.role && (
                                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                                    {freelancer.role}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {freelancer && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Project Milestones</h2>
                        <div className="text-sm text-gray-500">
                            Total: ${milestones.reduce((acc, curr) => acc + curr.amount, 0)}
                        </div>
                    </div>

                    {/* Create Milestone Form */}
                    <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Create New Milestone</h3>
                        <form onSubmit={handleCreateMilestone} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={milestoneForm.title}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                                    placeholder="e.g. Phase 1 Completion"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
                                <input
                                    type="number"
                                    value={milestoneForm.amount}
                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                    min="1"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : <><Plus size={18} /> Create</>}
                            </button>
                        </form>
                    </div>

                    {/* Milestones List */}
                    <div className="space-y-4">
                        {milestones.length > 0 ? (
                            milestones.map((milestone) => (
                                <div key={milestone._id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${milestone.status === 'funded' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {milestone.status === 'funded' ? <Wallet size={20} /> : <AlertCircle size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${milestone.status === 'funded' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                                    }`}>
                                                    {milestone.status}
                                                </span>
                                                <span className="text-sm font-medium text-gray-700">${milestone.amount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {milestone.status === 'pending' && (
                                        <button
                                            onClick={() => handlefundMilestone(milestone._id!)}
                                            className="w-full md:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Wallet size={16} /> Fund Milestone
                                        </button>
                                    )}
                                    {(milestone.status === 'funded' || milestone.status === 'submited') && (
                                        <button
                                            disabled={milestone.status === 'funded'}
                                            onClick={() => milestone.status === 'submited' && setSelectedMilestone(milestone)}
                                            className={`w-full md:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${milestone.status === 'submited'
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                                : 'bg-blue-300 text-white cursor-not-allowed opacity-70'
                                                }`}
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    )}
                                    {milestone.status === 'approved' && (
                                        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                                            <CheckCircle size={16} /> Approved
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p>No milestones created yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* View Milestone Modal */}
            {selectedMilestone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl border border-gray-100 flex flex-col gap-6 transform transition-all">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Milestone Submission</h3>
                                <p className="text-sm text-gray-500 mt-1">{selectedMilestone.title}</p>
                            </div>
                            <button
                                onClick={() => setSelectedMilestone(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                            >
                                <AlertCircle className="w-5 h-5 opacity-0" />
                                <span className="absolute top-10 right-10 text-xl font-bold">&times;</span>
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <ExternalLink size={16} className="text-blue-500" />
                                Task URL
                            </label>
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                {selectedMilestone.taskUrl ? (
                                    <a
                                        href={selectedMilestone.taskUrl.startsWith('http') ? selectedMilestone.taskUrl : `https://${selectedMilestone.taskUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 hover:underline break-all font-medium transition-colors"
                                    >
                                        {selectedMilestone.taskUrl}
                                    </a>
                                ) : (
                                    <span className="text-gray-500 italic">No URL provided</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 whitespace-pre-wrap min-h-[100px] leading-relaxed">
                                {selectedMilestone.description || 'No description provided'}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                            <button
                                onClick={() => setIsRequestChangeModalOpen(true)}
                                className="px-6 py-2.5 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all font-semibold flex items-center justify-center"
                            >
                                Request Change
                            </button>
                            <button
                                onClick={() => handleApproveFund(selectedMilestone._id!)}
                                className="px-6 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-xl transition-all font-semibold shadow-sm hover:shadow-md flex items-center justify-center"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Change Modal */}
            {isRequestChangeModalOpen && selectedMilestone && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-100 flex flex-col gap-6 transform transition-all">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Request Change</h3>
                                <p className="text-sm text-gray-500 mt-1">Specify changes for the submitted milestone.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsRequestChangeModalOpen(false);
                                    setChangeReason("");
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                            >
                                <span className="text-xl font-bold">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={handleRequestChange} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                                <textarea
                                    value={changeReason}
                                    onChange={(e) => setChangeReason(e.target.value)}
                                    placeholder="Enter the requested changes..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none min-h-[120px]"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsRequestChangeModalOpen(false);
                                        setChangeReason("");
                                    }}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all font-semibold shadow-sm"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;


