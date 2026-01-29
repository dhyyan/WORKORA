// import React from 'react';
// import ProjectModalWrapper from './ProjectModalWrapper';
// import { Clock, CheckCircle, XCircle } from 'lucide-react';

// interface ViewProposalModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     bid: any;
// }

// const ViewProposalModal: React.FC<ViewProposalModalProps> = ({ isOpen, onClose, bid }) => {
//     if (!bid) return null;

//     return (
//         <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title="Proposal Details">
//             <div className="space-y-6">

//                 {/* Freelancer Header */}
//                 <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
//                     <img src={bid.freelancer.avatar} alt={bid.freelancer.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
//                     <div>
//                         <h3 className="text-xl font-bold text-gray-900">{bid.freelancer.name}</h3>
//                         <p className="text-gray-500">{bid.freelancer.role}</p>
//                         <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
//                             <span>⭐ {bid.freelancer.rating}</span>
//                             <span>•</span>
//                             <span>{bid.date}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bid Details */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
//                         <span className="block text-sm text-gray-500 mb-1">Bid Amount</span>
//                         <span className="text-xl font-bold text-[#10C0A2]">{bid.bidAmount}</span>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
//                         <span className="block text-sm text-gray-500 mb-1">Delivery Time</span>
//                         <span className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
//                             <Clock size={18} className="text-gray-400" />
//                             {bid.deliveryTime}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Cover Letter */}
//                 <div>
//                     <h4 className="font-semibold text-gray-900 mb-2">Cover Letter</h4>
//                     <div className="p-5 bg-white rounded-xl border border-gray-100 text-gray-600 leading-relaxed text-sm shadow-sm">
//                         {bid.proposal}
//                         <br /><br />
//                         <p>I am confident that I can deliver this project within the timeline and exceed your expectations. Looking forward to discussing this further.</p>
//                     </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-4 pt-4">
//                     <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-100 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors">
//                         <XCircle size={20} />
//                         Decline
//                     </button>
//                     <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#10C0A2] hover:bg-[#0EA085] text-white rounded-xl font-semibold shadow-lg shadow-teal-500/20 transition-all active:scale-95">
//                         <CheckCircle size={20} />
//                         Hire Freelancer
//                     </button>
//                 </div>

//             </div>
//         </ProjectModalWrapper>
//     );
// };

// export default ViewProposalModal;
