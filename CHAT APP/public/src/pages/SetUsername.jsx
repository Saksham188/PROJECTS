import React, { useState, useEffect } from "react";
// styled components help to write css and js in same file.
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { checkUserNameRoute, loginRoute, registerRoute } from "../utils/APIRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/FirbaseConfig";
import { debounce } from "../utils/Debounce";

function SetUsername() {
  
    onAuthStateChanged(firebaseAuth,(userData)=>{
        // console.log(userData)
        if(!userData)
        {
            navigate('/login');
        }
        else
        {
            setemail(userData.email? userData.email:userData.providerData[0].email)
        }
    })
    const navigate=useNavigate();
    // create a state.here we store the params returned by useState in values and setvalues.UseState allows to track state in function.state refers to data that need to be tracked.
  // changing state means our values get updated in console ie state change
  // Hooks allows functions to have access to state and other Reacr features.
    const [values, setValues] = useState("");
    const [label,setLabel]=useState("");
    const [email,setemail]=useState(undefined);
    const [userNameStatus,setUserNameStatus]=useState(undefined);
  


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000, //ie close after 8s
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // UseEffect is a hook by which we tell react it need to do something after rendering.
  // this will run only first time component is loaded.
  useEffect(()=>{
    // here we see if user is present in local storage and if yes then we navigate to /
    if(localStorage.getItem('chat-app-user')){
        navigate('/')
    }
  },[]);

  // here we are handling validations on our input
  const handleValidation = () => {
    
     if (values.length <3) {
      toast.error(
        "Username is required and should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } 
    
    return true;
  };

  const handleSubmit =async (event) => {
    // event.preventDefault se we r preventing submit of form.
    event.preventDefault();
    if(handleValidation()){
        // if it return true,call our api
        // const { password,username } = values;
        const {data}=await axios.post(registerRoute,{
            username: values,
            email,
            password:(Math.random()+1).toString(20).substring(1),

        }); //here we extracting key data from object axios.post returns
        if(data.status===false)
        {
            toast.error(data.message,toastOptions)
        }
        if(data.status===true)
        {
            // here we r passing user information to local storage in json format
        //    localStorage objects allows to save key/val pairs in browser and set Item sets value of key-value pair
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate("/");
        }
        // if everything correct we will navigate user to chat container ie home page.
    }


    //   alert("form");
    //   console.log(values,setValues);
  };

  //here we use debounce to reduce number of API calls
  const handleChange = debounce((name)=>checkUserName(name),300)


  const checkUserName= async(username)=>{
    if(username.length>3)
    {
        // if len>3 then call the API
        const {data}=await axios.post(checkUserNameRoute,{username});
        // console.log({data})

        setUserNameStatus(data.status);
        setLabel(data.msg);
        setValues(username)
    }

  }

  return (
    <>
      <FormContainer>
        {
            email && (

                <form action="" onSubmit={(event) => handleSubmit(event)}>
         <span>Check Username Availablity</span>
         <div className="row">


          <input
          className={`
          ${userNameStatus? "success" : userNameStatus!== undefined? "danger":"" }
          
          `}
            type="text"
            name="username"
            placeholder="Username"
            // onChange={(e) => checkUserName(e.target.value)}
            onChange={(e) => handleChange(e.target.value)}
            min="3"
            />

            <label htmlFor="" className={`
            ${userNameStatus? "success" : userNameStatus!== undefined? "danger":"" }
            
            `}>{label}</label>
         
            </div>
         
          
          <button type="submit" className="btn">Create User</button>
          
        </form>
          )
      }
      </FormContainer>
      <ToastContainer />
    </>
  );
}

// here we applying styles
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .row {
    label {
      display: block;
      margin: 10px 0 0 5px;
      transition: 0.3s ease-in-out;
      height: 0.5rem;
    }
    label.success {
      color: #39ff14;
    }
    label.danger {
      color: #ff3131;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    // ie whenever we focus on input then border change as follows
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  .success {
    border-color: #39ff14;
    &:focus {
      border-color: #39ff14;
    }
  }
  .danger {
    border-color: #ff3131;
    &:focus {
      border-color: #ff3131;
    }
  }
  .btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
   
  }
`;

export default SetUsername;
