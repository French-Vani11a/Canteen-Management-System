import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import LatestMenu from '../components/LatestMenu'

const Signup = () => {
    return (
        <section className="signup_container">
            <h1>Welcome to Theo's Canteen</h1>
            <p>Where technology meets good food</p>
            <h2>Here is today's menu</h2>
            <div className="todays_menu">
                {<LatestMenu />}
            </div>
            <p>To start purchasing your food, signup for an account below</p>
            <form className="login_form" id="login_form" action="./php_processes/signup_process.php" method="POST">
                <label htmlFor="username">Email address</label>
                <input type="email" name="username" id="username" placeholder="Username" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" required />
                <label htmlFor="repeat_password">Repeat your password</label>
                <input type="password" name="repeat_password" id="repeat_password" placeholder="Repeat your password" required />
                <input type="submit" value="Signup" /> 
                <span>Already have an account? Login&nbsp;<Link to="/login">here</Link></span>
            </form>
            <Footer />
        </section>
    )
}

export default Signup