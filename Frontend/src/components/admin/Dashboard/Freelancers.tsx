import { useEffect, useState } from "react";

import type { IProfile } from "../../../types/freelancer/Dashboard/IProfile";
import { listFreelancers } from "../../../service/admin/Dashboard/freelancer/freelancerService";


const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<IProfile[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const refreshFreelancers = async () => {
    const res = await listFreelancers();
    setFreelancers(res.data.freelancers);
  };

  useEffect(() => {
    const loadFreelancers = async () => {
            await refreshFreelancers()
        }
        loadFreelancers()
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Freelancers</h2>

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
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isBlocked
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
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition
                      ${
                        user.isBlocked
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }
                      ${
                        loadingId === user._id
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
