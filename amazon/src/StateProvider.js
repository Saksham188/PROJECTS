// Its for using API to store in cart as told in Subtotal.js

import React, {createContext,useContext,useReducer} from "react"

// It prepares the data Layer jisme ham bhej skte items.
export const StateContext=createContext();

// It wraps our app and provide data layer to all our components
export const StateProvider=({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

// Pull information from datalayer.
export const useStateValue=()=>useContext(StateContext);











