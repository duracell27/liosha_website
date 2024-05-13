import React, { useContext, useEffect, useState } from "react";
import { CarModel } from "../App";
import bmw from "../img/bmw.svg";
import mercedes from "../img/mercedes.svg";
import moon from "../img/moon.svg";
import sun from "../img/sun.svg";
import cross from "../img/cross.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { logoutUser, storeInSession } from "../utils/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  let {
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
    dark,
    darkModeHandler,
  } = useContext(CarModel);

  const mercedesSites = [
    "mboemparts.com",
    "mercedesbenzpartsshop.com",
    "mercedespartscenter.com",
    "mbdirectparts.com",
    "mercedesbenzpartsstore.com",
    "mbparts.mbusa.com",
    "mbonlineparts.com",
  ];
  const bmwSites = ["bmwpartsnow.com"];

  const mercedesSitesLinks = [
    "https://www.mboemparts.com/search?search_str=",
    "https://www.mercedesbenzpartsshop.com/search?search_str=",
    "https://www.mercedespartscenter.com/search?search_str=",
    "https://www.mbdirectparts.com/search?search_str=",
    "https://www.mercedesbenzpartsstore.com/search?search_str=",
    "https://mbparts.mbusa.com/search?search_str=",
    "https://www.mbonlineparts.com/search?search_str=",
  ];
  const bmwSitesLinks = ["https://www.bmwpartsnow.com/search?search_str="];

  const [activeSite, setActiveSite] = useState(mercedesSitesLinks[0]);
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [storages, setStorages] = useState(null);
  const [activeStorage, setActiveStorage] = useState(null);

  const handleSelectSite = (e) => {
    setActiveSite(e.target.value);
  };

  const handleLogin = () => {
    setShowLoginFields(!showLoginFields);
    if (name.length > 0 || password.length > 0) {
      axios
        .post(process.env.REACT_APP_BASE_URL + "/login", { name, password })
        .then((response) => {
          if (response.status === 200) {
            storeInSession("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            setShowLoginFields(false);
            setName("");
            setPassword("");
          }
        });
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const handleGetInfo = () => {
    if (manufacturer === "bmw" && input.includes("mercedes")) {
      toast.error("можливо ви ввели ссилку від мерседес");
      return;
    }

    if (manufacturer === "mercedes" && input.includes("bmw")) {
      toast.error("можливо ви ввели ссилку від bmw");
      return;
    }

    if (!input.length) {
      toast.error("Поле посилання не може бути пустим");
      return;
    }

    setPageStatus("loading");
    axios
      // .get(`https://www.mboemparts.com/search?search_str=${input}`)
      .get(`${activeSite}${input}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setPageStatus("mainInfo");
        } else {
          setPageStatus("error");
        }
      })
      .catch((err) => {
        setPageStatus("error");
        toast.error("Помилка отримання даних, або cors виключений");
      });
  };

  const handleSelect = (e) => {
    setManufacturer(e.target.value);
    setActiveSite(() => {
      if (e.target.value === "bmw") {
        return bmwSitesLinks[0];
      } else if (e.target.value === "mercedes") {
        return mercedesSitesLinks[0];
      }
    });
    setInput("");
    setPageStatus("landing");
  };

  const getAvailableStorages = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "/getAvaliableStorages", {
        id: user.id,
      })
      .then((response) => {
        if (response.status === 200) {
          setStorages(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchByEnter = (e) => {
    if (e.key === "Enter") {
      handleGetInfo();
      console.log('enter ')
    }
  }

  console.log(storages);

  useEffect(() => {
    if (user) {
      getAvailableStorages();
    }
  }, [user]);

  return (
    <nav
      className={`${dark ? "header-bg-dark" : "header-bg"} py-[50px]`}
      id="top"
    >
      <div className="max-w-[1200px] px-6 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-[51px] mb-4">Get car part info</h1>
          <div className="flex items-center gap-3">
            {/* {showLoginFields ? (
              <>
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            ) : (
              ""
            )}
            {user ? (
              <div>
                <img src={user.img} className="w-4 h-4" alt="usericon" />
                <p>{user.name}</p>
              </div>
            ) : (
              ""
            )}
            {user ? (
              <button
                className="p-2 bg-black text-white"
                onClick={handleLogout}
              >
                logout
              </button>
            ) : (
              <button className="p-2 bg-black text-white" onClick={handleLogin}>
                login
              </button>
            )} */}

            <button
              className="flex items-center justify-center "
              onClick={() => darkModeHandler()}
            >
              {dark && (
                <FontAwesomeIcon
                  icon={faSun}
                  className="bg-black text-white p-3"
                />
              )}
              {!dark && (
                <FontAwesomeIcon
                  icon={faMoon}
                  className="bg-black text-white p-3"
                />
              )}
            </button>
          </div>
        </div>
        <div className="mb-3">
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 text-white">
              <label className="labelRadio flex items-center">
                <input
                onChange={handleSelect}
                  className="labelRadioInput"
                  type="radio"
                  name="manufacturer"
                  value="mercedes"
                />
                <span className="checkmark"></span>
                mercedes
              </label>
              <label className="labelRadio flex items-center">
                <input
                onChange={handleSelect}
                  className="labelRadioInput"
                  type="radio"
                  name="manufacturer"
                  value="bmw"
                />
                <span className="checkmark"></span>
                bmw
              </label>
            </div>
            <div className="">
              <span className="text-white text-[21px]">
                Enter part link from one of
              </span>
              <select className="bg-transparent text-white text-[21px] outline-none underline">
                <option value="select">these websites</option>
                <option value="site1">siteone</option>
                <option value="site2">sitetwo</option>
              </select>
            </div>
          </div> */}
        </div>
        <div className="flex gap-3 h-13 items-end">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-5 text-white">
                <label className="labelRadio flex items-center">
                  <input
                    onChange={handleSelect}
                    className="labelRadioInput"
                    type="radio"
                    name="manufacturer"
                    value="mercedes"
                    checked={manufacturer === "mercedes"}
                  />
                  <span
                    className={`checkmark ${dark && "checkmark-dark"}`}
                  ></span>
                  mercedes
                </label>
                <label className="labelRadio flex items-center">
                  <input
                    onChange={handleSelect}
                    className="labelRadioInput"
                    type="radio"
                    name="manufacturer"
                    value="bmw"
                    checked={manufacturer === "bmw"}
                  />
                  <span
                    className={`checkmark ${dark && "checkmark-dark"}`}
                  ></span>
                  bmw
                </label>
              </div>
              <div className="">
                <span className="text-white text-[21px]">
                Pulling data from
                </span>
                <select
                  onChange={handleSelectSite}
                  className="bg-transparent text-white text-[21px] outline-none underline max-w-[200px] truncate"
                  value={activeSite}
                >
                  {manufacturer === "mercedes"
                    ? mercedesSites.map((site, i) => (
                        <option key={i} value={mercedesSitesLinks[i]}>
                          {site}
                        </option>
                      ))
                    : bmwSites.map((site, i) => (
                        <option key={i} value={bmwSitesLinks[i]}>
                          {site}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="flex border border-black rounded-lg">
              <div className="bg-yellow rounded-l-lg overflow-hidden min-w-[50px] flex justify-center items-center gap-1">
                <img
                  className="w-[20px] h-[20px]"
                  src={manufacturer == "bmw" ? bmw : mercedes}
                  alt="logo"
                />
              </div>
              <div className="relative flex-1">
                <input
                  className="w-full rounded-r-lg h-[50px] indent-5 outline-none dark:bg-dark-input-bg dark:text-dark-button-bg"
                  type="text"
                  value={input}
                  onKeyUp={handleSearchByEnter}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    manufacturer == "bmw"
                      ? "Enter BMW part number"
                      : "Enter Mercedes part number"
                  }
                />
                {/* <img
                  onClick={() => setInput("")}
                  className="absolute cursor-pointer right-0 top-[1px] bg-white dark:bg-transparent p-4 rounded-r-lg"
                  src={cross}
                  alt="close"
                /> */}

                <FontAwesomeIcon
                  onClick={() => setInput("")}
                  className={`absolute cursor-pointer w-6 h-6 right-0 top-[1px] bg-white dark:bg-transparent p-3 rounded-r-lg ${dark?'dark:text-yellow':'text-darkgray'}`}
                  icon={faXmark}
                />
              </div>
            </div>
          </div>

          <div className="">
            <button
              onClick={handleGetInfo}
              className="bg-black dark:bg-dark-button-bg text-white dark:text-black uppercase font-bold cursor-pointer px-[20px] py-[14px] rounded-lg text-center leading-12"
            >
              Get information
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
