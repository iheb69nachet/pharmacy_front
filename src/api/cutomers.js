import axios from "./index";


class CustomersApi {
  static fetchCustomers = () => {

    return axios.get(`/customers`);
  };
  static fetchCustomer = (id) => {

    return axios.get(`/customer/${id}`);
  };
  static AddCustomers = (data) => {
    return axios.post(`/add/customers`,data);
  };
  static EditCustomer = (id,data) => {
    return axios.post(`/edit/customer/${id}`,data);
  };
  static DeleteCustomer = (id) => {
    return axios.post(`/delete/customer/${id}`);
  };


}


export default CustomersApi;
