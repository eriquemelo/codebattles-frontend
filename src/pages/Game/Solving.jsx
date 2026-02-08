import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { MoonLoader } from "react-spinners";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
function Solving({ challenge, inputs, outputs, codeCompile, submitChange, role, setCode, code, codeOutput, submitCode }) {
    const [idle, setIdle] = useState(false); 
    const submit = () => {
        setIdle(true); 
        submitCode()
    }
        return (
            <div className="solving">
                <div className="ide">
                    <CodeMirror
                      value={code}
                      height="100vh"
                      theme={tokyoNightStorm}
                      extensions={[python(), EditorView.editable.of(role != "Challenger")]}
                      onChange={(val) => { 
                            setCode(val)
                            submitChange(val)
                       }
                    }
        />
    </div>
    <div className="right-container">
      <div className="challenges-prompts">
        <h1 className="txt-white">Your challenge is: {challenge}</h1>
        <h1 className="txt-white">The example inputs are: {inputs}</h1>
        <h1 className="txt-white">The example outputs are: {outputs}</h1>
      </div>
      <div className="console">
        <h2 className="output">Code Output: {codeOutput}</h2>
        {role == "Solver" ? (
            <>
                <button onClick={codeCompile} className="button-option">Run your Code</button>
                <div className="final-submission">
                    <button className="button-option" onClick={submit}>Submit your code!</button>
                    {idle ? <MoonLoader color="#37d7b7" />   
                    : <></>}
                </div>
            </>
        ) : ( 
            <></>
        )}
      </div>
             </div>
    </div>

  );
}

export default Solving;
