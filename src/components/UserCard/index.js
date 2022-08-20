import { useState, useEffect } from "react";
import { supabase } from "../../lib/api"
import { PopUpMessage } from '..'

const UserCard = ({ profileData, user }) => {
    const [img, setImg] = useState(false)
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("success")
    const [friendRequestSent, setFriendRequestSent] = useState(false)

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

    async function sendFriendRequest() {
        async function createRequest() {
            const { data, error } = await supabase
                .from('friend_requests')
                .insert([
                    { to_user_id: profileData.user_id },
                ])
            if (error) {
                setMessage("Unable to send friend request, contact support")
                setMessageType("error")
                return "error"
            }
            return data
        }
        async function createNotification() {
            const { data, error } = await supabase
                .from('notifications')
                .insert([
                    { for_user: profileData.user_id, notification_type: "friend_request", message: `You have a new friend request from ${user.user_metadata.first_name} ${user.user_metadata.last_name}` },
                ])
            if (error) {
                setMessage("Unable to create notification, contact support")
                setMessageType("error")
                return "error"
            }
            return data
        }
        const [friend_request, notification] = await Promise.all([createRequest(), createNotification()]);
        console.log(friend_request);
        console.log(notification);
        setMessage(`Friend request has been sent to ${profileData.first_name}, do not try again.`)
        setMessageType("success")
        setFriendRequestSent(true)
    }
    return (
        <div className="m-3 p-3 shadow-lg flex">
            {img ?
                <div className="avatar mr-3">
                    <div className="w-16 rounded">
                        <img src={URL.createObjectURL(img)} />
                    </div>
                </div>
                :
                <div className="avatar placeholder mr-3">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                        <span className="text-3xl">{profileData.first_name[0]}{profileData.last_name[0]}</span>
                    </div>
                </div>
            }
            <div>
                <h2 className="text-xl font-bold text-gray-500">{profileData.first_name} "{profileData.nickname}" {profileData.last_name}</h2>
                <button className="btn btn-primary mt-1" disabled={friendRequestSent ? "disabled" : ""} onClick={sendFriendRequest}>Add friend</button>
            </div>
            {message && <PopUpMessage message={message} messageType={messageType} setter={setMessage} />}
        </div>
    )
}

export default UserCard;