import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useFetch = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [_, setUserData] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);

    apiCall({
      credential: response.credential,
    })
      .then((res) => {
        setLoading(false);
        return res?.data;
      })
      .then((data) => {
        if (data?.user) {
          // eslint-disable-next-line no-unused-vars
          setUserData(data?.user);
          setToken(data.user?.token);
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
