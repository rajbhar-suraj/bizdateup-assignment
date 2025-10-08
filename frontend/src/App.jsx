import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateTodos from "./pages/CreateTodos"
import NotFoundPage from "./pages/NotFoundPage"
import Navbar from "./components/Navbar"
import {Toaster} from 'react-hot-toast'

function App() {
 
  return (
    <>
    <Navbar />
    <Routes >
      <Route index path="/" element={<Home/>} />
      <Route path="/createtodos" element={<CreateTodos />}/>

      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
    <Toaster />
    </>
  )
}

export default App
