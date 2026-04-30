import React, { useEffect } from 'react';
import ProjectModalWrapper from './ProjectModalWrapper';
import {ExternalLink } from 'lucide-react';
import { listBidsByProject } from '../../../service/client/bid/bidService';
import type { IJob } from '../../../types/client/jobs/IJob';
import type { IBid } from '../../../types/freelancer/bid/IBid';
// import { p } from 'framer-motion/client';
// import { set } from 'react-hook-form';

interface ViewBidsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: IJob;
    onViewProposal: (bid: IBid) => void;
    refresh?: boolean;
}


const ViewBidsModal: React.FC<ViewBidsModalProps> = ({ isOpen, onClose, project, onViewProposal, refresh }) => {
    const [bids, setBids] = React.useState<IBid[]>([]);
    console.log("view bid open",project)
    useEffect(() => {
        console.log("project in bids modal", project._id)
        const fetchBids = async () => {
            if(!project?._id) return;
            try {
                setBids([]);
                console.log("woekke")
                const response=await listBidsByProject(project._id);
                console.log("bids response", response.bids)
                setBids(response.bids);
            } catch (error) {
                console.log("error in fetching bids", error)
            }
        }
        fetchBids();
    }, [project, refresh]);

    

    return (
        <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title={`Bids for "${project?.title}"`}>
            <div className="space-y-4">
                {bids.map((bid) => (
                    <div key={bid._id} className="p-4 rounded-xl border border-gray-100 hover:border-[#10C0A2]/30 hover:bg-[#10C0A2]/5 transition-all bg-gray-50/50">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                {/* <img src={bid.freelancer.avatar} alt={bid.freelancer.name} className="w-10 h-10 rounded-full border border-gray-200" /> */}
                                <div>
                                    {/* <h4 className="font-semibold text-gray-900">{bid.freelancer.name}</h4> */}
                                    {/* <p className="text-xs text-gray-500">{bid.freelancer.role}</p> */}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-lg font-bold text-[#10C0A2]">{bid.bidAmount}</span>
                                {/* <span className="text-xs text-gray-400">{bid.date}</span> */}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 bg-white p-3 rounded-lg border border-gray-100 italic">
                            "{bid.coverLetter}"
                        </p>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                {/* <span className="flex items-center gap-1"><Clock size={14} /> {bid.deliveryTime}</span> */}
                            </div>
                            <button
                                onClick={() => onViewProposal(bid)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#10C0A2] bg-white border border-[#10C0A2]/20 rounded-lg hover:bg-[#10C0A2] hover:text-white transition-colors"
                            >
                                View Proposal <ExternalLink size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                {bids.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <p>No bids received yet.</p>
                    </div>
                )}
            </div>
        </ProjectModalWrapper>
    );
};


export default ViewBidsModal;
