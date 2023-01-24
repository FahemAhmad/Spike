import axios from "axios";

const authToken = localStorage.getItem("token");

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

axios.interceptors.response.use(null, (error) => {
  if (error?.response?.status === 404) {
    return;
  }
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging error", error);
    alert("An unexpected Error occurred");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
