import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useFetch = (apiCall) => {
  console.log("chceking");
  const [loading, setLoading] = useState(false);
  const [_, setUserData] = useLocalStorage("user");
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
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        console.log("error", error?.message);
        setLoading(false);
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
