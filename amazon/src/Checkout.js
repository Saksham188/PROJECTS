import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import SubTotal from './SubTotal';
// Checkout page has 2 parts: On left side is items and on right side is proceed to checkout.

function Checkout() {
  const [{basket,user},dispatch] =useStateValue();

  return (
    <div className='checkout'>
        <div className="checkout_left">
            <img className='checkout_add' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="Add" />
        
            <div>
              {/* If user exists then write its email. */}
              <h3>Hello,{user?.email}</h3>
                <h2 className='checkout_title'>Your Shopping Basket</h2>
                
                {/* Ie for every single item in basket we wanna return a CheckoutProduct isse item ko ye map krega item se */}
               
                {/* <CheckoutProduct
                 id='1222'
                 title='ITS MY GERO hejhsdhdsj'
                 image="https://m.media-amazon.com/images/I/71wrIZujPIL._AC_UL480_QL65_.jpg"
                 price={500}
                 rating={5}
                 />
                 */}
                {basket.map(item=>
                  <CheckoutProduct
                   id={item.id}
                   title={item.title}
                   image={item.image}
                   price={item.price}
                   rating={item.rating}
                  
                  />
                  
                  )}

                {/* CheckoutProduct */}
                {/* CheckoutProduct */}
                {/* CheckoutProduct */}
                {/* CheckoutProduct */}

                {/* In basket items ki jgh checkout product page call krdo */}
                {/* Basket Items */}
                {/* Basket Items */}
                {/* Basket Items */}
            
            </div>
        
        
        </div>
      {/* <p>Jai Shree Radhe.</p> */}
      <div className="checkout_right">
        {/* Subtotal */}
        <SubTotal/>
        {/* <h2>The Subtotal will go here.</h2> */}

      </div>
    </div>
  )
}

export default Checkout;
