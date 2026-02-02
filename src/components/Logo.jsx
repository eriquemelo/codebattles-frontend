import logo from "../assets/Logo.png" 
import challenger from "../assets/challenger.jpeg"
import { Outlet } from "react-router-dom"
function Logo({ GameStyle, Challenger }) {
    return (
        <>
            {!GameStyle ? ( 
             <>
                    
             <div className="logo-container">
                    <img className="logo" src={logo} alt="Codebattles logo" />
            </div>
            <Outlet />
            </>
            ): (
            <>
                <div className="logo-container-game">
                    <img className="logo" src={logo} alt="Codebattles logo" />
                    {Challenger ? (
                        <img className="challenger" src={challenger} alt="Youre the challenger here" /> 
                    ): (
                        <></>
                    )}
                </div>
                <Outlet />
            </>    
   
            )}
       </>

    )
}
export default Logo
