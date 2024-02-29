import { createContext, useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Landing from "./components/Landing";
import Error from "./components/Error";
import MainInfo from "./components/MainInfo";
import { Toaster } from "react-hot-toast";
import { lookInSession } from "./utils/session";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";

export const CarModel = createContext();
function App() {
  const [manufacturer, setManufacturer] = useState("mercedes");
  const [input, setInput] = useState("");
  const [pageStatus, setPageStatus] = useState("landing");
  const [data, setData] = useState("");
  const [user, setUser] = useState(null);

  useState(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setUser(JSON.parse(userInSession));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <CarModel.Provider
      value={{
        manufacturer,
        setManufacturer,
        input,
        setInput,
        pageStatus,
        setPageStatus,
        data,
        setData,
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <div className="">
                <Header />
                {pageStatus === "landing" ? <Landing /> : ""}
                {pageStatus === "loading" ? <Loading /> : ""}
                {pageStatus === "error" ? <Error /> : ""}
                {pageStatus === "mainInfo" ? <MainInfo /> : ""}
                {/* <Loading />  */}
                {/* <Landing /> */}
                {/* <Error /> */}
              </div>
            }
          />
          <Route path="/userdashboard" element={<UserDashboard/>} />
        </Routes>
      </BrowserRouter>
    </CarModel.Provider>
  );
}

export default App;
