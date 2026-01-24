import type { RootState } from '../../../store/store'
import { motion } from 'framer-motion'
import { Mail, Save } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../service/client/authService'
import { addClient } from '../../../store/slice/client/clientSlice'
import axios from 'axios'
import { getUserDetails } from '../../../service/client/Dashboard/ProfileService'
import type { IClient } from '../../../types/client/IClient'

const ProfileView = () => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const [name, setName] = useState(userData?.name)
  const [phone, setPhone] = useState(userData?.phone)
  const [imageUrl,setImageUrl]=useState(userData?.profileImage)
 const [data, setData] = useState<IClient | null>(null);
  const dispatch = useDispatch()


  console.log("userdfasndaarrtt",userData)
  

  const handleUpdateProfile = async(event) => {
    console.log("looooopp", event.target.files[0])
    
    const file = event.target.files?.[0];
    if (!file) {
      return
    }
    
    // setIsUploading(true)
    // setError('')
    
    console.log("not file", file)
    const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "Workora_Profile")
        data.append("cloud_name", "dzrms0g2j")

        const url = "https://api.cloudinary.com/v1_1/dzrms0g2j/image/upload";
        try {
            const response = await axios.post(url, data);
            console.log("Uploaded Image URL:", response.data.secure_url);
            const imgurl = response.data.secure_url
            setImageUrl(imgurl)
            
            // setSuccess('Profile picture uploaded successfully!')
        } catch (err) {
          console.error("Cloudinary upload error:", err);
          // setError('Failed to upload image. Please try again.')
        } finally {
            // setIsUploading(false)
        }
  }

  console.log("change phote ",imageUrl)
  console.log("loged user profile data", userData?.email)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("sumbit",imageUrl)
    const data = {
      email: userData?.email ?? "",
      name,
      phone,
      profileImage:imageUrl
    }
    const respone = await updateProfile(data)
    console.log("response of update profile", respone.data)
    dispatch(addClient(respone.data))

  }

  //  useEffect(() => {
  //     console.log("refreshed page")
  //     const userId = userData?._id;
  //     console.log("user id",userId)
  //     if (!userId) return;
      
  //     const fetchUser = async () => {
  //       try {
  //         const response = await getUserDetails({ userId });
  //         console.log("refresh data from profil",response.data.userDetails)
  //         setData(response.data.userDetails);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
      
  //     fetchUser();
  //     console.log("calleddddd")
  //   },[userData?._id]);
  useEffect(() => {
  const userId = userData?._id;
  if (!userId) return;

  const fetchUser = async () => {
    try {
      const response = await getUserDetails({ userId });
      console.log("refresh page responsee",response)
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUser();
}, [userData]);

  console.log("dataaaaa",data)
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="p-8 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}


          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <img
                src={imageUrl?imageUrl:"https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
              />
              <div className="relative">
                <input
                  type="file"
                  onChange={handleUpdateProfile}
                  // disabled={isUploading || isUpdating}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  accept="image/*"
                />
                <button
                  type="button"
                  // disabled={isUploading || isUpdating}
                  className="bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 text-purple-700 disabled:text-gray-400 px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  change photo
                  {/* {isUploading ? 'Uploading...' : 'Change Photo'} */}
                </button>
              </div>
              <div className="text-xl font-bold text-gray-800">

                <h2 >{data?.name}</h2>
              </div><br />
              {/* <p className="text-gray-500 text-sm mb-4">Senior UI/UX Designer</p> */}
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                {data?.email}
              </div>

              <div>
                <h1>{data?.phone}</h1>
              </div>



            </div>
          </div>
  
          {/* Edit Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Edit Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>

                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address (Not changable)
                  </label>
                  <input
                    type="email"
                    value={userData?.email}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>



                <div className="pt-4 flex justify-end">
                  <button

                    type='submit'
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm shadow-emerald-200"
                  >
                    <Save className="w-4 h-4" />
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
