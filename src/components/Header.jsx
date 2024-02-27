import React, { useContext, useState } from "react";
import { CarModel } from "../App";
import bmw from "../img/bmw.svg";
import mercedes from "../img/mercedes.svg";
import cross from "../img/cross.svg";
import toast from "react-hot-toast";
import axios from "axios";

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
  const bmwSites =["bmwpartsnow.com"]

  const mercedesSitesLinks = [
    "https://www.mboemparts.com/search?search_str=",
    "https://www.mercedesbenzpartsshop.com/search?search_str=",
    "https://www.mercedespartscenter.com/search?search_str=",
    "https://www.mbdirectparts.com/search?search_str=",
    "https://www.mercedesbenzpartsstore.com/search?search_str=",
    "https://mbparts.mbusa.com/search?search_str=",
    "https://www.mbonlineparts.com/search?search_str="
  ];
  const bmwSitesLinks = ["https://www.bmwpartsnow.com/search?search_str="]

  const [activeSite, setActiveSite] = useState(mercedesSitesLinks[0]);

  const handleSelectSite = (e) => {
    setActiveSite(e.target.value);
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
        console.log(res.data);
        if (res.status === 200) {
          setData(res.data);
          setPageStatus("mainInfo");
        } else {
          setPageStatus("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setPageStatus("error");
        toast.error("Помилка отримання даних, або cors виключений");
      });
  };

  const handleSelect = (e) => {
    console.log(e.target.value);

    setManufacturer(e.target.value);
    setActiveSite(() => {
      if (e.target.value==='bmw'){
        return bmwSitesLinks[0]
      }else if (e.target.value==='mercedes'){
        return mercedesSitesLinks[0]
      }
    })
    setInput("");
    setPageStatus("landing");
  };
  return (
    <nav className="header-bg py-[50px]" id="top">
      <div className="max-w-[1200px] px-6 mx-auto">
        <h1 className="text-white text-[51px] mb-4">Get car part info</h1>
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
                    checked={manufacturer === "bmw"}
                  />
                  <span className="checkmark"></span>
                  bmw
                </label>
              </div>
              <div className="">
                <span className="text-white text-[21px]">
                  Enter part link from one of
                </span>
                <select
                  onChange={handleSelectSite}
                  className="bg-transparent text-white text-[21px] outline-none underline max-w-[200px] truncate"
                  value={activeSite}
                >
                {manufacturer === "mercedes" ?mercedesSites.map((site, i) => (
                    <option key={i} value={mercedesSitesLinks[i]}>
                      {site}
                    </option>
                  )) :bmwSites.map((site, i) => (
                    <option key={i} value={bmwSitesLinks[i]}>
                      {site}
                    </option>
                  ))}
                  
                  {/* <option value="site1">siteone</option>
                <option value="site2">sitetwo</option> */}
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
                  className="w-full rounded-r-lg h-[50px] indent-5 outline-none"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    manufacturer == "bmw"
                      ? "Enter BMW part number"
                      : "Enter Mercedes part number"
                  }
                />
                <img
                  onClick={() => setInput("")}
                  className="absolute cursor-pointer right-0 top-0 bg-white p-4 rounded-r-lg"
                  src={cross}
                  alt="close"
                />
              </div>
            </div>
          </div>

          <div className="">
            <button
              onClick={handleGetInfo}
              className="bg-black text-white uppercase font-bold cursor-pointer px-[20px] py-[14px] rounded-lg text-center leading-12"
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
