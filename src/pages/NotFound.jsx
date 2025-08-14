import { Link, Navigate, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

const NotFound = () => {

    const navigate = useNavigate()
    return (
        <section className="not_found_container">
            <h1>Oops, that page does not exist</h1>
            <p onClick={() => navigate(-1)}>Let's get you back</p>
            {/* <Footer url=""/> */}
        </section>
    )
}

export default NotFound