import axios from 'axios'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { firebaseLoginRoute } from '../utils/APIRoutes'
import { firebaseAuth } from '../utils/FirbaseConfig'


export default function SocialLoginButtons() {

    const navigate=useNavigate()
    const providers={
        google:new GoogleAuthProvider(),
        facebook: new FacebookAuthProvider(),
        github: new GithubAuthProvider(),
    }
    const firebaseLogin=async(loginType)=>{
        try {
            
            // here choose provider whether its fb or google or github
            const provider=providers[loginType];
            const userData=await signInWithPopup(firebaseAuth,provider);
            // console.log(userData);
            const email= userData.user.email ?
            userData.user.email : userData.user.providerData[0].email;
            
            const {data}=await axios.post(firebaseLoginRoute,{email});
            // if user is found then set user to local storage and send him to home page.
            if(data.status)
            {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate("/");
            }
            else
            {
                // if user is not found navigate him to setusername page
                navigate("/setusername")
            }

            // console.log(email,loginType);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Container>
      <button type='button' onClick={()=>firebaseLogin("google")}>
        <BsGoogle/>
      </button>
      <button type='button' onClick={()=>firebaseLogin("facebook")}>
        <BsFacebook/>
      </button>
      <button type='button' onClick={()=>firebaseLogin("github")}>
        <BsGithub/>
      </button>
    </Container>
  )
}


const Container= styled.div`
display: flex;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  background-color: transparent;

  button {
    background-color: transparent;
    border: 0.1rem solid #4e0eff;
    font-size: 1.5rem;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    &:hover {
      background-color: #4e0eff;
    }
  }

`;