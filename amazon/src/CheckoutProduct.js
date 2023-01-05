import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

// props mtlb kuch arguments
function CheckoutProduct({ id, image, title, price, rating }) {

    const [{basket},dispatch]=useStateValue();
    // Here when we need to remove we need to dispatch an action removefrombasket.
    const RemoveFromBasket=()=>{
        // Here we will remove item from basket,ie the data layer.
        dispatch(
        {
            type:"REMOVE_FROM_BASKET",
            id:id,
            // Isse ye basket mein jayega and find krega id ko agar milgyi toh usko remove krdega.
        }
        )    
    
    }
  
    return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} />

      <div className="CheckoutProduct_info">
        
        <p className="CheckoutProduct_title">{title}</p>
        <p className="CheckoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="CheckoutProduct_rating">
            {/* Here we create array eg rating 5 so it create array of 5 and fill it mapps through it 5 times since rating is 5 and so 5 stars will be placed. */}
          {Array(rating)
            .fill()
            .map((_,i) => (  //(_,i) its not used anywhere.
              <p>🌟</p> 
            ))}
        </div>
        {/* Here we will have remove from basket button. */}
        <button onClick={RemoveFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
