import LatestMenu from "../components/LatestMenu"
import Footer from "../components/Footer"
import Cart from "../components/Cart"
import Checkout from "../components/Checkout"
import { useContext, useEffect, useState } from "react" 
import { AuthContext } from "../auth/AuthProvider"
import StudentInfo from "../components/StudentInfo"
import Logout from "../components/Logout"
import TopupBalance from "../components/TopupBalance"
import PastOrders from "../components/PastOrders"
import StudentFeedback from "../components/StudentFeedback"

const StudentDashboard = () => { 
    const [isCheckoutDisplayed, setIsCheckoutDisplayed] = useState(false)
    const { isAuthenticated, setIsAuthenticated, loggedInUserDetails, setLoggedInUserDetails } = useContext(AuthContext)
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails"))) 
    const [isPastOrdersDisplayed, setIsPastOrdersDisplayed] = useState("displayed_none")

    useEffect(() => {
        // Ensure user details are updated correctly
        setIsAuthenticated(true)
        setLoggedInUserDetails(userDetails)
    }, [userDetails, setIsAuthenticated, setLoggedInUserDetails])

    function handleDisplay(param) {
        setIsPastOrdersDisplayed(param)
    }

    // Check if the user is a student
    const isStudent = userDetails && userDetails.role === "student"

    return (
        <section className="student_dashboard_container">
            <button className="showPastOrders"
                onClick={() => setIsPastOrdersDisplayed("")}
            >View Past Orders</button>
            <PastOrders user_name={userDetails.user_name} isDisplayed={isPastOrdersDisplayed} handleDisplay={handleDisplay} />
            <Logout />
            <Cart setIsCheckoutDisplayed={setIsCheckoutDisplayed} />
            
            {isCheckoutDisplayed && <Checkout setIsCheckoutDisplayed={setIsCheckoutDisplayed} />}

            
           
            <h1>Hello, {isStudent ? userDetails.first_name : userDetails.user_name}</h1>

          
           
            
            <div className="latest_menu_container">
                {<LatestMenu show_add_to_cart_button={true}/>} 
                <button
                    className="checkout_btn"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsCheckoutDisplayed(true)
                        window.scrollTo(0,0)
                    }}
                    
                >Checkout</button>
                  {isStudent && (
                <div className="student_info_and_topup_container">
                    <StudentInfo />
                    <TopupBalance userName={userDetails.user_name} /> 
                </div>
            )}
            </div>  
             <div className="crud_container_div"> 
                <button className="show_hide_crud_container_div_component_container"
                    onClick={(e) => {
                        if (document.querySelector(".feedback_container").classList.contains("displayed_none")) {
                            document.querySelector(".feedback_container").classList.remove("displayed_none")
                            e.target.innerText = "-";
                        } else {
                            e.target.innerText = "+";
                            document.querySelector(".feedback_container").classList.add("displayed_none")
                        }
                    }}
                >+</button>
                <h3>Give Feedback</h3>
            </div>
            <div className="feedback_container displayed_none">
                <StudentFeedback />
            </div> 
           
            <Footer url="student_dashboard" />
        </section>
    )
}

export default StudentDashboard
