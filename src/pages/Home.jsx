import { Link } from "react-router-dom"
import Button from "../components/Button"
function Home() {
    return (
        <div className="home-container">
            <div className="lobby-options">
                <Link to="/create-lobby"><Button text="Create a Lobby"/></Link>
                <Link to="/join-lobby"><Button text="Join a Lobby"/></Link>
                <Link to="/challenges"><Button text="View Challenges" /></Link>
            </div>
        </div>
    )
}

export default Home;
