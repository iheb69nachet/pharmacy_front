import axios from "./index";


class SalesApi {
    static FetchSales = () => {

        return axios.get(`/sales`);
      };
  static AddSales = (data) => {
    return axios.post(`/add/sales`,data);
  };
  static Stats = () => {
    return axios.get(`/sales-data`);
  };
  

}


export default SalesApi;
