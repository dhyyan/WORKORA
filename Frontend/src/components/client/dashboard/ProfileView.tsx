import type { RootState } from '../../../store/store'
import { motion } from 'framer-motion'
import { Mail, Save, User, Phone, Edit3 } from 'lucide-react'
import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../service/client/authService'
import { addClient } from '../../../store/slice/client/clientSlice'
import axios from 'axios'
import { getUserDetails } from '../../../service/client/Dashboard/ProfileService'
import type { IClient } from '../../../types/client/IClient'

import toast from 'react-hot-toast'

const ProfileView = () => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const [name, setName] = useState(userData?.name || "")
  const [phone, setPhone] = useState(userData?.phone || "")
  const [profileImage, setProfileImage] = useState(userData?.profileImage || "")
  const [data, setData] = useState<IClient | null>(null);
  const dispatch = useDispatch()

  const [prevUserData, setPrevUserData] = useState(userData);
  if (userData && userData !== prevUserData) {
    setPrevUserData(userData);
    setName(userData.name || "");
    setPhone(userData.phone || "");
    setProfileImage(userData.profileImage || "");
  }

  const handleUpdateProfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "Workora_Profile")
    data.append("cloud_name", "dzrms0g2j")

    const url = "https://api.cloudinary.com/v1_1/dzrms0g2j/image/upload";
    const loadingToast = toast.loading("Uploading image...")
    try {
      const response = await axios.post(url, data);
      const imgurl = response.data.secure_url
      setProfileImage(imgurl)
      toast.success("Image uploaded!", { id: loadingToast })
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Failed to upload image", { id: loadingToast })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      email: userData?.email ?? "",
      name,
      phone,
      profileImage: profileImage
    }
    const loadingToast = toast.loading("Saving changes...")
    try {
        const respone = await updateProfile(payload)
        dispatch(addClient(respone.updatedUser))
        setData(respone.updatedUser)
        toast.success("Profile updated successfully!", { id: loadingToast })
    } catch (error) {
        console.error("Profile update error:", error)
        toast.error("Failed to update profile", { id: loadingToast })
    }
  }

  useEffect(() => {
    const userId = userData?._id;
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await getUserDetails({ userId });
        // The service returns the data directly if it's following the pattern
        if (response.data) {
          setData(response.data);
        } else {
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userData?._id]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 md:p-8 max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <span>Client Dashboard</span>
            <span>/</span>
            <span className="text-emerald-600 font-medium">Profile</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-emerald-50 shadow-inner overflow-hidden">
                  <img
                    src={profileImage || data?.profileImage || "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <label className="absolute bottom-1 right-1 w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors border-2 border-white">
                  <Edit3 className="w-4 h-4" />
                  <input
                    type="file"
                    onChange={handleUpdateProfile}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>

              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-bold text-gray-900">{data?.name || name || userData?.name}</h2>
                <p className="text-emerald-600 font-medium text-sm">Verified Client</p>
              </div>

              <div className="w-full space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate flex-1 text-left">{data?.email || userData?.email}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">{data?.phone || phone || userData?.phone || 'No phone provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Edit Personal Details
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData?.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                  />
                  <p className="text-[10px] text-gray-400 ml-1">Email address cannot be changed for security reasons.</p>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type='submit'
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProfileView
