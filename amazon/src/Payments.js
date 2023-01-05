import { CardElement,useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link ,useHistory} from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payments.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";

function Payments() {
  //It will bring us user login id.
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe=useStripe();
  const elements=useElements();

  // Isse initial state set ho jayegi null and true inki.
  const [error,setError]=useState(null);
  const [succeeded,setsucceeded]=useState(false);
  const [processing,setProcessing]=useState(null);
  const [disabled,setDisabled]=useState(true);
  const [clientSecret,setClientSecret]=useState(true);
  const history=useHistory();

  // Async function is used to make API Calls.Its compatible with almost all data fetching libraries and API's.
  //useEffect is piece of code which has some dependencies and runs as soon as code loads or any of variables inside the bracket change.
  useEffect(()=>{
  //here we are going to generate the special stripe secret which allows us to charge a customer.
    const GetClientSecret=async () =>{
      // this time we pause and await axios.Axios is a way of making requests.
     
      // yaha hmne object banalia axios ka and iske andr method hoga post,Here for url we r passing the total
      const response=await axios({
        // Now we will make a POST Method request.
        method: 'post',
        // stripe accepts total in a currecy's subunit.If we using dollar it expects us to pass dollars. eg 10 dollar ke lie hme cents mei pass krna hota ie 10,000cents.
          url: `/payments/create?total=${getBasketTotal(basket) *100}`
      });
      // After this we should get some kind of response and that response should have Client's secret..
      // setClientSecret(response.data.clientSecret)
      setClientSecret(response.data.clientSecret)
    }
    // Isme ye hue ki jese hi yaha aayega,yaha se request generate hogi stripe pr and vo clientKey generate krega.

    GetClientSecret();
},[basket])

console.log('THE SECRET IS: ',clientSecret);

  // HandleEvent takes an event and do some stuff.Whenever we enter card details then it runs.Its an asynchronous function.
  const handleSubmit= async(event)=>{
    //Do all fancy stripe stuff.
    event.preventDefault();
    setProcessing(true); ///here set processing to true.
  
    // badi payment ke lie eg 50lakh we ask stripe for some secret key to complete the payment.

    // Client Secret tells how much we r going to charge a customer.
    // here we pass 2things ->client's secret and an object and in that object we pass payment_method 
    const payload=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement)
      }
    
    }).then(({paymentIntent})=>{
      //paymentIntent=Payment Confirmation
      
      setsucceeded(true);
      setError(null);
      setProcessing(false); //As nothing will be processed at that time

      // Agar sb shi ho toh unhe orders page pr dhakka dedo.
      history.replace('/orders');
      // we didnt do history.push as sb shi ho toh we dont want him to come back to payment page and go to orders page so we did history.replace.
    })
  // yani jb finish ho jata toh kuch vapas aayega and so in then it will be payment
  
}

  // whenever we go into card element it displays any error while customer type details.
  const handleChange=event=>{
      //Here we have 2 states: One to set the button to disable state and other to set the button error. 

      // Here we will listen for changes in CardElement and will display any errors as the customer types their card details.
      setDisabled(event.empty); //If event is empty go and disable the button.eg we booked something and click baad disable ko on krdo toh vo reclick ni hopayega.
      // If there is error show error else show nothing.
      setError(event.error?event.error.message : ""); //Agar error aaye toh error show krdo vrna kuch ni show kro.
    }


  return (
    <div className="payment">
      {/* this payment container will have all of the checkout items and details */}
      <div className="payment_container">
        <h1>
          {/* Checkout Written */}
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section--- Delivery Address */}
        <div className="payment_section">
          
          <div className="payment_title">
            <h3>Delivery Address: </h3>
          </div>
          
          <div className="payment_address">
            {/* Here write user email. bring from datalayer*/}
            <p>{user?.email}</p>
            <p>112 Huda Panipat</p>
            <p>Haryana,India</p>
          </div>
        
        </div>

        {/* Payment section--- Review Items */}
        <div className="payment_section">
          
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          
          <div className="payment_items">
            {/* Here we will have all the products */}
            {/* We will do it easily using REACT */}

            {basket.map((item) => (
              // For every item in basket return checkoutproduct component. so yha sare components dikhne lgenge.
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        
        </div>

        {/* Payment section--- Payment Method */}
        <div className="payment_section">
          
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment_details">
            {/* Stripe magic will go. */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              
              {/* Here we are going to render our price. */}
              <div className="payment_priceContainer">
                  <CurrencyFormat
                  // Here we are simply rendering out simple h3 with value./
            renderText={(value)=>(
               
               <h3>Order Total: {value}</h3>  
                
            )}
            decimalScale={2}  //It tells ki 2 decimal places tak batao

            value={getBasketTotal(basket)} //Value will be tell total amount 
            displayType={"text"}
            thousandSeparator={true} //Isse assume price aagya 6000 toh it will do 6,000
            prefix={"$"}
          
          />
          {/* yaha ye on tb hoga jab processing on ho jayegi handlesubmit pr */}
          <button disabled={processing|| disabled ||succeeded}>
             
             {/* Here in span it says if its processing say processing else say BuyNow */}
             {/* Whenever its processung button should be disbled */}
             <span>{processing? <p>Processing</p> : "Buy Now"}</span>
          </button>
              </div>

              {/* Errors :Whenever we have error only then show this div with error.*/}
              {error && <div>{error}</div>}

            </form>

          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Payments;
