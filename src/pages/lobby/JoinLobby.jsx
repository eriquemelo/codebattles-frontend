import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function JoinLobby() {
    const navigate = useNavigate() 
    const [usernameDisabled, setUsernameDisabled] = useState(true)
    const [lobbyCodeDisabled, setLobbyCodeDisabled] = useState(true)
    const [username, setUsername] = useState("")
    const [lobbyCode, setLobbyCode] = useState("")
    let disabled; 
    if (usernameDisabled == false && lobbyCodeDisabled == false) {
        disabled = false;
    } else {
        disabled = true
    }
    const checkIfUsernameEmpty = (e) => {
        const value = e.target.value;
        setUsername(value)
        if (!value.trim()) {
            setUsernameDisabled(true)
        } else {
            setUsernameDisabled(false)
        }
    }
    const checkIfLobbyCodeEmpty = (e) => {
        const value = e.target.value;
        setLobbyCode(value)
        if (!value.trim()) {
            setLobbyCodeDisabled(true)
        } else {
            setLobbyCodeDisabled(false)
        }
    }
    const joinLobby = async (e) => {
        e.preventDefault()
        if (!disabled) {
            try {
                const req = await fetch("http://localhost:3000/lobby/join", {
                    method: "POST", 
                    body: JSON.stringify({ username, lobbyCode }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (req.status == 404) {
                    alert("Lobby Not Found!") 
                    return;
                } else if (req.status == 403) {
                    alert("Lobby is full")
                    return;
                } else if (req.status == 409) {
                    alert("That username has already been taken by another player in the lobby!")
                    return;
                }
                const res = await req.json();
                navigate(`/lobby/${lobbyCode}`, {
                    state: { username }
                })
            } catch (err) {
                console.error(err)        
                return
            }
        }
    }   
    return (

        <form className="input-group" onSubmit={joinLobby}>
            <label htmlFor="lobby-code" className="label">Enter Lobby Code<span className="required">*</span></label>
            <input type="text" id="lobbyCodeField" required onChange={checkIfLobbyCodeEmpty} 
                minLength="8" maxLength="8" 
                onInvalid={(e) => e.target.setCustomValidity("Please enter exactly 8 characters")} 
                onInput={(e) => e.target.setCustomValidity("")}
            />
            <label htmlFor="username" className="label">Enter your username<span className="required">*</span></label>
            <input type="text" id="usernameField" required onChange={checkIfUsernameEmpty} />
            <Button text="Join" disabled={disabled} />
        </form>

    )
} 

export default JoinLobby;
