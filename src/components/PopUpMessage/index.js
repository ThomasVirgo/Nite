import { useState, useEffect } from "react"

const PopUpMessage = ({ message, messageType, setter }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
            setter("")
        }, 6000)

        return () => {
            clearTimeout(timeId)
        }
    }, [setter])

    if (!show) {
        return null;
    }

    return (
        <>
            {messageType === "success" &&
                <div className="badge badge-success gap-2 fixed inset-x-0 top-2 mx-auto">
                    <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {message}
                </div>
            }
            {messageType === "error" &&
                <div className="badge badge-error gap-2 fixed inset-x-0 top-2 mx-auto">
                    <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {message}
                </div>
            }

        </>
    )
}

export default PopUpMessage