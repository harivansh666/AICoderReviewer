import { createContext, useState } from "react";

export const Response = createContext();

const ResponseProvider = ({ children }) => {
  const [response, setresponse] = useState("");
  const [isloading, setIsLoading] = useState(false);

  return (
    <Response.Provider
      value={{ response, setresponse, isloading, setIsLoading }}
    >
      {children}
    </Response.Provider>
  );
};

export default ResponseProvider;
