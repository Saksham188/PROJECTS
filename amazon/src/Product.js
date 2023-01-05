import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'

// Here we will put some argument so that we can make different products.
function Product({id,title,image,price,rating}) {

  // Here we have a state and a dispatch.Dispatch is how we r going to pull out data.
  const [{basket},dispatch]=useStateValue();

  // console.log("This is the basket: ",basket)
  // Here we made this function.It takes no arguments.
  const AddToBasket=() =>{
    // Here we are going to dispatch items into the data layer.
    // this dispatch is like a gun.It allows us to shoot into the data layer.
    dispatch({
      type: 'ADD_TO_BASKET',
      // The item we are going to push will be the item,
      item:{
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
    // This will push our item into the basket.
  };

  return (
    <div className='product'>
      {/* It has some info,price,star rating,image,add to cart */}

      <div className='product_info'>
        <p>{title}</p>
        <p className='product_price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        
        <div className="product_rating">
            {/* For rating we r making an array  here fill will fill the array and map function is called for each variable of array.*/}
            {Array(rating).fill().map((_,i)=>(
                
                <p>🌟</p>
            ))}

           
        </div>
      </div>
      <img src={image} alt="" />
        <button onClick={AddToBasket}>Add to basket</button>
        {/* Now we want ki is button se dispatch ho jaye item. Here onclick mein add to basket is a function which will dispatch.*/}
    </div>
  )
}

export default Product
