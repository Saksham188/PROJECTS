import React,{lazy,Suspense} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SetUsername from './pages/SetUsername';
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Chat from './pages/Chat'
// import SetAvatar from './pages/SetAvatar'

// here when we load any page then all other page also get compiled so to reduce space we using lazy
const Chat=lazy(()=>import("./pages/Chat"));
const Login=lazy(()=>import('./pages/Login'));
const Register=lazy(()=>import("./pages/Register"));
const SetAvatar=lazy(()=>import('./pages/SetAvatar'));

const SetUserName=lazy(()=>import('./pages/SetUsername'));

export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<></>}>

    <Routes>
      {/* here we specified path and what to do when this path triggers. */}
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/setAvatar' element={<SetAvatar/>}/>
       <Route path='/setusername' element={<SetUsername/>}/>
       <Route path='/' element={<Chat/>}/>

    </Routes>
    
    </Suspense>
    </BrowserRouter>
  )
}
