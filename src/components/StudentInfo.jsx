import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { currencyFormatter } from "../utils/utility_functions"

const StudentInfo = () => {

    const {loggedInUserDetails, isStudent} = useContext(AuthContext)

    return (
        <div className="student_info">
            <span className="user_name">Your {isStudent ? "student ID: " : "email: "}{loggedInUserDetails?.user_name}</span>
            <span className="student_balance">Your student balance: ZIG{currencyFormatter(loggedInUserDetails?.student_balance / 100)}</span>
        </div>
    )
}

export default StudentInfo