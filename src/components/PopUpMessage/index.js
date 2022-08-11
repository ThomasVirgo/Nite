import { useState, useEffect } from "react"

const PopUpMessage = ({ message }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, 4000)

        return () => {
            clearTimeout(timeId)
        }
    }, [])

    if (!show) {
        return null;
    }

    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}

export default PopUpMessage