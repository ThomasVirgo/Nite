import { Nav } from "../../components"
import { useAuth } from '../../contexts/auth'

function Dashboard() {
    const { user } = useAuth()
    return (
        <>
            <Nav />
        </>
    )
}

export default Dashboard