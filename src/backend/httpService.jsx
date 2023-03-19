import axios from "axios";
import ToastMessageService from "../Components/ToastMessageService";

const authToken = localStorage.getItem("access_token");

axios.defaults.baseURL = "https://localhost:4000";
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

axios.interceptors.response.use(null, (error) => {
  if (error?.response?.status === 404) {
    return;
  }

  if (error?.response.status === 401) {
    handleLogout();
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

const handleLogout = () => {
  // clear the access token from local storage or from state if you're using context

  ToastMessageService.ToastInfo("Please login again");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiry_date");
  window.location.href = "http://localhost:5173/";
};
