import { useState } from "react"
function GameInfo({ onUnderstood }) {    
    const [disabled, setDisabled] = useState(false)
    function clickedUnderstood() {
        onUnderstood()
        setDisabled(true)
    }
    return (
        <div className="GameInfoContainer">
            <div className="title_container">
                <h1 className="title">Here's how the game works!</h1>
            </div>
            <div className="GameInfoRulesContainer">
                <div className="GameFlowContainer">
                    <ul>
                        <li className="ListItem">You will either have role of: Challenger, or Solver</li>
                        <li className="ListItem">The challenger will give provide a problem (called a challenge) which should include the use of algorithmic thinking.</li>
                        <li className="ListItem">The solver will then be able to view the problem, and decide when they are ready to solve the challenge</li>
                        <li className="ListItem">The solver will then be given an IDE, a terminal, and a chat where the solver and challenger can talk.</li>
                        <li className="ListItem">A timer will start when the IDE is loaded, and ends when the solver submits their code.</li>
                        <li className="ListItem">The time will then be added to the user’s score</li>
                        <li className="ListItem">A round will be complete when both both user’s have been a solver and challenger. The user with the lowest score wins the round.</li>
                        <li className="ListItem">The match has 3 rounds, the user with the most round wins is victorious!</li>
                    </ul>
                </div>
                <div className="GameJudgingContainer">
                    <h1 className="judgingTitle">Judging</h1>
                    <ul>
                       <li className="ListItem">When the solver submits their code, it is evaluated by AI. You will be given feedback, and the choice to keep 
                        iterating your solution or to submit it as a final solution</li> 
                    </ul>
                </div>
            </div> 
            <div className="button-wrapper">
                {disabled ? (
                    <button className="button-option disabled">Waiting for other player...</button>
                ) : (
                   <button className="button-option" onClick={clickedUnderstood}>Understood</button>
                )}
            </div>
        </div>
    )
}

export default GameInfo;
