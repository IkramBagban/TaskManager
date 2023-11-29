import React, { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      console.log("Please Provide a Valid URL.");
      return;
    }
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in useFetch Hook.", err);
        setIsError(err)
      });
  }, []);

  return { data, isError, isLoading };
};

export default useFetchData;
