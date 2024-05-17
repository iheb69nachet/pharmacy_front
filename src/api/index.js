import Axios from "axios";
import { API_SERVER } from "../config/constant";

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  // headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  async(config) => {
    let user= localStorage.getItem("user")
      if(user && JSON.parse(user)){
         user=JSON.parse(user)
        if(user.token){
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
