import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        "email": "",
        "password": ""
    })
    const [error, setError] = useState(null)
    const { signIn } = useAuth()

    function handleChange(e) {
        let newInput = {
            ...input,
            [e.target.name]: e.target.value
        }
        setInput(newInput)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const { error } = await signIn({ "email": input.email, "password": input.password })

        if (error) return setError(error)
        navigate("/")
    }

    return (
        <div className="grid h-screen place-items-center">
            <form onSubmit={handleSubmit} className="card w-96 bg-base-100 mx-1">
                <div>{error && JSON.stringify(error)}</div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email..." className="input input-bordered w-full max-w-xs" name="email" onChange={handleChange} value={input.email} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password..." className="input input-bordered w-full max-w-xs" name="password" onChange={handleChange} value={input.password} />
                </div>
                <br />

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <br />
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    )
}

export default Login