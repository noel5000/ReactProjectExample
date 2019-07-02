import axios from "axios";

axios.interceptors.response.use(
  response => {
    // Everything went well, pass only relevant data through
    return response;
  },
  error => {
    if (error.response.status === 403) {
      localStorage.setItem("visonUserToken", "{}");
      window.location.href = "/";
      return;
    }

    return error;
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  call: axios
};
