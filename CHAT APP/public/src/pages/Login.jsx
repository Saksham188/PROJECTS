import React, { useState, useEffect } from "react";
// styled components help to write css and js in same file.
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes";
import SocialLoginButtons from "../components/SocialLoginButtons";

function Login() {
  
    const navigate=useNavigate();
    // create a state.here we store the params returned by useState in values and setvalues.UseState allows to track state in function.state refers to data that need to be tracked.
  // changing state means our values get updated in console ie state change
  // Hooks allows functions to have access to state and other Reacr features.
  const [values, setValues] = useState({
    username: "",
     password: "",
  });

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
    const { password,username } = values;
    if (password ==="") {
    //   we used toast to make alert beautiful
    toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } 
    else if (username.length ==="") {
      toast.error(
        "Email and Password is required.",
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
        const { password,username } = values;
        const {data}=await axios.post(loginRoute,{
            username,
            password,

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

  const handleChange = (event) => {
    // here we destructure our input and it get break like event.target.name=username and val=val of username
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snapp</h1>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
         
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          
          <button type="submit" className="btn">Login</button>
          <SocialLoginButtons/>
          <span>
            {/* if user have an account then take him to login */}
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
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

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
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
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
