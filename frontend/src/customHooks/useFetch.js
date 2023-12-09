import { useState, useEffect, useContext } from "react";
import { getData } from "../utils/api";
import UserContext from "../store/user-context";

const useFetch = (endpoint,forceRerender) => {
  const [dataState, setDataState] = useState({
    data: null,
    isError: false,
    isLoading: true,
  });

  const userCtx = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(endpoint);
        setDataState({ data, isError: false, isLoading: false });
      } catch (error) {
        setDataState({ data: null, isError: error.message, isLoading: false });
      }
    };

    fetchData();
  }, [endpoint]);

  return [dataState.data, dataState.isLoading, dataState.isError, !!forceRerender];
};

export default useFetch;
