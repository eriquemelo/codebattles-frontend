import logo from "../../assets/Logo.png" 
import "../styles/logo.css"
import { Outlet } from "react-router-dom"
function Logo() {
    return (
        <>
            <div className="logo-container">
                    <img className="logo" src={logo} alt="Codebattles logo" />
            </div>
            <Outlet />
        </>

    )
}
export default Logo
