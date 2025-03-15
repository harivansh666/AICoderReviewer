import { createContext, useState } from "react";

export const Response = createContext()

const ResponseProvider = ({ children }) => {

    const [response, setresponse] = useState('')


    return (
        <Response.Provider value={{ response, setresponse }}>
            {children}
        </Response.Provider>
    )

}

export default ResponseProvider;