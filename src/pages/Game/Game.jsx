import GameInfo from "./GameInfo";
import Solver from "./Solver";
import Solving from "./Solving"
import { useState, useRef, useEffect } from "react";
import Logo from "../../components/Logo";
import { io } from "socket.io-client"
import { useLocation, useParams } from "react-router-dom";
import Challenger from "./Challenger";
function Game() {
    const { lobbyCode } = useParams()
    const { state } = useLocation()
    const username = state.username
    const socketRef = useRef(null) 
    const [phase, setPhase] = useState("info")
    const [role, setRole] = useState(null)
    const [challenge, setChallenge] = useState("")
    const [inputs, setInputs] = useState("")
    const [outputs, setOutputs] = useState("")
    const roleRef = useRef(null)
    useEffect(() => {
        roleRef.current = role        
    }, [role])

    useEffect(() => {
        socketRef.current = io("http://localhost:3000")
        socketRef.current.on("connect", () => {
            console.log(`ID: ${socketRef.current.id}`)
            socketRef.current.emit("joinLobby", lobbyCode)
        })
        socketRef.current.on("roles", (lobbyPlayerData) => {
            const currentPlayer = lobbyPlayerData.find(player => player.username == username)
            setRole(currentPlayer.role)
        })
        socketRef.current.on("challenge_submition", (newChallenge, newInputs, newOutputs) => {
            setChallenge(newChallenge)
            setInputs(newInputs) 
            setOutputs(newOutputs)
            setPhase("Solving")
        })
        const handleAllRulesUnderstood = () => {
            setPhase(roleRef.current)
        }
        socketRef.current.on("all_rules_understood", handleAllRulesUnderstood)
        return () => {
            socketRef.current.off("all_rules_understood", handleAllRulesUnderstood)
            socketRef.current.disconnect()
        }
    }, [lobbyCode])
    const handleRulesUnderstood = () => {
        socketRef.current.emit("rules_understood", lobbyCode)
    }
    const handleChallengeSubmition = (challenge, inputs, outputs) => {
        socketRef.current.emit("challenge_submition", lobbyCode,challenge, inputs, outputs)
        setPhase("Solving")
    }
    let screen;
    console.log(screen)
    console.log(phase)
    switch (phase) {
            case "info":
                screen = <GameInfo onUnderstood={handleRulesUnderstood} />
                break;
            case "Solver":
                screen = <Solver />
                break;
            case "Challenger": 
                screen = <Challenger handleSubmition={handleChallengeSubmition} />
                break;
            case "Solving": 
                screen = <Solving challenge={challenge} inputs={inputs} outputs={outputs} />
                break;
            default:
                break;
        }
    return (
      <>
        <Logo GameStyle={true} Challenger={role == "Challenger"} />
        {screen}
      </>
    
    )
    }

export default Game;
