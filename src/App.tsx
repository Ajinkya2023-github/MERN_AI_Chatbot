import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; 
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useAuth } from "./context/AuthContext";

function App() {
  //console.log(useAuth()?.isLoggedIn); // to check login or signup
  const auth = useAuth();

  return <main>
    <Header />
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/login" element = {<Login />} />
      <Route path = "/signup" element = {<Signup />} />
      
      {/* ✅ Protect the chat route */}
      <Route 
          path="/chat" 
          element={auth?.isLoggedIn ? <Chat /> : <Navigate to="/login" replace />} 
        />

        <Route path="*" element={<NotFound />} />
      {/* { auth?.isLoggedIn && auth.user && ( 
        <Route path = "/chat" element = {<Chat />} />
      )}
      <Route path = "*" element = {<NotFound />} />
 */}
    </Routes>
  </main>;
    
}

export default App
