import './App.css'
import CreateLobby from "./pages/CreateLobby"
import JoinLobby from "./pages/JoinLobby"
import Game from './pages/Game'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Logo from './pages/components/Logo'
import Lobby from './pages/Lobby'
function App() {
    return (
        <BrowserRouter className="app"> 
            <Routes>
                <Route element={<Logo />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-lobby" element={<CreateLobby />} />
                    <Route path="/join-lobby" element={<JoinLobby />} />
                    <Route path="/lobby/:lobbyCode" element={<Lobby />} />
                    <Route path="/game/:lobbyCode" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
