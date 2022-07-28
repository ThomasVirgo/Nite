import { Nav } from "../../components"
import { useAuth } from '../../contexts/auth'

function Dashboard() {
    const { user } = useAuth()
    console.log(user);
    return (
        <>
            <Nav />
            <h2>Dashboard</h2>
        </>
    )
}

export default Dashboard