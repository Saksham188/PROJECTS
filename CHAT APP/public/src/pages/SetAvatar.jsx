import React, { useState, useEffect } from "react";
// styled components help to write css and js in same file.
import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { Buffer } from "buffer";

import { setAvatarRoute } from "../utils/APIRoutes";


// here we will be making Avatars

export default function SetAvatar() {

    // Api route for images.
    // here we write random numbers and it generate random avatars
    const api=`https://api.multiavatar.com/4645646`;
    const navigate=useNavigate();
    const [avatars,setAvatars]= useState([]);
    // while avatars are loading we wanna display the loader.gif
    const [isLoading,setisLoading]= useState(true);
    const [selectedAvatar,setselectedAvatar]= useState(undefined);
    
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000, //ie close after 8s
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(()=>{
        const fetchData= async()=>{
            // here check if there is no user in local storage then navigate to /login
            if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
        }

      };
        // we use async as its await axios
        fetchData();
    },[]);

    const setProfilePicture=async ()=>{

        if(selectedAvatar===undefined)
        {
            toast.error("Please select an avatar",toastOptions)
        }
        else
        {
            // first get user from localhost
            const user= await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                
                image: avatars[selectedAvatar],
            });

            // check this as we were getting 503 error
            if(data.isSet)
            {
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate('/');
            }
            else
            {
                toast.error("Error setting avatar.Please try again",toastOptions);

            }
        }   
    };

    // this would be done only once
    useEffect(()=>{
        const fetchData= async()=>{
            try {
                const data=[];
                // for each dont work with API so use for loop
                for(let i=0;i<4;i++)
                {
                    const image=await axios.get(
                        // it generates multiple random numbers and we get random image everytime
                        `${api}/${Math.round(Math.random()*1000)}` 
                    );
                    // For binary daata in node we use buffer. it converts our image into binary format
                    const buffer=new Buffer(image.data)
                    // we convert buffer to base64 string
                    data.push(buffer.toString("base64"));
                }
    
                setAvatars(data);
                setisLoading(false);
                
            } catch (error) {
                console.log('Error while fetching data. ' + error);

            }
         };
        // we use async as its await axios
        fetchData();
    },[]);

  return (
    // <> these are called fragments and they r used to return multiple elements.
    <>
    {
        isLoading?(<Container>
            {/* here loader gif gets called until image is not loaded */}
            <img src={loader} alt="loader" className="loader"/>
        </Container>
        ):(

            
            <Container>
        <div className="title-container">
            <h1>
                Pick an avatar as your profile picture
            </h1>
        </div>
        <div className="avatars">
        {
            avatars.map((avatar,index)=>{
                return(
                    <div  key={index}
                    className={`avatar ${
                        selectedAvatar===index? "selected":""
                
                    }`}
                >
                {/* now we convert base64 string to image */}
                <img src={`data:image/svg+xml;base64,${avatar}`}  alt="avatar"
                 onClick={()=> setselectedAvatar(index)}
                 />

                </div>
                );
            })}
        </div>
        <button className="submit-btn" onClick={setProfilePicture} >Set as Profile Pic</button>

    </Container>
    )}
    <ToastContainer/>
    </>
  )
}



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;