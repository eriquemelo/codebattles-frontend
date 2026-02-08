import GameInfo from "./GameInfo";
import Solver from "./Solver";
import Solving from "./Solving"
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";
import Logo from "../../components/Logo";
import { io } from "socket.io-client"
import { useLocation, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import Challenger from "./Challenger";
import Evaluation from "./Evaluation";
import GameOver from "./GameOver";
function Game() {
    const { lobbyCode } = useParams()
    const { state } = useLocation()
    const username = state.username
    const userToken = Cookies.get("authToken")
    const userID = jwtDecode(userToken).userID 
    const socketRef = useRef(null) 
    const [phase, setPhase] = useState("info")
    const [role, setRole] = useState(null)
    const [challenge, setChallenge] = useState("")
    const [inputs, setInputs] = useState("")
    const [outputs, setOutputs] = useState("")
    const [code, setCode] = useState("")
    const [aiEval, setAiEval] = useState("")
    const [codeOutput, setCodeOutput] = useState("")
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
        socketRef.current.on("new_round", (lobbyPlayerData) => {
            const currentPlayer = lobbyPlayerData.find(player => player.username == username)
            setRole(currentPlayer.role)
            setPhase("info")
        })
        socketRef.current.on("iterateCode", () => setPhase("Solving"))
        socketRef.current.on("challenge_submition", (newChallenge, newInputs, newOutputs, initialCode) => {
            setChallenge(newChallenge)
            setInputs(newInputs) 
            setOutputs(newOutputs)
            setCode(initialCode)
            setPhase("Solving")
        })
        socketRef.current.on("game_over", () => setPhase("game_over"))
        const handleAllRulesUnderstood = () => {
            setPhase(roleRef.current)
        }
        const codeChange = (newCode) => {
            setCode(newCode)
        }
        const codeCompiled = (output) => {
            setCodeOutput(output)
        }
        const handleEvaluation = (evaluation) => {
            console.log(evaluation)
            setAiEval(evaluation); 
            setPhase("Evaluation") 
        }
        socketRef.current.on("all_rules_understood", handleAllRulesUnderstood)
        socketRef.current.on("code_output", codeCompiled)
        socketRef.current.on("code_change", codeChange)
        socketRef.current.on("eval_response", handleEvaluation)
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
    const handleCodeChange = (newCode) => {
        socketRef.current.emit("code_change", lobbyCode, newCode) 
    }
    const handleCodeCompile = () => {
        socketRef.current.emit("code_compile", lobbyCode, code)
    }
    const handleSubmitCode = () => {
        console.log("Submitting")
        socketRef.current.emit("code_eval", lobbyCode,challenge, inputs, outputs, code, codeOutput)
    }
    const handleFinalSubmission = (saveChallengeChoice) => {
        socketRef.current.emit("final_submission", lobbyCode, userID, challenge, aiEval, inputs, outputs, code, saveChallengeChoice);
    } 
    const iterateCode = () => {
        socketRef.current.emit("iterateCode", lobbyCode)
    }
    let screen;
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
                screen = <Solving challenge={challenge} inputs={inputs} outputs={outputs} submitCode={handleSubmitCode} codeCompile={handleCodeCompile} codeOutput={codeOutput} submitChange={handleCodeChange} lobbyCode={lobbyCode} role={role} code={code} setCode={setCode}  />
                break;
            case "Evaluation":
                screen = <Evaluation ai_eval={aiEval} role={role} finalSubmission={handleFinalSubmission} iterateCode={iterateCode}/>
                break;
            case "game_over":
                screen = <GameOver />
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
