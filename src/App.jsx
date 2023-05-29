import Header from "./components/Header"

import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import GoogleCallback from "./pages/Login/GoogleCallback"
import { useEffect } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "./stores/userSlice"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {

  const dispatch = useDispatch();

  // check user auth details
  useEffect(() => {

    const userData = localStorage.getItem('gosure-user-data');
    if(!userData) return;
    dispatch(setUser(JSON.parse(userData)));

  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/auth/google" element={<GoogleCallback />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
