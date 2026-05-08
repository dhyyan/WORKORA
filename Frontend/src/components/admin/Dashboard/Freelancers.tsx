import { useEffect, useState } from "react";

import type { IProfile } from "../../../types/freelancer/Dashboard/IProfile";
import { listFreelancers } from "../../../service/admin/Dashboard/freelancer/freelancerService";
import { blockUser } from "../../../service/admin/Dashboard/client/clientService";
import { Search } from "lucide-react";
import Pagination from "../../common/Pagination";


const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<IProfile[]>([]);
  const [loadingId] = useState<string | null>(null);
  const [block, setBlock] = useState("")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const limit = 5;



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

  useEffect(() => {
    let isMounted = true;
    const loadFreelancers = async () => {
      const response = await listFreelancers(currentPage, limit, search);
      if (isMounted && response?.response) {
        setFreelancers(response.response.freelancers || []);
        setTotalPages(Math.ceil((response.response.totalFreelancer || 0) / limit));
      }
    };
    loadFreelancers();
    return () => { isMounted = false; };
  }, [block, currentPage, limit, search]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Freelancers</h2>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search client..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
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
              <th className="px-4 py-3 text-left">Skills</th>
              {/* <th className="px-4 py-3 text-left">Rat  */}
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {freelancers.map((user) => (
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

                <td className="px-4 py-3 text-gray-600">
                  {user.skills?.join(", ") || "-"}
                </td>

                {/* <td className="px-4 py-3 text-gray-600">
                  {user.hourlyRate ? `$${user.hourlyRate}/hr` : "-"}
                </td> */}

                {/* Status */}
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

                {/* Action */}
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

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {freelancers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No freelancers found
          </p>
        )}
      </div>
    </div>
  );
};

export default Freelancers;
