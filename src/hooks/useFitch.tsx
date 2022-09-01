import { useCallback } from "react";

const useFetch = () => {
  const FetchReqest = useCallback(async (config:{
    url:string,
    method:string,
    body:{}
  }, applyData:any) => {
    const respond = await fetch(config.url, {
      method: config.method ? config.method : "Get",
      body: config.body ? JSON.stringify(config.body) : null,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respond.json();

    applyData(data);
  }, []);
    
  return {
    FetchReqest,
  };
};

export default useFetch;
