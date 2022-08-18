import { useState, useEffect } from "react"

const PopUpMessage = ({ message, messageType, setter }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
            setter("")
        }, 4000)

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
                <div className="card w-96 bg-green-400 shadow-xl fixed inset-x-0 top-2 mx-auto">
                    <div className="card-body">
                        <h2 className="card-title">Success!</h2>
                        <p>{message}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => { setShow(false); setter("") }} className="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            }
            {messageType === "error" &&
                <div className="card w-96 bg-rose-400 shadow-xl fixed inset-x-0 top-2 mx-auto">
                    <div className="card-body">
                        <h2 className="card-title">Error!</h2>
                        <p>{message}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => { setShow(false); setter("") }} className="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default PopUpMessage