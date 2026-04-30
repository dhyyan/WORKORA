import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import type { RootState } from "../../../store/store";
import { getUserDetails } from "../../../service/freelancer/Dashboard/profileService";
import type { IProfile } from "../../../types/freelancer/Dashboard/IProfile";

const Profile = () => {
  
  const userdata = useSelector(
    (state: RootState) => state.freelancerAuth.freelancer
  );
 

  // ✅ Correct initial state
  const [data, setData] = useState<IProfile | null>(null);
  
  useEffect(() => {
    console.log("refreshed page")
    const userId = userdata?._id;
    console.log("user id",userId)
    if (!userId) return;
    
    const fetchUser = async () => {
      try {
        const response = await getUserDetails({ userId: userId.toString() });
        console.log("refresh data from profil",response.data)
        setData(response.data.userDetails);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUser();
    console.log("calleddddd")
  },[userdata?._id]);

  // Use userdata from Redux as the primary source of truth, fallback to fetched data
  const profileData = userdata || data;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information and portfolio settings
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="md:col-span-4 xl:col-span-3">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="relative mx-auto mb-4 w-24 h-24">
              <img
                src={
                  profileData?.profileImage ||
                  "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              {profileData?.name || "—"}
            </h2>

            <p className="text-sm text-emerald-600 font-medium">
              Freelancer
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600 text-left">
              <p>📧 {profileData?.email || "—"}</p>
              <p>📞 {profileData?.phone || "—"}</p>
             
            </div>

            <NavLink to="/freelancer/dashboard/editprofile">
              <button className="mt-6 w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Edit Profile
              </button>
            </NavLink>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-8 xl:col-span-9 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About Me
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {profileData?.bio || "—"}
            </p>
          </div>

          {/* Experience + Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Experience Level
              </h3>
              <span className="font-medium text-gray-800">
                {profileData?.experience || "—"}
              </span>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Social Links
              </h3>

              <div className="space-y-3">
                {profileData?.linkedInUrl ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={profileData.linkedInUrl}
                    className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition border border-transparent hover:border-blue-100 group"
                  >
                    <span className="font-medium text-blue-700">LinkedIn</span>
                    <span className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">
                    <span className="font-medium">LinkedIn</span>
                    <span className="text-xs">Not added</span>
                  </div>
                )}

                {profileData?.gitHubUrl ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={profileData.gitHubUrl}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/5 hover:bg-gray-900/10 transition border border-transparent hover:border-gray-200 group"
                  >
                    <span className="font-medium text-gray-900">GitHub</span>
                    <span className="text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">
                    <span className="font-medium">GitHub</span>
                    <span className="text-xs">Not added</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Skills & Expertise
            </h3>

            <div className="flex flex-wrap gap-2">
              {profileData?.skills?.length ? (
                profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
