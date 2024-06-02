import axios from "./index";


class MessagesApi {
//   static fetchCustomers = () => {

//     return axios.get(`/customers`);
//   };
//   static fetchCustomer = (id) => {

//     return axios.get(`/customer/${id}`);
//   };
  static AddMessage = (data) => {
    return axios.post(`/message`,data);
  };


}


export default MessagesApi;
