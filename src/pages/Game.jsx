import { useParams } from "react-router-dom"
function Game() {
    const params = useParams(); 
    const { lobbyCode } = params;
    return (
        <>
            <h2>{lobbyCode}</h2>
            <h1>Welcome to the game</h1> 
        </>
    )
}

export default Game;
