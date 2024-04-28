import axios from "axios";

export default function baseUrl(){
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_APM_BASE_URL,
        // Optionally, you can define a custom adapter for handling HTTPS requests
        adapter: require('axios/lib/adapters/http'),
        // Configure the custom adapter to validate SSL certificates based on a specific authority
        httpsAgent: new require('https').Agent({
          // You can specify the certificate authority here, but it's not common practice in the browser
          ca: process.env.SSL_CA_BUNDLE,
        }),
      });

}
