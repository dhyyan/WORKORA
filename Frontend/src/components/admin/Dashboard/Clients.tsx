import { useEffect, useState } from "react";
import { blockUser, listClients } from "../../../service/admin/Dashboard/client/clientService";
import type { IClient } from "../../../types/client/IClient";
import { Search } from "lucide-react";
import Pagination from "../../common/Pagination";

const Clients = () => {
    const [users, setUsers] = useState<IClient[]>([]);
    const [block, setBlock] = useState("")
    const [loadingId] = useState<string | null>(null);
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const refreshClients = async () => {

        const response = await listClients(currentPage, limit, search);
        console.log("response", response)
        if (response?.response) {
            setUsers(response.response.clients || []);
            setTotalPages(Math.ceil((response.response.totalClients || 0) / limit));
        }
    };


    const handleToggleStatus = async (id: string, isBlocked: boolean) => {
        // console.log("claeedddd", id)
        try {
            if (isBlocked) {
                const respone = await blockUser({ id, isBlocked })
                console.log(respone.data)
                setBlock("BLOCKED")

            } else {
                const respone = await blockUser({ id, isBlocked })
                console.log(respone.data)
                setBlock("UNBLOCKED")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //list clients
    useEffect(() => {
        const loadClients = async () => {
            await refreshClients()
        }
        loadClients()
    },[block, currentPage, search])

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Clients</h2>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full md:w-64 text-sm"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">User</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Phone</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Joined</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >
                                {/* Profile */}
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        src={user.profileImage || "/avatar.png"}
                                        className="w-9 h-9 rounded-full object-cover"
                                    />
                                    <span className="font-medium">{user.name}</span>
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {user.phone}
                                </td>

                                <td className="px-4 py-3 capitalize">
                                    {user.role}
                                </td>

                                {/* Status badge */}
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.isBlocked
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {user.isBlocked ? "Unlisted" : "Listed"}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "-"}
                                </td>

                                {/* Action Button */}
                                <td className="px-4 py-3">
                                    <button
                                        disabled={loadingId === user._id}
                                        onClick={() =>

                                            user._id && user.isBlocked !== undefined && handleToggleStatus(user._id, user.isBlocked)
                                        }
                                        className={`px-4 py-1.5 rounded-md text-xs font-medium transition
                      ${user.isBlocked
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-red-600 text-white hover:bg-red-700"
                                            }
                      ${loadingId === user._id
                                                ? "opacity-60 cursor-not-allowed"
                                                : ""
                                            }
                    `}
                                    >
                                        {loadingId === user._id
                                            ? "Updating..."
                                            : user.isBlocked
                                                ? "List"
                                                : "Unlist"}
                                    </button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No clients found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Clients;
