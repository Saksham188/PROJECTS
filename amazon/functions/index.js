const functions = require("firebase-functions");

//Here we are declaring an express app.Express is a module with functions or objects or variables assigned to it.
const express = require("express");

// In other words, CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.
const cors = require("cors");
const { response } = require("express");
const { request } = require("http");

const stripe = require("stripe")(
  "sk_test_51LU6WTSD046hcSgqucO094WpN9h1QleuzsfCDEVfyHuFpBEO7zvXMwc7zSJDO4vF9fGIFLiT59KXv15EBLzUTsLg00qi1hLigo"
);

// API

//API Config

// require('express') returns a function reference. that function is called with express() . app is an object returned by express().
const app = express();

// Middlewares
// Cors for security. Boolean - set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.

app.use(cors({ origin: true }));

//It allows us to pass data in json format.
app.use(express.json());


// API Routes

// 200 is response status for ok
app.get('/' , (request,response)=>response.status(200).send(
    'Hello World'
    ));

    // Its how async func created
app.post('/payments/create',async (request,response) => {
    const total=request.query.total; //Isse access kro us total ko jo payment mei bheja tha
    console.log("Payment req received for this amount ",total);

    // Here we create an object.
    const paymentIntent = await stripe.paymentIntent.create({
        amount:total, //Subunits of currency
        currency:"usd",
    });

    // 201- Ok Created.
    response.status(201).send({
        clientSecret: paymentIntent.ClientSecret,
    })

})

    /*
    // Ab agar upar /saksham likhdo url mei toh hello saksham aayega
    app.get('/saksham' , (request,response)=>response.status(200).send(
        'Hello Saksham'
        ));
*/

//Listen Commands
exports.api = functions.https.onRequest(app);

// This is setup neeeded to run this backend app on cloud.

// Now do , firebase emulators:start on powershell.

// Example endpoint
// http://localhost:5001/clone-2116f/us-central1/api
