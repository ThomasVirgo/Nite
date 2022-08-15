import { useEffect, useState } from "react";
import { supabase } from "../../lib/api"
import { useAuth } from "../../contexts/auth";
import { Nav } from "../../components";

const Account = () => {
    const [profileData, setProfileData] = useState({})
    const { user } = useAuth()

    useEffect(() => {
        async function getProfile() {
            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq("user_id", user.id)
            setProfileData(profile[0])
        }
        getProfile()
    }, [])
    return (
        <>
            <Nav />

            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">Edit Details</h2>

            <div class="form-control ml-3 mt-2">
                <label class="input-group">
                    <span>First Name</span>
                    <input type="text" placeholder={profileData.first_name} class="input input-bordered" />
                    <span>Update</span>
                </label>
            </div>

            <div class="form-control ml-3 mt-2">
                <label class="input-group">
                    <span>Last Name</span>
                    <input type="text" placeholder={profileData.last_name} class="input input-bordered" />
                    <span>Update</span>
                </label>
            </div>

            <div class="form-control ml-3 mt-2">
                <label class="input-group">
                    <span>Nickname</span>
                    <input type="text" placeholder={profileData.nickname} class="input input-bordered" />
                    <span>Update</span>
                </label>
            </div>

            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">Change Password</h2>
        </>
    )
}

export default Account;