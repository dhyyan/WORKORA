import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { updateProfile } from "../../../service/freelancer/Dashboard/profileService";
import { addFreelancer } from "../../../store/slice/freelancer/FreelanceSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { Github, Linkedin } from "lucide-react";

const EditProfilePage = () => {
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.freelancerAuth.freelancer)
    const [name, setName] = useState<string>(userData?.name ?? "")
    const [phone, setPhone] = useState<string>(userData?.phone ?? "")
    const [bio, setBio] = useState<string>(userData?.bio ?? "")
    const [experience, setExperience] = useState<string>(userData?.experience ?? "")
    const [skills, setSkills] = useState<string[]>(userData?.skills ?? [])
    const [skillvalue, setSkillValue] = useState("")
    const [githubUrl, setGitHubUrl] = useState(userData?.gitHubUrl)
    const [linkedInUrl, setLinkedInUrl] = useState(userData?.linkedInUrl)

    console.log("skills", skills)

    const [profileImage, setProfileImage] = useState(userData?.profileImage)
    const dispatch = useDispatch()

    const exp = [
        "Beginner",
        "Intermediate",
        "Advance"
    ]


    const handleUpdateProfile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("looooopp", event.target.files?.[0])

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
            setProfileImage(imgurl)

            // setSuccess('Profile picture uploaded successfully!')
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            // setError('Failed to upload image. Please try again.')
        } finally {
            // setIsUploading(false)
        }
    }


    const add = () => {
        if (!skillvalue.trim()) return

        setSkills(prev => [...prev, skillvalue.trim()])
        setSkillValue("")
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(prev => prev.filter(skill => skill !== skillToRemove))
    }



    const handleSubmit = async () => {
        const data = {
            name,
            email: userData?.email,
            phone,
            bio,
            experience,
            skills,
            githubUrl,
            linkedInUrl,
            profileImage
        }
        console.log("called edit submit")
        try {
            const response = await updateProfile(data)

            console.log("responseeee", response.data)
            dispatch(addFreelancer(response.data))
            toast.success("update profile success")
            navigate("/freelancer/dashboard",{replace:true})

        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <p className="text-gray-500">
                    Update your personal and professional information
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Profile Preview */}
                <div className="bg-white border rounded-xl p-6 text-center">
                    <img
                        src={profileImage ? profileImage : "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                        alt="Profile"
                        className="w-32 h-32 ml-16 rounded-full object-cover border-4 border-purple-200 shadow-lg"
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

                    <h3 className="text-xl font-bold"></h3>
                    <p className="text-gray-500 text-sm mb-4">Freelancer</p>

                    <div className="text-left space-y-3">
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                disabled
                                value={userData?.email}
                                className="w-full px-3 py-2 border rounded bg-gray-100"
                            />
                        </div>

                      
                    </div>

                    {/* Section 5: Professional Links */}
                    <section className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pt-15">
                            Professional Links
                        </h4>
                        <div className="space-y-4">
                            <input
                                name="github"
                                value={githubUrl}
                                onChange={(e) => setGitHubUrl(e.target.value)}
                                placeholder="https://github.com/username"
                            //   leftIcon={<Github className="h-4 w-4" />}
                            />
                            <input
                                //   label="LinkedIn Profile"
                                name="linkedin"
                                value={linkedInUrl}
                                onChange={(e) => setLinkedInUrl(e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                            //   leftIcon={<Linkedin className="h-4 w-4" />}
                            />
                        </div>
                    </section>
                </div>

                {/* Right Editable Form */}
                <div className="lg:col-span-2 bg-white border rounded-xl p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h4 className="font-semibold mb-3">Personal Information</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border px-3 py-2 rounded"
                            />

                            <input
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border px-3 py-2 rounded"
                            />

                            <input
                                placeholder="Location"
                                value="New York, USA"
                                className="border px-3 py-2 rounded sm:col-span-2"
                            />
                        </div>
                    </div>

                    {/* About Me */}
                    <div>
                        <h4 className="font-semibold mb-3">About Me</h4>
                        <input

                            className="w-full border px-3 py-2 rounded"
                            placeholder="Tell something about yourself"
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />


                    </div>

                    {/* Experience Level */}
                    <div>
                        <h4 className="font-semibold mb-3">Experience Level</h4>
                        <div className="flex gap-3">

                            {exp.map((item, index) => (
                                <div key={index}>
                                    <button
                                        className="pr-20 border"
                                        onClick={() => setExperience(item)}>
                                        {item}
                                    </button>
                                </div>
                            ))}


                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h4 className="font-semibold mb-3">Skills</h4>

                        <div className="flex gap-2 mb-3">
                            <input
                                placeholder="Add skill"
                                onChange={(e) => setSkillValue(e.target.value)}
                                value={skillvalue}
                                className="flex-1 border px-3 py-2 rounded"
                            />
                            <button className="px-4 py-2 bg-gray-900 text-white rounded" onClick={() => add()}>
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button className="px-4 py-2 border rounded">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded" onClick={() => handleSubmit()}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
