import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./styles/Lobby.css"
import { useEffect, useState } from "react"
import Button from "./components/Button"
function Lobby() {
    const { lobbyCode } = useParams()
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (!state || !state.username) {
            navigate("/join-lobby", { replace: true })
            return
        }
    }, []) 
    if (!state || !state.username) {
        return null
    }
   
    const username = state.username 
    const [hostUser, setHostUser] = useState("")
    const [secondUser, setSecondUser] = useState("waiting...")  
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        const fetchLobby = async () => {
        try {
         const req = await fetch(`http://localhost:3000/lobby/details/`, {
            method: "POST", 
            body: JSON.stringify({ lobbyCode }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await req.json();
        if (res.started) {
            navigate(`/game/${lobbyCode}`)
        }
        setHostUser(res.host_username)
        setSecondUser(res.second_player_username ? res.second_player_username : "Waiting...")
        setDisabled(res.second_player_username ? false : true) 
        
        } catch (err) {
            console.error(err)          
        }
       };

    fetchLobby();
    const interval = setInterval(fetchLobby, 2000);
    return () => clearInterval(interval);
  }, []);
    const leave = async () => {
        try {
           const req = await fetch(`http://localhost:3000/lobby/leave`, {
                method: "POST",
                body: JSON.stringify({ username, lobbyCode }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            window.location.href = "/"
        } catch (err) {
            console.error(err)
        }
    }
    const start = async () => {
        if (disabled) return;
        try {
           const req = await fetch(`http://localhost:3000/lobby/start`, {
                method: "POST",
                body: JSON.stringify({ username, lobbyCode }),
                headers: {
                    "Content-Type": "application/json"
                }
            }) 
        } catch (err) {
            console.error(err)
        }
    }
    return (
       <div className="lobby-container">
            <h1 className="lobbyCode">Your lobby code is: {lobbyCode}</h1>
            <div className="lobby-details">
                <div className="lobby-host">
                    <h1 className="username">{hostUser}</h1>
                    <h2 className="host">Host</h2>
                </div>
                <div className="lobby-guest">
                    <h1 className="username">{secondUser}</h1>
                    <h2 className="second_guest">Second Player</h2>
                </div>
            </div> 
            {hostUser == username ? (
                <button className="start-game" onClick={start}>{!disabled ? "Start Game" : "Waiting for second player"}</button>
            ): (
                <Button text="Waiting for host" />
            )}
            <button className="leave-btn" onClick={leave}>Leave Lobby</button>
        </div> 
    )
}

export default Lobby
