import { Link, useNavigate } from "react-router-dom"
import LatestMenu from "../components/LatestMenu"
import Footer from "../components/Footer" 
import { AuthContext, useAuth } from "../auth/AuthProvider"
import { useContext, useState } from "react"

const Home = () => {

    const {isAuthenticated, loggedInUserDetails, setIsAuthenticated, setLoggedInUserDetails} = useContext(AuthContext)
    const {login} = useAuth()
    const [loginErrorMsg, setLoginErrorMsg] = useState("")
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    function toggleActiveForm(e) {
        toggleDisplayEmailLoginFinalStage(true)
        document.querySelectorAll("div.toggle_form_container button").forEach(btn => {
            btn.classList.remove("active_form")
        })
        document.querySelectorAll(".forms_container form").forEach(form => form.classList.add("displayed_none"))

        if(!e.target.classList.contains("active_form")) {
            e.target.classList.add("active_form") 
            const button_identifier = e.target.getAttribute("data_button_identifier")
            console.log(button_identifier)
            document.querySelector(`.${button_identifier}`).classList.remove("displayed_none") 
        }
    }

    function toggleDisplayEmailLoginFinalStage(hasSwitchedLoginOptions) {
        if(hasSwitchedLoginOptions) {
            document.querySelector(".enter_email").classList.remove("displayed_none")
            document.querySelector(".enter_login_code_and_login").classList.add("displayed_none")
            return
        } else {
            document.querySelector(".enter_email").classList.toggle("displayed_none")
            document.querySelector(".enter_login_code_and_login").classList.toggle("displayed_none") 
        } 
    }

    function handleLogin() {
        let formData = new FormData(document.querySelector("#student_login_form"))
        let xhr = new XMLHttpRequest() 
      
        xhr.open('POST', 'http://localhost/e_eat/login_process.php', true)
        xhr.onload = function() {
          const response_json = JSON.parse(this.responseText)
          console.log(response_json) 
      
          if(response_json.status === "success") { 
            setLoggedInUserDetails(response_json) 
            setIsAuthenticated(true)
            localStorage.setItem("userDetails", JSON.stringify(response_json.user))
            localStorage.setItem("isAunthenticated", true) 
            localStorage.setItem("cartInfo", JSON.stringify({
                totalItems: 0,
                totalAmount: 0,
                cartItems: { 
                }
            }))
            if(response_json.user.role === "student") {
                navigate("/student_dashboard")
            } else if(response_json.user.role === "admin") {
                navigate("/admin_dashboard")
            }
          } else { 
            setLoginErrorMsg(response_json.message)
            document.querySelector(".error").classList.remove("displayed_none")
            setTimeout(() => {
                setLoginErrorMsg("")
                document.querySelector(".error").classList.add("displayed_none")
            }, 2000)
          }
        }
      
        xhr.send(formData)
      }
    
    function handleSendOtp(e) {
        e.preventDefault();

        const regexToCheckIfEmailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.length === 0) {
            document.querySelector(".non_student_login_form .error").classList.remove("displayed_none")
            setLoginErrorMsg("Enter your email")
                setTimeout(() => {
                    setLoginErrorMsg("")
                    document.querySelector(".non_student_login_form .error").classList.add("displayed_none")
                }, 2000)
            return
        }

        if(!regexToCheckIfEmailIsValid.test(email)) {
            document.querySelector(".non_student_login_form .error").classList.remove("displayed_none")
            setLoginErrorMsg("Enter a valid email")
                setTimeout(() => {
                    setLoginErrorMsg("")
                    document.querySelector(".non_student_login_form .error").classList.add("displayed_none")
                }, 2000)
            return 
        }
        let formData = new FormData(document.querySelector("#non_student_login_form"));
        fetch('http://localhost/e_eat/send_login_code.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                toggleDisplayEmailLoginFinalStage();
            } else {
                setLoginErrorMsg(data.message)
                document.querySelector(".non_student_login_form .error").classList.remove("displayed_none")
                setTimeout(() => {
                    setLoginErrorMsg("")
                    document.querySelector(".non_student_login_form .error").classList.add("displayed_none")
                }, 2000)
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function handleOtpLogin(e) {
        e.preventDefault();
        let formData = new FormData(document.querySelector("#non_student_login_form"));
        let xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost/e_eat/otp_login_process.php', true);
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            if (responseJson.status === "success") {
                setLoggedInUserDetails(responseJson);
                setIsAuthenticated(true);
                localStorage.setItem("userDetails", JSON.stringify(responseJson.user));
                localStorage.setItem("isAuthenticated", true); 
                setIsAuthenticated(true)  
                localStorage.setItem("cartInfo", JSON.stringify({
                    totalItems: 0,
                    totalAmount: 0,
                    cartItems: { 
                    }
                }))
                console.log(responseJson)
                navigate("/student_dashboard");
            } else {
                setLoginErrorMsg(responseJson.message)
                document.querySelector(".non_student_login_form .error").classList.remove("displayed_none")
                setTimeout(() => {
                    setLoginErrorMsg("")
                    document.querySelector(".non_student_login_form .error").classList.add("displayed_none")
                }, 2000)
            }
        };
        xhr.send(formData);
    }


    const error_styles = {
        width: "100%",
        backgroundImage: "url('images/denied_red.svg')",
        backgroundSize: "auto 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center"
    }
    return (
        <section className="home_container">  
            <h1> Theo's Canteen</h1>
            <p>❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️</p>
            {/* <h2>Here is today's menu</h2>
            <div className="latest_menu">
                {<LatestMenu show_add_to_cart_button={false}/>}
            </div> */}
            <p>  </p>
            <p>  </p>
            
            <div className="toggle_form_container">
                <button className="toggle_form select_student_login active_form" data_button_identifier="student_login" onClick={(e) => toggleActiveForm(e)} >Student login</button>
                <button className="toggle_form select_non_student_login" data_button_identifier="non_student_login" onClick={(e) => toggleActiveForm(e)} >Non-student login</button>
            </div>
            <div className="forms_container">
                <form className="student_login_form student_login" data_form_identifier="student_login" id="student_login_form">
                    <label htmlFor="user_name"></label>
                    <input type="text" name="user_name" id="user_name" placeholder="Enter your Reg Number" required />
                    <label htmlFor="password_reg_number"></label>
                    <input type="password" name="password_reg_number" id="password_reg_number" placeholder="Enter your Account Number" required />
                    <span className="error displayed_none" style={error_styles}>{loginErrorMsg}</span>
                    <input type="submit" value="Login" id="submit_student_login" className="submit" required
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}
                    /> 
                </form>  
                <form className="non_student_login_form non_student_login" data_form_identifier="non_student_login" id="non_student_login_form">
                    <div className="enter_email">
                        <h3>New on this platform? You only need your email to get started</h3>
                        <label htmlFor="email" className="email_label"></label>
                        <input type="text" name="email" id="email" placeholder="Email" className="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} required />  
                        <span className="error displayed_none" style={error_styles}>{loginErrorMsg}</span>
                        <button type="submit" className="send_login_code" onClick={(e) => {handleSendOtp(e)}}>Send login code to email</button> 
                    </div>
                    <div className="enter_login_code_and_login displayed_none">
                        <label htmlFor="login_code"></label>
                        <input type="text" name="login_code" id="login_code" placeholder="Enter the login code we sent to your email" required/>
                        <input type="submit" value="Login" className="non_student_login" id="non_student_login" onClick={(e) => {handleOtpLogin(e)}} />
                        <div className="resend_code_btn_container">
                            <span>Don't receive the login code? Resend</span>
                            <button onClick={(e) => {
                                e.preventDefault();
                                toggleDisplayEmailLoginFinalStage();
                            }}>here</button>
                        </div>
                    </div>
                </form>  
            </div>
            <div className="forgot_password_and_signup_link">  
            </div>
            <Footer url="" />
        </section>
    )
}

