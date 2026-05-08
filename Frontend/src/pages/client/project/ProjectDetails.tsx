import { ArrowLeft, Clock, DollarSign, Tag, CheckCircle, Plus, Wallet, AlertCircle, Eye, ExternalLink, Briefcase, Calendar, ChevronRight, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { contractDetailService, jobViewService } from '../../../service/client/Project/jobService';
import { useEffect, useState } from 'react';
import type { IJob } from '../../../types/client/jobs/IJob';
import type { IFreelancer } from '../../../types/freelancer/Ifreelancer';
import type { IMilestone } from '../../../types/client/milestone/IMilestone';
import type { IContract } from '../../../types/client/jobs/IContract';
import { paymentMilestone } from '../../../service/client/payment/paymentService';
import { approveMilestonPaymentService, milestoneCreateService, milestoneListService, requestMilestonChangeService } from '../../../service/client/milestone/milestonService';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetails = () => {
    const navigate = useNavigate();
    const [freelancer, setFreelancer] = useState<IFreelancer>()
    const [contract, setContract] = useState<IContract>()
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

    console.log("contract", contract)
    console.log("freelancer", freelancer)
    console.log("project", project)
    const handleCreateMilestone = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !milestoneForm.title || !milestoneForm.amount) return;

        if (contract?.totalAmount) {
            const currentTotal = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
            const newAmount = Number(milestoneForm.amount);
            if (currentTotal + newAmount > contract.totalAmount) {
                const remaining = contract.totalAmount - currentTotal;
                toast.error(`Amount exceeds contract limit. Remaining allowed: $${remaining}`);
                return;
            }
        }

        try {
            setLoading(true);
            const response = await milestoneCreateService({
                jobId: id,
                title: milestoneForm.title,
                amount: Number(milestoneForm.amount)
            });
            if (response.success) {
                setMilestoneForm({ title: '', amount: '' });
                const listResponse = await milestoneListService({ jobId: id });
                if (listResponse.milestones) setMilestones(listResponse.milestones);
            }
            setMilestoneForm({ title: "", amount: "" })
            setRefreshPage(prev => !prev)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handlefundMilestone = async (milestoneId: string) => {
        try {
            const response = await paymentMilestone(milestoneId)
            if (response && response.url) {
                console.log("response of milestone fund", response.url)
                if (id) {
                    localStorage.setItem('lastFundedJobId', id);
                }
                window.location.href = response.url
            } else {
                console.error("Payment checkout failed. Response:", response);
                toast.error("Payment checkout failed. Please try again.");
            }
        } catch (error: unknown) {
            console.log(error)
            const err = error as { response?: { data?: { error?: string } } };
            const errorMsg = err.response?.data?.error || "Payment checkout failed";
            if (errorMsg.includes("must convert to at least 50 cents") || errorMsg.includes("amount_too_small")) {
                toast.error("Amount too small. The minimum payment allowed is ₹50.");
            } else {
                toast.error(typeof errorMsg === 'string' ? errorMsg : "Payment checkout failed");
            }
        }
    }

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

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'from-emerald-400 to-emerald-600';
            case 'assigned': return 'from-blue-400 to-blue-600';
            case 'closed': return 'from-gray-400 to-gray-600';
            default: return 'from-emerald-400 to-emerald-600';
        }
    };

    return (
        <div className="min-h-screen bg-[#fafcff] py-8 px-4 sm:px-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

            <div className="w-full max-w-5xl mx-auto relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors group font-medium"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Back to Projects
                </motion.button>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Project Header Card */}
                    <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-8 sm:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500"></div>

                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{project?.title}</h1>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r ${getStatusColor(project?.status)} shadow-md`}>
                                        {project?.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 flex items-center gap-2 text-sm font-medium">
                                    <Calendar size={16} className="text-emerald-500" />
                                    Posted on {project?.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Tag size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-wider mb-1">Category</p>
                                    <p className="font-bold text-gray-900 line-clamp-1">{project?.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-blue-600/70 uppercase tracking-wider mb-1">Budget</p>
                                    <p className="font-bold text-gray-900">${project?.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-purple-600/70 uppercase tracking-wider mb-1">Deadline</p>
                                    <p className="font-bold text-gray-900">{project?.deadline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Briefcase className="text-gray-400" size={20} /> Project Description
                            </h3>
                            <div className="text-gray-600 whitespace-pre-line leading-relaxed text-[15px]">
                                {project?.summary}
                            </div>
                        </div>
                    </motion.div>

                    {/* Hired Freelancer Card */}
                    {freelancer ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                    Hired Freelancer
                                </h2>
                                {contract?.totalAmount && (
                                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Contract Total</span>
                                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">${contract.totalAmount}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="relative">
                                    <img
                                        src={freelancer.profileImage || "https://ui-avatars.com/api/?name=" + freelancer.name + "&background=0D8ABC&color=fff"}
                                        alt={freelancer.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">{freelancer.name}</h3>
                                    <p className="text-gray-500 font-medium mb-3">{freelancer.email}</p>
                                    {freelancer.role && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-lg font-bold border border-blue-100/50">
                                            <User size={14} /> {freelancer.role}
                                        </span>
                                    )}
                                </div>
                                <button className="mt-4 sm:mt-0 px-6 py-3 bg-white border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 text-gray-700 rounded-xl font-bold transition-all flex items-center gap-2 group/btn">
                                    View Profile <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ) : project?.status?.toLowerCase() === 'assigned' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-8 relative overflow-hidden text-center">
                            <div className="animate-pulse flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                                <p className="text-gray-400">Loading freelancer details...</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Milestones Section */}
                    {(freelancer || project?.status?.toLowerCase() === 'assigned') && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-8 relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Project Milestones</h2>
                                    <p className="text-sm text-gray-500 font-medium">Manage and track project deliverables</p>
                                </div>
                                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 rounded-2xl shadow-lg text-white flex items-center gap-4">
                                    <span className="text-xs text-gray-300 uppercase tracking-widest font-bold">Total Milestones</span>
                                    <span className="text-xl font-black">${milestones.reduce((acc, curr) => acc + curr.amount, 0)}</span>
                                </div>
                            </div>

                            {/* Create Milestone Form */}
                            {milestones.reduce((acc, curr) => acc + curr.amount, 0) < (contract?.totalAmount || 0) && project?.status !== 'closed' && contract?.status !== 'completed' ? (
                                <div className="mb-8 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-inner">
                                    <h3 className="text-sm font-extrabold text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                                        <Plus className="text-emerald-500" size={18} /> Create New Milestone
                                    </h3>
                                    <form onSubmit={handleCreateMilestone} className="flex flex-col lg:flex-row gap-5 items-end">
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Milestone Title</label>
                                            <input
                                                type="text"
                                                value={milestoneForm.title}
                                                onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                                                placeholder="e.g. Design Phase Approval"
                                                className="w-full px-5 py-3.5 bg-white rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                                required
                                            />
                                        </div>
                                        <div className="w-full lg:w-48">
                                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Amount ($)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <DollarSign size={18} className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="number"
                                                    value={milestoneForm.amount}
                                                    onChange={(e) => setMilestoneForm({ ...milestoneForm, amount: e.target.value })}
                                                    placeholder="0.00"
                                                    className="w-full pl-10 pr-5 py-3.5 bg-white rounded-xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                                    required
                                                    min="50"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full lg:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                                        >
                                            {loading ? 'Creating...' : <><Plus size={20} /> Create</>}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-emerald-900">Budget Fully Allocated</p>
                                        <p className="text-sm text-emerald-600">The total contract amount has been reached or the project is closed. No further milestones can be created.</p>
                                    </div>
                                </div>
                            )}

                            {/* Milestones List */}
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {milestones.length > 0 ? (
                                        milestones.map((milestone, index) => (
                                            <motion.div
                                                key={milestone._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex flex-col md:flex-row items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all bg-white group"
                                            >
                                                <div className="flex items-center gap-5 mb-5 md:mb-0 w-full md:w-auto">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${milestone.status === 'funded' ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-emerald-600' :
                                                            milestone.status === 'approved' ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600' :
                                                                'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400 border border-gray-200'
                                                        }`}>
                                                        {milestone.status === 'funded' || milestone.status === 'approved' ? <Wallet size={24} /> : <AlertCircle size={24} />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <span className={`text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-bold ${milestone.status === 'funded' ? 'bg-green-100 text-green-700' :
                                                                    milestone.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                                                                        milestone.status === 'submited' ? 'bg-purple-100 text-purple-700' :
                                                                            'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {milestone.status}
                                                            </span>
                                                            <span className="text-sm font-extrabold text-gray-500 flex items-center"><DollarSign size={14} />{milestone.amount}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-auto flex flex-wrap justify-end gap-3">
                                                    {milestone.status === 'pending' && (
                                                        <button
                                                            onClick={() => handlefundMilestone(milestone._id!)}
                                                            className="flex-1 md:flex-none px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                                        >
                                                            <Wallet size={18} /> Fund Now
                                                        </button>
                                                    )}
                                                    {(milestone.status === 'funded' || milestone.status === 'submited') && (
                                                        <button
                                                            disabled={milestone.status === 'funded'}
                                                            onClick={() => milestone.status === 'submited' && setSelectedMilestone(milestone)}
                                                            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${milestone.status === 'submited'
                                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg shadow-blue-200'
                                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                }`}
                                                        >
                                                            <Eye size={18} /> Review Work
                                                        </button>
                                                    )}
                                                    {milestone.status === 'approved' && (
                                                        <div className="px-6 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-200">
                                                            <CheckCircle size={18} className="text-green-500" /> Payment Approved
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="text-center py-16 px-6 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200"
                                        >
                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Wallet size={32} className="text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">No milestones yet</h3>
                                            <p className="text-gray-500 font-medium">Create your first milestone to begin tracking progress.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* View Milestone Modal */}
            <AnimatePresence>
                {selectedMilestone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl border border-gray-100 flex flex-col gap-8"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                            <CheckCircle size={24} />
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-gray-900">Review Submission</h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 ml-11">{selectedMilestone.title}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedMilestone(null)}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
                                >
                                    <AlertCircle className="w-5 h-5 opacity-0 absolute" />
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <ExternalLink size={14} className="text-blue-500" />
                                        Task URL
                                    </label>
                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100/50">
                                        {selectedMilestone.taskUrl ? (
                                            <a
                                                href={selectedMilestone.taskUrl.startsWith('http') ? selectedMilestone.taskUrl : `https://${selectedMilestone.taskUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 hover:underline break-all font-semibold transition-colors flex items-center gap-2"
                                            >
                                                {selectedMilestone.taskUrl} <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 italic font-medium">No URL provided by freelancer</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Submission Notes</label>
                                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 whitespace-pre-wrap min-h-[120px] leading-relaxed font-medium text-[15px]">
                                        {selectedMilestone.description || 'No notes provided by the freelancer.'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setIsRequestChangeModalOpen(true)}
                                    className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all font-bold flex items-center justify-center gap-2"
                                >
                                    Request Revision
                                </button>
                                <button
                                    onClick={() => handleApproveFund(selectedMilestone._id!)}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={20} /> Approve & Release
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Request Change Modal */}
            <AnimatePresence>
                {isRequestChangeModalOpen && selectedMilestone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-gray-900">Request Revision</h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1">Specify changes needed for this milestone.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsRequestChangeModalOpen(false);
                                        setChangeReason("");
                                    }}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <form onSubmit={handleRequestChange} className="flex flex-col gap-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Feedback / Reason</label>
                                    <textarea
                                        value={changeReason}
                                        onChange={(e) => setChangeReason(e.target.value)}
                                        placeholder="Please detail what needs to be changed or improved..."
                                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all resize-none min-h-[140px] font-medium text-gray-900"
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
                                        className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-xl transition-all font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all font-bold shadow-lg shadow-yellow-200"
                                    >
                                        Send Request
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetails;
