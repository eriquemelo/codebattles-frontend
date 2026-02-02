function Solving({ challenge, inputs, outputs }) {
    console.log(challenge, inputs, outputs)
    return (
        <>
            <h1 className="txt-white">Your challenge is: {challenge}</h1>
            <h1 className="txt-white">The example inputs are: {inputs}</h1>
            <h1 className="txt-white">The example outputs are: {outputs}</h1>
        </>
    )
}
export default Solving;
