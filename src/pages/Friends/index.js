import { useState, useEffect } from "react";
import { supabase } from "../../lib/api"
import { Nav, UserCard } from "../../components";
import { useAuth } from "../../contexts/auth";


const Friends = () => {
    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [showUserList, setShowUserList] = useState(true)
    const [showFriendsList, setShowFriendsList] = useState(true)
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("success")
    const [search, setSearch] = useState("")
    const { user } = useAuth()


    useEffect(() => {
        async function fetchUsers() {
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
            if (profiles) { setUsers(profiles) }
            return profiles
        }
        async function fetchFriends() {
            let { data: friends, error } = await supabase
                .from('friends')
                .select('*')
                .or(`user_id_1.eq.${user.id},user_id_2.eq.${user.id}`)
            if (friends) { setFriends(friends) }
            return friends
        }
        async function load() {
            const [profiles, frs] = await Promise.all([fetchUsers(), fetchFriends()]);
            console.log(profiles);
            console.log(frs);
        }
        load()
    }, [])

    function toggleUserList() {
        setShowUserList(prev => !prev)
    }

    function toggleFriendList() {
        setShowFriendsList(prev => !prev)
    }

    let userCards = users.map((u, i) => <UserCard profileData={u} user={user} key={i} />)

    return (
        <>
            <Nav />
            <div className="flex">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">User List</h2>
                <div className="form-control">
                    <label className="label cursor-pointer ml-2">
                        <input type="checkbox" className="toggle toggle-secondary" onChange={toggleUserList} checked={showUserList} />
                    </label>
                </div>
            </div>
            {showUserList && <input type="text" placeholder="Search for user..." className="input w-full max-w-xs ml-3" />}
            {showUserList && userCards}
            <div className="flex">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">Friends List</h2>
                <div className="form-control">
                    <label className="label cursor-pointer ml-2">
                        <input type="checkbox" className="toggle toggle-secondary" onChange={toggleFriendList} checked={showFriendsList} />
                    </label>
                </div>
            </div>
        </>
    )
}

export default Friends;