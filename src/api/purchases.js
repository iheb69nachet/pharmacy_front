import axios from "./index";


class Purchases {
    static FetchPurchases = () => {

        return axios.get(`/purchases`);
      };
  static AddPurchase = (data) => {
    return axios.post(`/add/purchases`,data);
  };
  static Stats = () => {
    return axios.get(`/sales-data`);
  };
  

}


export default Purchases;
