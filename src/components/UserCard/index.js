import { useState, useEffect } from "react";
import { supabase } from "../../lib/api"

const UserCard = ({ profileData }) => {
    const [img, setImg] = useState(false)

    useEffect(() => {
        async function getProfilePicture() {
            if (!profileData.profile_picture) {
                return
            }
            const { data, error } = await supabase.storage
                .from('profilepictures')
                .download(profileData.profile_picture)
            setImg(data)
        }
        getProfilePicture()
    }, [])
    return (
        <div className="m-3 p-3 shadow-lg">
            {img ?
                <div className="avatar">
                    <div className="w-16 rounded">
                        <img src={URL.createObjectURL(img)} />
                    </div>
                </div>
                :
                <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                        <span className="text-3xl">{profileData.first_name[0]}{profileData.last_name[0]}</span>
                    </div>
                </div>
            }
            <div>
                <h2 className="text-xl font-bold text-gray-500">{profileData.first_name} "{profileData.nickname}" {profileData.last_name}</h2>
                <button className="btn btn-primary">Add friend</button>
            </div>
        </div>
    )
}

export default UserCard;