import "./App.css";
import Takeinput from "./components/Takeinput";
import Generatedout from "./components/Generatedout";
import ResponseProvider from "./context/Response.context";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ResponseProvider>
      <div className="flex flex-col sm:flex-row">
        <Toaster />
        <Takeinput />
        <Generatedout />
      </div>
    </ResponseProvider>
  );
}

export default App;
