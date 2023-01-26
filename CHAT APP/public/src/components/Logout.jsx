import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
   
    const navigate=useNavigate();
   const handleClick=async ()=>{

    // here we will clear local storage and all user data is in local storage.
      localStorage.clear();
      navigate("/login");

   }
 
    return (
    <Button onClick={handleClick}>
        {/* It gives power off button */}
      <BiPowerOff/>
    </Button>
  )
}


// we replace our div by button
const Button=styled.button`

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  :hover
  {
    background-color:#9a36f3;
  }
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  `