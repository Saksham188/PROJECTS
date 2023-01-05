// Its for creating amazon header which has logo,search bar and sign in order options
// All icons in front page are coming from UT so go to material-ui.com
//Type rfce and press enter and it give this body.
import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasketRounded";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  // Now we want ki upar basket mein bhi items update hote jaye add/remove krne pr.
  const [{ basket,user }, dispatch] = useStateValue();
  // Isse value miljayegi hame basket se. user ki bhi mngwa lenge yha.


  const HandleAuthentication=()=>{
    if(user) //Agar user hai aur usne dabaya signin ya signout toh sign in ta phele se isliye signout krdo.
    {
      auth.signOut(); //By this it will automatically sign the user out.
    }
  }
  

  return (
    <div className="header">
      {/* Image pr click krne se home page pr hi chala jaye. */}

      <Link to="/">
        {/* Here / tell ki home pr hi rho */}
        <img
          className="header_logo"
          src="https://www.pngmart.com/files/Amazon-Logo-Download-PNG-Image.png"
          alt="Amazon Logo"
        />
        {/* </img> */}
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        {/* ></input> */}
        {/* Logo */}
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && '/login'}> 
        {/* If there is no user and login click then only it takes to login page else seedha signout */}
          
          {/* on click handles autentication */}
          <div className="header_option" onClick={HandleAuthentication}>
            {/* Surround this header option with a link taki sign in dabaye toh sign in ho jaye. */}
            <span className="header_optionLineOne">Hello {user? user.email: 'Guest'}</span>
          
            <span className="header_optionLineTwo">{user ? 'Sign Out':'Sign In'}</span>
            {/* If user logged in then show signout option else sign in. */}
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>

        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon /> {/*Isse ham icon ko direct access krskte. */}
            {/* And now here on clicking the basket button gets increment or decrement. */}
            <span className="header_optionLineTwo header_BasketCount">
              {basket?.length}
              {/* ? isliye lagaya ki agar kisi wjh se nhi milti like basket exist na kre ya wrong value toh break out na ho jaye program. */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
