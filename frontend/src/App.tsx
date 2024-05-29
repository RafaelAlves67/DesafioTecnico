import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages 
import Login from './pages/login/Login.tsx'
import Register from './pages/register/register.tsx'
import Search from './pages/search/Search.tsx'

// components
import Nav from './components/nav/nav.tsx'
import Home from './components/main/Home.tsx'

function App() {

  return (
      <BrowserRouter>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="search" element={<Search />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
