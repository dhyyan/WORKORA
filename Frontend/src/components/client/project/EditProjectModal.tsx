// import React from 'react';
// import ProjectModalWrapper from './ProjectModalWrapper';
// import { Save } from 'lucide-react';

// interface EditProjectModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     project: any; // Using any for dummy data simplicity, ideally strictly typed
// }

// const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, project }) => {
//     if (!project) return null;

//     return (
//         <ProjectModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Job Posting">
//             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Project Title</label>
//                     <input
//                         type="text"
//                         defaultValue={project.title}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
//                         placeholder="e.g. E-commerce Website Re-design"
//                     />
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Category</label>
//                     <select
//                         defaultValue={project.category}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all bg-white"
//                     >
//                         <option>Web Design</option>
//                         <option>Mobile Development</option>
//                         <option>Marketing</option>
//                         <option>Content Writing</option>
//                     </select>
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Budget Range</label>
//                     <input
//                         type="text"
//                         defaultValue={project.budget}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all"
//                         placeholder="e.g. $2,500 - $4,000"
//                     />
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                         defaultValue={project.description}
//                         rows={5}
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10C0A2] focus:ring-2 focus:ring-[#10C0A2]/20 outline-none transition-all resize-none"
//                         placeholder="Describe your project..."
//                     />
//                 </div>

//                 <div className="pt-4 flex justify-end gap-3">
//                     <button
//                         onClick={onClose}
//                         className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={onClose}
//                         className="flex items-center gap-2 px-6 py-2.5 bg-[#10C0A2] hover:bg-[#0EA085] text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
//                     >
//                         <Save size={18} />
//                         Save Changes
//                     </button>
//                 </div>
//             </form>
//         </ProjectModalWrapper>
//     );
// };

// export default EditProjectModal;
