import axios from "./index";


class GroupsApi {
//   static fetchCustomers = () => {

//     return axios.get(`/customers`);
//   };
//   static fetchCustomer = (id) => {

//     return axios.get(`/customer/${id}`);
//   };
  static AddGroup = (data) => {
    return axios.post(`/groups`,data);
  };


}


export default GroupsApi;
