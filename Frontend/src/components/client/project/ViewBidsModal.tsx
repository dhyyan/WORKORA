// import React from 'react';
// import ProjectModalWrapper from './ProjectModalWrapper';
// import { Clock, ExternalLink } from 'lucide-react';

// interface ViewBidsModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     project: any;
//     onViewProposal: (bid: any) => void;
// }

// // Dummy Bids Data
// const DUMMY_BIDS = [
//     {
//         id: 1,
//         freelancer: {
//             name: "Sarah Jenkins",
//             role: "Senior UX Designer",
//             avatar: "https://i.pravatar.cc/150?u=1",
//             rating: 4.9
//         },
//         bidAmount: "$3,200",
//         deliveryTime: "30 Days",
//         proposal: "Hi, I have extensive experience in e-commerce redesigns. I can ensure a mobile-first approach that boosts conversion...",
//         date: "2 hours ago"
//     },
//     {
//         id: 2,
//         freelancer: {
//             name: "Michael Chen",
//             role: "Full Stack Developer",
//             avatar: "https://i.pravatar.cc/150?u=2",
//             rating: 4.7
//         },
//         bidAmount: "$2,800",
//         deliveryTime: "21 Days",
//         proposal: "I've built 50+ Shopify themes and custom React storefronts. I'm available to start immediately.",
//         date: "5 hours ago"
//     }
// ];

// const ViewBidsModal: React.FC<ViewBidsModalProps> = ({ isOpen, onClose, project, onViewProposal }) => {
//     return (
//         <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title={`Bids for "${project?.title}"`}>
//             <div className="space-y-4">
//                 {DUMMY_BIDS.map((bid) => (
//                     <div key={bid.id} className="p-4 rounded-xl border border-gray-100 hover:border-[#10C0A2]/30 hover:bg-[#10C0A2]/5 transition-all bg-gray-50/50">
//                         <div className="flex justify-between items-start mb-3">
//                             <div className="flex items-center gap-3">
//                                 <img src={bid.freelancer.avatar} alt={bid.freelancer.name} className="w-10 h-10 rounded-full border border-gray-200" />
//                                 <div>
//                                     <h4 className="font-semibold text-gray-900">{bid.freelancer.name}</h4>
//                                     <p className="text-xs text-gray-500">{bid.freelancer.role}</p>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <span className="block text-lg font-bold text-[#10C0A2]">{bid.bidAmount}</span>
//                                 <span className="text-xs text-gray-400">{bid.date}</span>
//                             </div>
//                         </div>

//                         <p className="text-sm text-gray-600 line-clamp-2 mb-3 bg-white p-3 rounded-lg border border-gray-100 italic">
//                             "{bid.proposal}"
//                         </p>

//                         <div className="flex items-center justify-between pt-2">
//                             <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
//                                 <span className="flex items-center gap-1"><Clock size={14} /> {bid.deliveryTime}</span>
//                             </div>
//                             <button
//                                 onClick={() => onViewProposal(bid)}
//                                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#10C0A2] bg-white border border-[#10C0A2]/20 rounded-lg hover:bg-[#10C0A2] hover:text-white transition-colors"
//                             >
//                                 View Proposal <ExternalLink size={12} />
//                             </button>
//                         </div>
//                     </div>
//                 ))}

//                 {DUMMY_BIDS.length === 0 && (
//                     <div className="text-center py-10 text-gray-400">
//                         <p>No bids received yet.</p>
//                     </div>
//                 )}
//             </div>
//         </ProjectModalWrapper>
//     );
// };


// export default ViewBidsModal;
