import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PopUpMessage } from '../../components'
import { useAuth } from '../../contexts/auth'

const Login = () => {
    const navigate = useNavigate()
    const baseInput = {
        "email": "",
        "password": ""
    }
    const [input, setInput] = useState(baseInput)
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

        if (error) {
            setError(error)
            setInput(baseInput)
            return
        }
        navigate("/")
    }

    return (
        <>
            <div className="navbar bg-base-100">
                <div className='navbar-start'></div>
                <div className="navbar-center">
                    <button className="btn btn-ghost normal-case text-xl">Nite</button>
                </div>
                <div className='navbar-end'></div>
            </div>

            <div className='p-6 mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange} value={input.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="email@gmail.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChange} value={input.password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </form>
                <br />
                <p>
                    Don't have an account? <Link className="link link-primary" to="/signup">Sign Up</Link>
                </p>
            </div>

            {error && <PopUpMessage message={error?.message} messageType={"error"} setter={setError} />}
        </>
    )
}

export default Login