import CreateLobby from "./pages/lobby/CreateLobby"
import JoinLobby from "./pages/lobby/JoinLobby"
import "./styles/index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Logo from './components/Logo'
import Lobby from './pages/lobby/Lobby'
import Login from './pages/account/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Game from './pages/Game/Game'
import Challenges from "./pages/account/Challenges"
function App() {
    return (
        <BrowserRouter className="app"> 
            <Routes>
                <Route element={<Logo />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-lobby" element={
                        <ProtectedRoute>
                            <CreateLobby />
                        </ProtectedRoute>
                    }/>
                    <Route path="/join-lobby" element={
                        <ProtectedRoute>
                            <JoinLobby />
                        </ProtectedRoute>
                    } />
                    <Route path="/lobby/:lobbyCode" element={
                        <ProtectedRoute>
                            <Lobby />
                        </ProtectedRoute>
                    } />
                    <Route path="/challenges" element={
                        <ProtectedRoute>
                            <Challenges />
                        </ProtectedRoute>
                    } />
               </Route>
            
            <Route>
                  <Route path="/game/:lobbyCode" element={<ProtectedRoute><Game /></ProtectedRoute>} />
              </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
