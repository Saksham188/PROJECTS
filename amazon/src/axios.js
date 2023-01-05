// Axios is like a very popular fetching library and allows us to interact with API's
import axios from "axios";

// here we r going to create an object
const instance=axios.create(
    {
        // here we need to write url of our API.SInce till now we have no API so we write ... here
        baseURL:'http://localhost:5001/clone-2116f/us-central1/api'
        // API(cloud Function) URL
    });

export default instance;

















