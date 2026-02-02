import { useState } from "react";
function Challenger({ handleSubmition }) {
    const [phase, setPhase] = useState("info")
    const [challenge, setChallenge] = useState("")
    const [inputs, setInputs] = useState("")
    const [outputs, setOutputs] = useState("")
    const isDisabled = challenge.trim() == "";
    function submitChallenge() {
        handleSubmition(challenge, inputs, outputs)
    }
    if (phase == "info") return (
        <div className="info txt-white">
            <div className="title">
                <h1>You're the <span>Challenger</span> here</h1>
            </div>
            <div className="subtitle">
                <h2>Create a challenge involving algorithmic thinking for your opponent to solve</h2>
            </div>
            <div className="title2">
                <h1>Here are some guidelines you should follow to create a fair challenge!</h1>
            </div>
            <div className="rules">
                <li>Your challenge should be concise and easy to understand</li>
                <li>If your challenge involves inputs, you should create an example of the inputs given to the program</li>
                <li>Further, you should specify what will or will not be an input i.e an empty array will not be given as an input</li>
                <li>Finally, give the expected output of the algorithm. Where an input is given, create an example input, and what the expected output of the program should be from the input</li>
            </div>
            <div className="example-title">
                <h1>Example:</h1>
            </div>
            <div className="challenge-box">
                <h2>Challenge:</h2>
                <h4>Implement the Bubble Sort algorithm to sort an array of integers in ascending order.</h4>
                <li>The array will never be empty</li>
                <li>The array will only have integers</li>
            </div>
            <div className="input-box">
                <h3>Input</h3>
                <span></span><span>[5, 3, 8, 4, 2]</span>
            </div>
            <div className="output-box">
                <h3>Output</h3>
                <span></span><span>[2, 3, 4, 5, 8]</span>
            </div>
            <button className="button-option" onClick={() => setPhase("challenge_creation")}>Understood</button>
        </div>
    ) 
    if (phase == "challenge_creation") return (
        <div className="creation txt-white">
            <div className="input-group">
                <label>Enter your challenge<span>*</span></label>
                <input type="text" className="field" onChange={(e) => setChallenge(e.target.value)} />
                <label>Enter your inputs (optional)</label>
                <input type="text" className="field" onChange={(e) => setInputs(e.target.value)} />
                <label>Enter your outputs(optional)</label>
                <input type="text" className="field" onChange={(e) => setOutputs(e.target.value)} />
                {isDisabled ? (
                    <button className="button-option disabled">Enter a challenge</button>
                ): (
                    <button className="button-option" onClick={submitChallenge}>Submit</button>
                ) }
            </div>
        </div>
    )
    
}

export default Challenger; 
