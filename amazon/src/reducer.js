// Reducer can be thought as a data layer.
// So here initially in our data layer we gonna add an empty basket
export const initialState=
{
    basket: [],
    user:null,  //here we also create a user which will be bydefault none.
};

// This is known as a selector and its highly used.Its very powerful fun which takes the basket and return
export const getBasketTotal=(basket)=>
basket?.reduce((amount,item)=>item.price+amount,0);
// reduce is a function that maps(iterates) through the basket and sum up the total.
// (amount,item)= initial amount,item   -> now for each iteration add amount to price and initial amount will be 0.
// Its basically fancy way of writing a for loop,incrementing it and return it.
// basket? helps us to handle undefined value.


const reducer=(state ,action)=>{
    // Reducer says add krna,delete krna mein krega sir.
    // reducer takes 2 arguments-> state of application,action=what we trying to do,add to basket,remove,update.

 console.log(action);  //This shows ki add to basket dabane pr vo item ko dispatch krdega.
 // Switch bana dia bcse add to basket,remove hai uske lie.
 switch(action.type)
 {
    // jab bhi add to basket dabayega toh dispatch kro action ko is type ke.Reducer always listening for dispatch.
    case "ADD_TO_BASKET":
        // Here we r gonna return state ,whatever the basket currently was +action we decided to add. ie .item we decided to pass inside.
        return{
            ...state,
            basket: [...state.basket,action.item],
        };

    case "REMOVE_FROM_BASKET":
    /**
      IF WE USED THIS CODE THEN IF eg WE ADDED 3 ITEMS OF SAME TYPE IT WILL REMOVE ALL 3. filter means remove
     return{
         ...state,
         basket: state.basket.filter(item=> item.id!==action.id)
        }
    */   

    // So here first we find index of item we need to delete by findIndex function.Isse index miljayea us element ka jo delete krna
    // So it will return true on first match. 
    const index=state.basket.findIndex(
            (basketItem) => basketItem.id=== action.id
        );

        // here make a newBasket and copy everything our state.basket had.
        let newBasket=[...state.basket];

        // ie we actually found the object
        if(index>=0)
        {
            newBasket.splice(index,1);
            // role of splice is at position index remove 1 element.
        }
        else
        {
            console.warn(
                `Cant remove product (id:${action.id}) as its not in basket!`
            )
        }
        /// ...state means current state
        return {
            ...state,
            basket:newBasket
            // now basket will be our newBasket.
        }
        // Here we will giving a default state. 
       
       case "SET_USER":
        // here we will return all the state and the user action.
          return{
              ...state,
              user: action.user 
            //here action is set user and we set user as action.user,

          }
       
        default:
            return state;
 }


}

export default reducer;









