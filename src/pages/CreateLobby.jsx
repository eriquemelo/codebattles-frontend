import Button from "./components/Button";
import "./styles/CreateLobby.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function CreateLobby() {
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const [username, setUsername] = useState("")
    const checkIfUsernameEmpty = (e) => {
        const value = e.target.value;
        setUsername(value)
        if (!value.trim()) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }
    const createLobby = async (e) => {
        e.preventDefault()
        if (!disabled) {
            try {
                const req = await fetch ("http://localhost:3000/lobby/create", {
                    method: "POST", 
                    body: JSON.stringify({ username }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const res = await req.json();
                navigate(`/lobby/${res.lobby_code}`, {
                    state: { username }
                })
            } catch (err) {
                console.error(err)        
            }
        }
    }
        return (
        <form className="input-group" onSubmit={createLobby}>
            <label htmlFor="username" className="usernameLabel">Enter your username<span className="required">*</span></label>
            <input type="text" id="usernameField" required onChange={checkIfUsernameEmpty} />
            <Button text="Create" />
        </form>
    )
} 

export default CreateLobby;
