// Now we want ki add to cart click ho toh item cart mein jaye,iske lie we will have the data layer->REACT CONTEXT API/REDUX
// Toh cart se redux and redux se khi mrzi dalo.
import React from 'react';
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function SubTotal() {
  // React router has functions for history as useHistory(),It will give us the browser history.
  const history=useHistory();

  const[{basket},dispatch]=useStateValue(); 
    //useStateValue is a custom hook which pulls the info from the data layer. 
  return (
    <div className='subtotal'>
      {/* Here do npm install react-currency-format --save --force  ,
      Isse ye aapki value jo doge total ki usko currency format mein krdega like 1,000*/}
       <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>
                {/* Homework :To increase no of items and increasee decrease price. */}
                Subtotal ({basket.length} items);
                <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
                <input type="checkbox" />This order contains a gift.
            </small>        
            </>
        )}
        decimalScale={2}  //It tells ki 2 decimal places tak batao
        // Pass value above: HOMEWORK.
        value={getBasketTotal(basket)} //Value will be tell total amount 
        displayType={"text"}
        thousandSeparator={true} //Isse assume price aagya 6000 toh it will do 6,000
        prefix={"$"}
       
       />
       {/* Here we are pushing a page intothe browser. */}
       {/* If we add to link here then it will change look of the link.So we will use history.push here */}
       <button onClick={e=>history.push("/payment")}>Proceed to Checkout</button>
       
    </div>
  )
}

export default SubTotal
