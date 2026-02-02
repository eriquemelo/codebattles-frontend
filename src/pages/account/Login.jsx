import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Login() {
    const EMAIL_REGEX = /^[a-z0-9._%+\-!#$%&'*\/=?^_`{|}~]+@[a-z0-9.-]+\.[a-z0-9-]+$/i;
    const PASSWORD_REGEX = /^(?=.*[A-Z]).{6,}$/;
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [action, setAction] = useState("Sign In")
    // This will match the variables to the opposite of the current action to prompt a switch of action
    const switchActionButtonText = action == "Sign In" ? "Create an account" : "Log in to your account"
    const switchActionPrompt = action == "Sign In" ? "Don't have an account?" : "Already have an account?"
    const navigate = useNavigate()
    function switchAction() {
        if (action == "Sign In") {
            setAction("Sign up")
        } else {
            setAction("Sign In")
        }
    }
    async function submitRequest() {
        if (emailAddress == "" || password == "") {
            alert("You must enter both an email address and a password!")
            return
        }
        if (!EMAIL_REGEX.test(emailAddress)) {
            alert("Please enter a valid email address!")
            return;
        }
        if (!PASSWORD_REGEX.test(password)) {
            alert("Please ensure your password has at least 6 characters and an uppercase letter!")
            return;
        }
        const request_action = action == "Sign In" ? "signin" : "create"
        const req = await fetch (`http://localhost:3000/account/${request_action}`, {
                    method: "POST", 
                    body: JSON.stringify({ email_address: emailAddress, password }),
                    headers: {
                        "Content-Type": "application/json",
                    }
         })
        const res = await req.json();
        if (res.result == "error") {
            alert(res.error_message)
            return 
        }
        const token = res.token;
        Cookies.set("authToken", token)
        navigate("/")
    } 
    return (
        <div className="loginForm">
            <div className="login-card">
                <h2 className="title">{action}</h2>
                <div className="email-input">
                    <input type="text" className="input" placeholder="Enter your email..." onChange={(e) => setEmailAddress(e.target.value)}/>
                </div>
                <div className="password-input">
                    <input type="password" className="input" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)}/>
                    <label>Your password must be made up of 6 characters, and an uppercase letter!</label>
                </div>
                <h3>{switchActionPrompt}</h3>
                <h2 className="actionTitle" onClick={switchAction}>
                    { switchActionButtonText }
                </h2>
                <button className="button-option" onClick={submitRequest}>{action}</button>
            </div>
        </div>
    )
}
export default Login;