export default Home



// import { Link, useNavigate } from "react-router-dom"
// import LatestMenu from "../components/LatestMenu"
// import Footer from "../components/Footer" 
// import { AuthContext, useAuth } from "../auth/AuthProvider"
// import { useContext, useState } from "react"

// const Home = () => {

//     const {isAuthenticated, loggedInUserDetails, setIsAuthenticated, setLoggedInUserDetails} = useContext(AuthContext)
//     const {login} = useAuth()
//     const [loginErrorMsg, setLoginErrorMsg] = useState("")

//     const navigate = useNavigate()

//     function toggleActiveForm(e) {
//         toggleDisplayEmailLoginFinalStage(true)
//         document.querySelectorAll("div.toggle_form_container button").forEach(btn => {
//             btn.classList.remove("active_form")
//         })
//         document.querySelectorAll(".forms_container form").forEach(form => form.classList.add("displayed_none"))

//         if(!e.target.classList.contains("active_form")) {
//             e.target.classList.add("active_form") 
//             const button_identifier = e.target.getAttribute("data_button_identifier")
//             console.log(button_identifier)
//             document.querySelector(`.${button_identifier}`).classList.remove("displayed_none") 
//         }
//     }

//     function toggleDisplayEmailLoginFinalStage(hasSwitchedLoginOptions) {
//         if(hasSwitchedLoginOptions) {
//             document.querySelector(".enter_email").classList.remove("displayed_none")
//             document.querySelector(".enter_login_code_and_login").classList.add("displayed_none")
//             return
//         } else {
//             document.querySelector(".enter_email").classList.toggle("displayed_none")
//             document.querySelector(".enter_login_code_and_login").classList.toggle("displayed_none") 
//         } 
//     }

