import Button from "../../components/Button";

function GameOver() {
    return (
        <div className="game-over">
            <h1 className="txt-white">Game concluded!</h1>
            <h2 className="txt-white">Go back to the home screen to see your saved challenges!</h2>
            <Button isLink={true} to="/" text="Home screen" />
        </div>
    )
}
export default GameOver;
