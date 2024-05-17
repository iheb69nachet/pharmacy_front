import axios from "./index";


class UsersApi {
  static fetchUsers = () => {

    return axios.get(`/users`);
  };
  static fetchUser = (id) => {

    return axios.get(`/user/${id}`);
  };
  static AddUsers = (data) => {
    return axios.post(`/add/users`,data);
  };
  static EditUser = (id,data) => {
    return axios.post(`/edit/user/${id}`,data);
  };
  static DeleteUser = (id) => {
    return axios.post(`/delete/user/${id}`);
  };


}


export default UsersApi;
