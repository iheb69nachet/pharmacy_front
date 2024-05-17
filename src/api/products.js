import axios from "./index";


class ProductsApi {
  static fetchproducts = () => {

    return axios.get(`/products`);
  };
  static fetchproduct = (id) => {

    return axios.get(`/product/${id}`);
  };
  static Addproducts = (data) => {
    return axios.post(`/add/products`,data);
  };
  static Editproduct = (id,data) => {
    return axios.post(`/edit/product/${id}`,data);
  };
  static Deleteproduct = (id) => {
    return axios.post(`/delete/product/${id}`);
  };


}


export default ProductsApi;
