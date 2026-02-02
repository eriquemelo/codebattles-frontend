import { MoonLoader } from "react-spinners";
function Solver() {
    return (
        <div className="solver-awaiting">
            <div className="title">
                <h1 className="solver-title">You're the <span className="solver-span">solver</span> for this round!</h1>
                <h2 className="solver-moreinfo">You will be given a challenge to solve by your opponent</h2>
            </div>
            <div className="loading">
                <MoonLoader color="#37d7b7" size={160}  />
            </div>
            <h1 className="solver-title">Your challenge be ready soon!</h1>
        </div>
    )
}
export default Solver;
