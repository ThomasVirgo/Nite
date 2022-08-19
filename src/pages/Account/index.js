import { useEffect, useState } from "react";
import { supabase } from "../../lib/api"
import { useAuth } from "../../contexts/auth";
import { Nav, Loading, PopUpMessage } from "../../components";
import Compressor from "compressorjs";

const Account = () => {
    const [profileData, setProfileData] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false)
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("success")
    const baseInput = {
        "first_name": "",
        "last_name": "",
        "nickname": ""
    }
    const basePasswords = {
        "password": "",
        "password2": "",
    }
    const [input, setInput] = useState(baseInput)
    const [passwords, setPasswords] = useState(basePasswords)
    const { user, updateUserInfo } = useAuth()

    useEffect(() => {
        async function getProfile() {
            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq("user_id", user.id)
            setProfileData(profile[0])
            if (profile[0].profile_picture) {
                // grab it from s3 and set it as the selected image
                const { data: imgData, error } = await supabase.storage
                    .from('profilepictures')
                    .download(profile[0].profile_picture)
                setSelectedImage(imgData)
            }
        }
        getProfile()
    }, [])

    function handleChange(e) {
        let newData = { ...input }
        newData[e.target.name] = e.target.value
        setInput(newData)
    }

    async function handleSubmit(name) {
        if (!input[name]) return // stops user submitting empty fields

        // update profiles table
        const { data, error: profilesError } = await supabase
            .from('profiles')
            .update({ [name]: input[name] })
            .match({ user_id: user.id })

        function updateState() {
            setInput(baseInput)
            let newProfileData = { ...profileData, [name]: input[name] }
            setProfileData(newProfileData)
            setMessage(`You updated ${name} to ${input[name]}`)
            setMessageType("success")
        }

        // update auth.user table if first or last name
        if (name === "nickname") {
            updateState()
            return
        }
        const { user: updatedUser, error: authError } = await updateUserInfo({
            data: { [name]: input[name] },
        })
        updateState()
    }

    async function updatePassword() {
        if (passwords.password !== passwords.password2 || passwords.password === "") {
            // TODO add error message here
            return
        }
        const { user: newUser, error } = await updateUserInfo({ password: passwords.password })
        setPasswords(basePasswords)
    }

    function handlePasswordChange(e) {
        let newPasswordInput = { ...passwords }
        newPasswordInput[e.target.name] = e.target.value
        setPasswords(newPasswordInput)
    }

    async function uploadPhoto() {
        let typeMap = {
            "image/jpeg": ".jpg",
            "image/png": ".png"
        }
        setUploadingImage(true)
        let extension = typeMap[selectedImage.type]
        let newFileName = `${user.id}${extension}`
        new Compressor(selectedImage, {
            quality: 0.8,
            success: async (compressedImage) => {
                async function uploadToStorage() {
                    if (profileData.profile_picture) {
                        const { data, error } = await supabase.storage
                            .from('profilepictures')
                            .remove([profileData.profile_picture])
                        if (error) {
                            setMessage("Unable to remove old photo, contact support.")
                            setMessageType("error")
                        }
                    }
                    const { data, error } = await supabase.storage
                        .from('profilepictures')
                        .upload(newFileName, compressedImage, {
                            cacheControl: '3600',
                            upsert: false,
                        })
                    if (error) {
                        setMessage("Unable to upload photo, contact support.")
                        setMessageType("error")
                    }
                }
                async function updateProfile() {
                    const { data, error: profilesError } = await supabase
                        .from('profiles')
                        .update({ "profile_picture": newFileName })
                        .match({ user_id: user.id })
                    if (profilesError) {
                        setMessage("Unable to update profile, contact support.")
                        setMessageType("error")
                    }
                }
                uploadToStorage()
                updateProfile()
            }
        })
        setProfileData({ ...profileData, "profile_picture": newFileName })
        setUploadingImage(false)
        setMessage("Your profile picture has been uploaded")
    }

    return (
        <>
            <Nav />

            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">Edit Details</h2>

            <div className="form-control ml-3 mt-2">
                <label className="input-group">
                    <span>First Name</span>
                    <input type="text" name="first_name" placeholder={profileData?.first_name} value={input.first_name} onChange={handleChange} className="input input-bordered" />
                    <span onClick={() => handleSubmit("first_name")}>Update</span>
                </label>
            </div>

            <div className="form-control ml-3 mt-2">
                <label className="input-group">
                    <span>Last Name</span>
                    <input type="text" name="last_name" placeholder={profileData?.last_name} value={input.last_name} onChange={handleChange} className="input input-bordered" />
                    <span onClick={() => handleSubmit("last_name")}>Update</span>
                </label>
            </div>

            <div className="form-control ml-3 mt-2">
                <label className="input-group">
                    <span>Nickname</span>
                    <input type="text" name="nickname" placeholder={profileData?.nickname} value={input.nickname} onChange={handleChange} className="input input-bordered" />
                    <span onClick={() => handleSubmit("nickname")}>Update</span>
                </label>
            </div>

            <hr className="mt-4"></hr>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4 mt-6">Upload Profile Picture</h2>
            <div className="ml-3">
                {selectedImage && (
                    <div >
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    </div>
                )}
                <br />
                <input
                    type="file"
                    name="profile-picture"
                    onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </div>
            <button onClick={uploadPhoto} className="btn btn-primary ml-3 mt-4">Upload</button>
            {uploadingImage && <><span>uploading image, please wait...</span><Loading /></>}

            <hr className="mt-4"></hr>

            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4 mt-6">Change Password</h2>

            <div className="form-control w-full max-w-xs ml-3">
                <label className="label">
                    <span className="label-text">New Password</span>
                </label>
                <input value={passwords.password} name="password" onChange={handlePasswordChange} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs ml-3">
                <label className="label">
                    <span className="label-text">Confirm New Password</span>
                </label>
                <input value={passwords.password2} name="password2" onChange={handlePasswordChange} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <button onClick={updatePassword} className="btn ml-3 mt-4">Submit</button>
            <hr className="mt-4"></hr>
            {message && <PopUpMessage message={message} setter={setMessage} messageType={messageType} />}
        </>
    )
}

export default Account;