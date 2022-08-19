import { useState, useEffect } from "react";
import { supabase } from "../../lib/api"
import { Nav, UserCard } from "../../components";

const Friends = () => {
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("success")
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
            setUsers(profiles)
        }
        fetchUsers()
    }, [])

    let userCards = users.map((u, i) => <UserCard profileData={u} key={i} />)

    return (
        <>
            <Nav />
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate ml-4">User List</h2>
            {userCards}
        </>
    )
}

export default Friends;