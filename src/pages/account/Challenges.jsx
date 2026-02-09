import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
function Challenges() {
    const [challengesObject, setChallengesObject] = useState({ challenges: [] })
    const userToken = Cookies.get("authToken")
    const userID = jwtDecode(userToken).userID 
    useEffect(() => {
        const fetchChallenges = async () => {
            const req = await fetch("http://localhost:3000/account/getChallenges", {
                method: "POST",
                body: JSON.stringify({ userID }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            setChallengesObject(await req.json())
        }
        fetchChallenges()
    }, [])
    console.log(challengesObject)
    return (
        <div className="challenges">
            <h1 className="txt-white">Challenges</h1>
            {challengesObject.challenges.map((challenge) => ( 
                <div className="challenge">
                    <h1 className="txt-white">Prompt: {challenge.Challenge_prompt}</h1>
                    <h2 className="txt-white">Example Inputs: {challenge.Example_Inputs}</h2>
                    <h2 className="txt-white">Example Outputs: {challenge.Example_Outputs}</h2> 
                    <p className="txt-white">AI Evaluation: {challenge.Evaluation}</p> 
                    <p className="txt-white">Your code: {challenge.User_Code}</p>
                </div>
                
            ))}
        </div>
        
    )
}
export default Challenges; 
