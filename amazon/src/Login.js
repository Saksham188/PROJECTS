import React,{useState} from 'react'
import './Login.css'
import { Link,useHistory } from 'react-router-dom'
import { auth } from './firebase';

function Login() {
    // Here we will create variables to store value from our form.
    // It means by default value will be as specified ie empty.
    ///Here this is called a hook,useState returns a pair which contains current state and functn that updates it.so we wrote below syntax.
    // ie for updating email we can use setEmail.We update like this setemail(email+"abc") eg of an integer we took from website.
    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const history=useHistory();
    // useHistory can be used to change the page url.

    //it takes an event e 
    const signIn=e=>{
        e.preventDefault() //It will prevent the page from refreshing.

        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/')
        })
        .catch(error=> alert(error.message))

    }

    // This auth will create a user.
    const register=e=>{
        e.preventDefault()

        auth
        .createUserWithEmailAndPassword(email,password)
        // By this it will create user with id and pass and if everything goes good it comes back with an auth object.
        .then((auth)=>
        {
            //It means it successfully created a new user with email and password.
            console.log(auth);
            // if auth exist then add the url to history.
            // Agar user authorized hai toh ye usko home page pr redirect krdega
            if(auth)  
            {
                history.push('/')
            }
        })
        // If any case nhi bna toh error chalegi.
        .catch(error=> alert(error.message))
    }


    return (
    <div className='login'>
        {/* Isse image pr click krke vapas home page */}
        <Link to='/'>

        <img className='login_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322" alt="" />
        </Link>

        <div className="login_container">
            {/*It will be for the sign in box  */}
            <h1>Sign-In</h1>
            <form action="">
                <h5>Email</h5>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} /> 
                {/* value={email} se email mein value aajegi jo hmne txt mei likhi. */}
                {/* Onchange mtlb jb bhi user kuch nya type krega then we will update email as follows.Here e is an event*/}
                {/* e.target.value is what the user typed in.  target us element ko uthata jisne triger kia specific event ko.*/}
                

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setpassword(e.target.value)} />
               
               {/*signIn is a function  ie jese hi submit dbao vo function trigger ho jaye.*/}
                <button type='submit' onClick={signIn} 
                className='Login_SignInButton'>Sign In</button>
            </form>

            <p>
                By Signing-in you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
            
            <button onClick={register}
            className='Login_RegisterButton'>Create your Amazon Account</button>
        
        </div>
    </div>
  )
}

export default Login
