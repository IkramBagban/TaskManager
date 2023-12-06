import { useState, useEffect } from "react";
import { getData } from "../utils/api";

const useFetch = (endpoint) => {
  const [dataState, setDataState] = useState({
    data: null,
    isError: false,
    isLoading: true,
  });
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

  return [dataState.data, dataState.isLoading, dataState.isError];
};

export default useFetch;
