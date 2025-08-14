import { Link } from "react-router-dom"
import { displayFullYearDynamically } from "../utils/utility_functions"

const Footer = ({url}) => { 
    return (
        <footer className="footer">
            <span>Copyright &copy;&nbsp;</span><span>{displayFullYearDynamically()}</span><span>&nbsp;|&nbsp;</span><Link to={`/${url}`}>Theo's Canteen</Link>
        </footer>
    )
}

export default Footer