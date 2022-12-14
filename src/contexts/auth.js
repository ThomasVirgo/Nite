import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/api'

const AuthContext = React.createContext()

function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = supabase.auth.session()

        setUser(session?.user ?? null)
        setLoading(false)

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [])

    const value = {
        signUp: (credentials, data) => supabase.auth.signUp(credentials, data),
        signIn: (data) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        updateUserInfo: (data) => supabase.auth.update(data),
        user,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider }