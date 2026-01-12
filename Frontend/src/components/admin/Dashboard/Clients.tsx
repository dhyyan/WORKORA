import { useEffect, useState } from "react";
import { listClients } from "../../../service/admin/Dashboard/client/clientService";
import type { IClient } from "../../../types/client/IClient";

const Clients = () => {
    const [users, setUsers] = useState<IClient[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const refreshClients = async () => {
        const response = await listClients();
        setUsers(response.data.clients);
    };

    useEffect(() => {
        const loadClients = async () => {
            await refreshClients()
        }
        loadClients()
    }, [])
    
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Clients</h2>

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
                                        // onClick={() => handleToggleStatus(user._id)}
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
