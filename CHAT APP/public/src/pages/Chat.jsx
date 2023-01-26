import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

// now call this Api
function Chat() {

  const socket=useRef();
  const navigate=useNavigate()
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined)
  const [currentChat,setCurrentChat]=useState(undefined)
  const [isLoaded,setIsLoaded]=useState(false)

// we can use as much useEffect as we want
useEffect(()=>{
  const fetchData= async()=>{
      // here check if there is no user in local storage then navigate to /login
      if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
      }
      else
      {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true)
      }

};
  // we use async as its await axios
  fetchData();
},[]);

// as soon as current user is changed we want this to run
useEffect(()=>{
  if(currentUser){
    // here establish connection
    socket.current= io(host);
    //We pass currentuser id whenever he is locked in we will add it to global map in backend. 
    socket.current.emit("add-user",currentUser._id);
  }

},[currentUser])



useEffect(()=>{
  const fetchData= async()=>{
    // check if current user exists or not
    if(currentUser)
    {
       if(currentUser.isAvatarImageSet)
       {
          const data= await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        // if avatar image is not set then navigate to set avatar
        else
        {
          navigate("/setAvatar");
        }
    }

};
  // we use async as its await axios
  fetchData();
},[currentUser]);
  // Call just once when component created


  // now we want chat oppens on click so we make function
  const handleChatChange=(chat)=>{
    // here we will set our current chat as the clicked chat.
    setCurrentChat(chat);
  }

  return (
    // create fragments
   <Container>
    <div className="container">
      {/* pass currentchat as prop */}
      <Contacts 
      // {contacts} will have value 
      contacts={contacts} 
      currentUser={currentUser} 
      changeChat={handleChatChange}
      />
      {/* here if no selected chat if there are contacts show chat container else show welcome screen,  */}
      { isLoaded &&
          currentChat===undefined?(
            // Now when we click any chat then welcome page go away
            <Welcome 
            currentUser={currentUser} />
            ):(
              
              // from here send currentChat
                <ChatContainer
                 currentChat={currentChat} 
                 currentUser={currentUser}
                  socket={socket}
                  />

            )


        }
    </div>
   </Container>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    // ie 25% contact section and 75% chat section

    // making responsive for tablet mode
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%; 
    }
  }
`;

export default Chat
