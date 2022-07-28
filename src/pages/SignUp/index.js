import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'

function SignUp() {
    const [error, setError] = useState(null)
    const { signUp } = useAuth()
    const [input, setInput] = useState({
        "email": "",
        "password": ""
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const { error } = await signUp({ "email": input.email, "password": input.password })
        if (error) return setError(error)
    }

    function handleChange(e) {
        let newInput = {
            ...input,
            [e.target.name]: e.target.value
        }
        setInput(newInput)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Sign up</button>
            </form>

            <br />

            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </>
    )
}

export default SignUp