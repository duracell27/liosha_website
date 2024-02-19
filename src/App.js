import { createContext, useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Landing from "./components/Landing";
import Error from "./components/Error";
import MainInfo from "./components/MainInfo";
import { Toaster } from "react-hot-toast";

export const CarModel = createContext();
function App() {
  const [manufacturer, setManufacturer] = useState("mercedes");
  const [input, setInput] = useState("");
  const [pageStatus, setPageStatus] = useState("landing");
  const [data, setData] = useState("");

  return (
    <CarModel.Provider
      value={{ manufacturer, setManufacturer, input, setInput,pageStatus, setPageStatus,data, setData}}
    >
      <div className="">
        <Toaster/>
        <Header />
        {pageStatus === "landing" ? (<Landing/>):''}
        {pageStatus === "loading" ? (<Loading/>):''}
        {pageStatus === "error" ? (<Error/>):''}
        {pageStatus === "mainInfo" ? (<MainInfo/>):''}
        {/* <Loading />  */}
        {/* <Landing /> */}
        {/* <Error /> */}

      </div>
    </CarModel.Provider>
  );
}

export default App;
