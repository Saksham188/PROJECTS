// In our app src is for the front end and function folder is full backend.

// Now we will deploy our app . first download  npm i firebase , then do  npm install -g firebase-tools@7.0.0 or  npm i -g firebase-tools
// write firebase login and signin there and then come back.
// now do firebase init  and select hosting here and then click use an existing project then choose amazon clone and now for public directory right build then hit y for single page app and press enter
// Now do npm run build , npm run build strips out all those things which make our app slow.
// Now when we do any changes to app we need to run npm run build again.
// Now do firebase deploy and now u will see hosting url and click it and app is live.

// Now we need to install some dependencies. so now for card payment we will use stripe library.
// npm i @stripe/stripe-js ,it allows us to install stripe in our app.
// npm i @stripe/react-stripe-js 
// Dont use real card information for stripe.

import React , {useEffect} from "react";
import "./App.css";
import Header from "./Header"; //Here write name Header then below using header we will access these files.
import Home from "./Home"; //Here write name Home then below using Home we will access these files Home.js and Home.css.
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payments from "./Payments.js";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

// Note yaha neeche Title case mein hi rkhna eg payment.
// To see who signed in we r going to create a listener who will always keep track who signed in.

// This promise is used for stripe (payment app)
const promise=loadStripe('pk_test_51LU6WTSD046hcSgqsLcFw2vZ5Rkqfxcr3SoVsdHD8gpdXZLP5LrKCwjGVnUFSeuQ7q0iXCPLik9lYtAdIQ3ytksX00LKlUAL4r');


// Here react is nothing paths banao and jonsa match hojaye us child pr render krdo.
function App() {

  const[{},dispatch]=useStateValue();
  // By using useEffect we tell react that our component need to do something after render.
  useEffect(()=>{

    // Its a listener.so as soon as the app loads it always listen
    // Yani jab bhi app khulega ya bnd hoga ye hame authentication user dega.
    auth.onAuthStateChanged(authUser=>{
      console.log("The User is ",authUser);

      if(authUser)
      {
        // ie the user just logged in or the user was logged in
        // Now when user logs in we need to dispatch from here to the data layer
        dispatch({
          type: "SET_USER",
          user:authUser  //Our user is the authUser only.
        })
      }
      else
      {
        // the user logged out.
        dispatch({
          type: "SET_USER",
          user:null  //Our user is none as he logged out.
        
        })
      }
    })

  },[]);
 //ye [] lagane se ye hua ki it will only run once when the app component loads.Its like dynamic if statement in react. 
  return (
    //BEM

    <Router>
      <div className="app">
        {/*Header */}

        <Switch>
          {/*Its used for various routes. */}

          <Route path="/checkout">
            <Header />

            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            {/* Its role is that it wraps the payment element. */}
            <Elements stripe={promise}>
          
              <Payments/>

            </Elements>

            {/* <h1>I am Payment.</h1> */}
          </Route>

          <Route path="/login">
            {/* Isme hume header ni chahiye toh ham sirf login likhre isme. */}
            {/* <h1>Login Page LMAOO</h1> */}
            <Login/>
          </Route>

          <Route exact path="/">
            <Header />

            {/* Home*/}
            <Home />
          </Route>
        </Switch>

        {/* <h1>Hello Saksham, let's build amazon store 🚀  </h1> */}
      </div>
    </Router>
  );
}

export default App;
// npm install react-router-dom@5.2.0
