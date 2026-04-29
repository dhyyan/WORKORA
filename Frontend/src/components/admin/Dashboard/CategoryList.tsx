import { useState, useEffect } from 'react';
import { Plus, LayoutGrid, AlertCircle, X, CheckCircle, XCircle } from 'lucide-react';
import Pagination from '../../common/Pagination';
import { categoryService, listCategoryService, toggleCategoryStatusService } from '../../../service/admin/Dashboard/client/clientService';
import toast from 'react-hot-toast';

// interface Category {
//     id: string;
//     name: string;
//     description: string;
//     status: 'Listed' | 'Unlisted';
// }

// const mockCategories: Category[] = [
//     { id: '1', name: 'Web Development', description: 'Websites, web apps, full-stack dev', status: 'Listed' },
//     { id: '2', name: 'UI/UX Design', description: 'App design, web design, user experience', status: 'Listed' },
//     { id: '3', name: 'Content Writing', description: 'Articles, blogs, copywriting', status: 'Unlisted' },
//     { id: '4', name: 'Digital Marketing', description: 'SEO, SMM, email marketing', status: 'Listed' },
//     { id: '5', name: 'Mobile App Dev', description: 'iOS, Android, React Native', status: 'Listed' },
// ];

interface Category {
    _id: string;
    name: string;
    isListed: boolean;
    createdAt: string;
}

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [newCategoryName, setNewCategoryName] = useState('');

    const limit = 5;

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await listCategoryService();
            if (response && response.success) {
                setCategories(response.categories || []);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("An error occurred while fetching categories");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleCategoryStatusService(id);
            if (response && response.success) {
                toast.success(`Category ${currentStatus ? 'unlisted' : 'listed'} successfully`);
                fetchCategories(); // Refresh the list from backend
            } else {
                toast.error(response?.message || 'Failed to update category status');
            }
        } catch (error) {
            console.error("Error toggling category status:", error);
            toast.error("An error occurred while updating category status");
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        try {
            const response = await categoryService(newCategoryName)
            if (response && response.success) {
                toast.success('Category created successfully');
                setNewCategoryName('');
                setIsAddModalOpen(false);
                fetchCategories(); // Refresh the list
            } else {
                toast.error(response?.message || 'Failed to create category');
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred while creating category');
        }
    };

    const totalPages = Math.ceil(categories.length / limit);
    const currentCategories = categories.slice((currentPage - 1) * limit, currentPage * limit);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Add, list, or unlist job categories.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {/* Categories Table */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                            Loading categories...
                                        </div>
                                    </td>
                                </tr>
                            ) : currentCategories.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg shrink-0 mt-1">
                                                <LayoutGrid className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{category.name}</span>
                                                <span className="text-xs text-gray-500 mt-0.5">Created on {new Date(category.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${category.isListed
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                            }
                                        `}>
                                            {category.isListed ? 'Listed' : 'Unlisted'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleToggleStatus(category._id, category.isListed)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${category.isListed
                                                ? 'text-red-600 bg-red-50 hover:bg-red-100 border-red-100'
                                                : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100'
                                                }`}
                                        >
                                            {category.isListed ? (
                                                <>
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    Unlist
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    List
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages || 1}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                {categories.length === 0 && (
                    <div className="p-10 text-center text-gray-500 flex flex-col items-center">
                        <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
                        <p>No categories found.</p>
                    </div>
                )}
            </div>

            {/* Add Category Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="catName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="catName"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                                        placeholder="e.g. Graphic Design"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newCategoryName.trim()}
                                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
