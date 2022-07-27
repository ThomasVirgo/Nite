import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'

function PrivateRoute({ component: Component }) {
    const { user } = useAuth()
    let location = useLocation()
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }
    return <Outlet />
}

export default PrivateRoute