import { useState } from "react";
import { MoonLoader } from "react-spinners";
function Evaluation({ ai_eval, finalSubmission, iterateCode, role }) {
    const [showSaveChallengeOption, setShowSaveChallengeOption] = useState(false)
    const showGameOptions = !showSaveChallengeOption; 
    const finalSubmissionWithSave = () => finalSubmission(true) 
    const finalSubmissionWithoutSave = () => finalSubmission(false)
    return (
        <div className="evaluation">
            <h1 className="txt-white">The AI has produced the following evaluation of the solver's code</h1>
            <p className="txt-white">{ai_eval}</p>
            <div className="options">
                {role == "Challenger" ? (
                    <>
                        <h1 className="txt-white">The solver is choosing whether to continue improving their solution or submit their code</h1>
                        <MoonLoader color="#37d7b7" size={160}  />
                    </>
                ) : (
                    <>
                        {showGameOptions ? (
                            <>
                                <h2 className="txt-white">Do you want to continue improving your solution?</h2>
                                <button className="button-option" onClick={iterateCode}>Yes</button>
                                <button className="button-option" onClick={() => setShowSaveChallengeOption(true)}>No</button>
                            </>
                        ) : <></>} 
                            {showSaveChallengeOption ? (
                            <div className="save-challenge-options">
                                <h2 className="txt-white">Would you like to save this challenge?</h2>
                                <button className="button-option" onClick={finalSubmissionWithSave}>Yes</button>
                                <button className="button-option" onClick={finalSubmissionWithoutSave}>No</button>
                            </div>
                        ) : <></>}
                    </>
                )}
                </div>
        </div>
    )
}

export default Evaluation; 
