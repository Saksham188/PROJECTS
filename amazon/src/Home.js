import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      {/* <p>Here is our home component.</p> */}
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="Image"
        />

        {/* Now we see we have 3 rows of containers ,1st has 2 box,2nd has 3 ,3rd has 1 */}
        <div className="home_row">
          <Product
            id="36478337"
            title="The Lean StartUp "
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SX329_BO1,204,203,200_.jpg"
            rating={5}
          />
          <Product
            id="45367729"
            title="Kenwood kMiz Stand Mixer for Baking,Stylish Kitchen Mixer with K-Beater,Dough Hook and Whisk,5Litre Glass Bowl"
            price={239.0}
            image="https://m.media-amazon.com/images/I/61etD4-IrPL._AC_SX425_.jpg"
            rating={4}
          />


          {/* Now ab in product ke beech mein background color dalne ke lie index.css mein background color daldo. */}
        </div>

        <div className="home_row">
          <Product
            id="45367848"
            title="CYBERPOWERPC Gamer Xtreme VR Gaming PC, Intel Core i9-12900KF 3.2GHz, GeForce RTX 3070 8GB, 16GB DDR4, 1TB NVMe PCIe SSD, Black"
            price={699.99}
            image="https://m.media-amazon.com/images/I/818SNa1ruZL._AC_SX522_.jpg"
            rating={3}
          />


          <Product
            id="45363727"
            title="Amazon Echo (3rd Generation) | Smart speaker with Alexa,Charcoal Fabric"
            price={98.99}
            image="https://m.media-amazon.com/images/I/61WUqJd4dfS._SX425_.jpg"
            rating={5}
          />


          <Product
            id="45392775"
            title="New Apple iPad Pro (12.9-inch,Wi-Fi,128GB) -Silver (4th Generation)"
            price={598.90}
            image="https://m.media-amazon.com/images/I/81+N4PFF7jS._AC_UY327_FMwebp_QL65_.jpg"
            rating={4}
          />

        </div>
        <div className="home_row">
          {/*Product */}
          <Product
            id="892618874"
            title="Samsung LC49RG90SSUXEN 49' Curved Gaming Monitor-Super Ultra Wide Dual WQHD 5120 x 1440"
            price={598.90}
            image="https://m.media-amazon.com/images/I/818jj0DF-dL._AC_SX522_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
