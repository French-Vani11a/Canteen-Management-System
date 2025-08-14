import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

const Logout = () => {

    const {logout} = useContext(AuthContext)
    return (
        <div className="logout">
            <button
                onClick={(e) => {
                    logout()
                }}
            >Logout</button>
        </div>
    )
}

export default Logout