import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import reducer,{ initialState } from './reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Here stateProvider so that every component get access to the data layer. */}
   {/* Initial state is what is the data look like and reducer is how we manipulate the data. */}
    {/*Reducer is how we are able to dispatch our item into the data layer,Reducer plays an important part in insertion in data layer,eg add basket pe click krke ek arrow se point kra dia ye gya datalayer mei*/}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />

    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
