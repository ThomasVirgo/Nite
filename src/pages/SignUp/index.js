import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { PopUpMessage } from '../../components'

function SignUp() {
    const [error, setError] = useState(null)
    const { signUp } = useAuth()
    const baseInput = {
        "email": "",
        "password": "",
        "repeatPassword": "",
        "first_name": "",
        "last_name": "",
    }
    const [input, setInput] = useState(baseInput)
    const [sucessMessage, setSuccessMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        if (input.password !== input.repeatPassword) {
            setError("passwords must match, please try again")
            setInput(baseInput)
            return
        }
        const { error } = await signUp(
            {
                email: input.email,
                password: input.password,
            },
            {
                data: {
                    first_name: input.first_name,
                    last_name: input.last_name,
                }
            }
        )
        if (error) console.log(error);
        if (error) return setError(error)
        setSuccessMessage("Sign up successful, please check your email to activate your account.")
        setInput(baseInput)
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
            <div className="navbar bg-base-100">
                <div className='navbar-start'></div>
                <div className="navbar-center">
                    <button className="btn btn-ghost normal-case text-xl">Nite</button>
                </div>
                <div className='navbar-end'></div>
            </div>

            <div className='p-6'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
                        <input type="first_name" id="first_name" name="first_name" onChange={handleChange} value={input.first_name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="jeff" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                        <input type="last_name" id="last_name" name="last_name" onChange={handleChange} value={input.last_name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="jefferson" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange} value={input.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="email@gmail.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChange} value={input.password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                        <input type="password" id="repeat-password" name="repeatPassword" onChange={handleChange} value={input.repeatPassword} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree that Olly and Hal are tapped and lost in space</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                    <p className='mt-2'>
                        Already have an account? <Link className="link link-primary" to="/login">Log In</Link>
                    </p>
                </form>
            </div>

            {error && <PopUpMessage message={error} messageType={"error"} setter={setError} />}
            {sucessMessage && <PopUpMessage message={sucessMessage} messageType={"success"} setter={setSuccessMessage} />}
        </>
    )
}

export default SignUp