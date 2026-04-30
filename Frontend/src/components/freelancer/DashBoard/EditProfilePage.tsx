import { useState, useEffect } from "react";
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
    const [gitHubUrl, setGitHubUrl] = useState(userData?.gitHubUrl)
    const [linkedInUrl, setLinkedInUrl] = useState(userData?.linkedInUrl)

    console.log("skills", skills)

    const [profileImage, setProfileImage] = useState(userData?.profileImage)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData) {
            setName(userData.name ?? "");
            setPhone(userData.phone ?? "");
            setBio(userData.bio ?? "");
            setExperience(userData.experience ?? "");
            setSkills(userData.skills ?? []);
            setGitHubUrl(userData.gitHubUrl ?? "");
            setLinkedInUrl(userData.linkedInUrl ?? "");
            setProfileImage(userData.profileImage);
        }
    }, [userData]);

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
            gitHubUrl,
            linkedInUrl,
            profileImage
        }
        console.log("called edit submit")
        try {
            const response = await updateProfile(data)

            console.log("responseeee", response.updatedFreelancer)
            if (response.updatedFreelancer) {
                dispatch(addFreelancer(response.updatedFreelancer))
                toast.success("Profile updated successfully")
                navigate("/freelancer/dashboard", { replace: true })
            } else {
                toast.error("Failed to update profile data")
            }

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Profile Preview */}
                <div className="bg-white border rounded-xl p-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                            <img
                                src={profileImage ? profileImage : "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                            />
                            <div className="absolute inset-0 w-full h-full">
                                <input
                                    type="file"
                                    onChange={handleUpdateProfile}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-2 rounded-lg transition-colors duration-200 font-medium w-full max-w-[200px]"
                        >
                            change photo
                        </button>

                        <p className="text-gray-500 text-sm mt-4 mb-4">Freelancer</p>
                    </div>

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
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500 ml-1">GitHub Profile</label>
                                <input
                                    name="github"
                                    value={gitHubUrl}
                                    onChange={(e) => setGitHubUrl(e.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500 ml-1">LinkedIn Profile</label>
                                <input
                                    name="linkedin"
                                    value={linkedInUrl}
                                    onChange={(e) => setLinkedInUrl(e.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Editable Form */}
                <div className="md:col-span-2 bg-white border rounded-xl p-6 space-y-6">
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
                                readOnly
                                className="border px-3 py-2 rounded sm:col-span-2 bg-gray-50 cursor-not-allowed"
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
                        <div className="flex flex-wrap gap-3">

                            {exp.map((item, index) => (
                                <div key={index}>
                                    <button
                                        className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                                            experience === item 
                                            ? "bg-purple-600 text-white border-purple-600 shadow-md" 
                                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                                        }`}
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
                    <div className="flex flex-wrap justify-center sm:justify-end gap-3 pt-6 border-t">
                        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all duration-200 font-medium" onClick={() => handleSubmit()}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