//     function handleLogin() {
//         let formData = new FormData(document.querySelector("#student_login_form"))
//         let xhr = new XMLHttpRequest() 
      
//         xhr.open('POST', 'http://localhost/e_eat/login_process.php', true)
//         xhr.onload = function() {
//           const response_json = JSON.parse(this.responseText)
//           console.log(response_json) 
      
//           if(response_json.status === "success") { 
//             setLoggedInUserDetails(response_json) 
//             setIsAuthenticated(true)
//             localStorage.setItem("userDetails", JSON.stringify(response_json.user))
//             localStorage.setItem("isAunthenticated", true) 
//             localStorage.setItem("cartInfo", JSON.stringify({
//                 totalItems: 0,
//                 totalAmount: 0,
//                 cartItems: { 
//                 }
//             }))
//             if(response_json.user.role === "student") {
//                 navigate("/student_dashboard")
//             } else if(response_json.user.role === "admin") {
//                 navigate("/admin_dashboard")
//             }
//           } else { 
//             setLoginErrorMsg(response_json.message)
//             document.querySelector(".error").classList.remove("displayed_none")
//             setTimeout(() => {
//                 setLoginErrorMsg("")
//                 document.querySelector(".error").classList.add("displayed_none")
//             }, 2000)
//           }
//         }
      
//         xhr.send(formData)
//       }
    
    
//     const error_styles = {
//         width: "100%",
//         backgroundImage: "url('images/denied_red.svg')",
//         backgroundSize: "auto 70%",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "10px center"
//     }
//     return (
//         <section className="home_container">  
//             <h1>Welcome to the TCFL Canteen</h1>
//             <p>Your ultimate campus food ordering system</p>
//             {/* <h2>Here is today's menu</h2>
//             <div className="latest_menu">
//                 {<LatestMenu show_add_to_cart_button={false}/>}
//             </div> */}
//             <p>To purchase your food, login below</p>
//             <div className="toggle_form_container">
//                 <button className="toggle_form select_student_login active_form" data_button_identifier="student_login" onClick={(e) => toggleActiveForm(e)} >Student login</button>
//                 <button className="toggle_form select_non_student_login" data_button_identifier="non_student_login" onClick={(e) => toggleActiveForm(e)} >Non-student login</button>
//             </div>
//             <div className="forms_container">
//                 <form className="student_login_form student_login" data_form_identifier="student_login" id="student_login_form">
//                     <label htmlFor="user_name">Student Reg Number</label>
//                     <input type="text" name="user_name" id="user_name" placeholder="Enter your Reg Number" required />
//                     <label htmlFor="password_reg_number">Student Account Number</label>
//                     <input type="password" name="password_reg_number" id="password_reg_number" placeholder="Enter your Account Number" required />
//                     <span className="error displayed_none" style={error_styles}>{loginErrorMsg}</span>
//                     <input type="submit" value="Login" id="submit_student_login" className="submit" required
//                         onClick={(e) => {
//                             e.preventDefault()
//                             handleLogin()
//                         }}
//                     /> 
//                 </form>  
//                 <form className="non_student_login_form non_student_login" data_form_identifier="non_student_login" id="non_student_login_form">
//                     <div className="enter_email">
//                         <h3>New on this platform? You only need your email to get started</h3>
//                         <label htmlFor="email" className="email_label">Email</label>
//                         <input type="text" name="email" id="email" placeholder="Email" className="email" required />  
//                         <button type="submit" className="send_login_code"
//                             onClick={(e) => {
//                                 e.preventDefault()
//                                 toggleDisplayEmailLoginFinalStage()
//                             }}
//                         >Send login code to email</button> 
//                     </div>
//                     <div className="enter_login_code_and_login displayed_none">
//                         <label htmlFor="login_code">Login code</label>
//                         <input type="text" name="login_code" id="login_code" placeholder="Enter the login code we sent to your email" required/>
//                         <input type="submit" value="Login" className="non_student_login" id="non_student_login" />
//                         <div className="resend_code_btn_container">
//                             <span>Don't receive the login code? Resend</span>
//                             <button
//                                 onClick={(e) => {
//                                     e.preventDefault()
//                                     toggleDisplayEmailLoginFinalStage()
//                                 }}
//                             >here</button>
//                         </div>
//                     </div>
//                 </form>  
//             </div>
//             <div className="forgot_password_and_signup_link"> 
//                 {/* <span>Forgot your password? Reset it&nbsp;<Link to="/password_reset">here</Link></span>
//                 <span>Don't have an account? Signup <Link to="/signup">here</Link></span> */}
//             </div>
//             <Footer url="" />
//         </section>
//     )
// }

// export default Home
