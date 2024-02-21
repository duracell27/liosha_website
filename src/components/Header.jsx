import React, { useContext } from "react";
import { CarModel } from "../App";
import bmw from "../img/bmw.svg";
import mercedes from "../img/mercedes.svg";
import cross from "../img/cross.svg";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {

  

  let { manufacturer, setManufacturer,input, setInput, pageStatus, setPageStatus,data, setData } = useContext(CarModel);


  const handleGetInfo = () => {

    if (manufacturer==='bmw' && input.includes("mercedes")) {
      toast.error("можливо ви ввели ссилку від мерседес");
      return;
    }

    if (manufacturer==='mercedes' && input.includes("bmw")) {
      toast.error("можливо ви ввели ссилку від bmw");
      return;
    }

    if(!input.length){
      toast.error("Поле посилання не може бути пустим");
      return;
    }
    
    setPageStatus('loading');
    axios
      .get(input)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setPageStatus('mainInfo');
        }else{
          setPageStatus('error');
        }
      })
      .catch((err) => {
        console.log(err);
        setPageStatus('error');
        toast.error("Помилка отримання даних, або cors виключений");
      });
  };

  const handleSelect = () => {
    if (manufacturer == "bmw") {
      setManufacturer("mercedes");
      setInput('');
      setPageStatus('landing')
    } else if (manufacturer == "mercedes") {
      setManufacturer("bmw");
      setInput('');
      setPageStatus('landing')
    }
  };
  return (
    <nav className="header-bg py-[50px]" id='top'>
      <div className="max-w-[1200px] px-6 mx-auto">
        <h1 className="text-white text-[51px] mb-4">Get car part info</h1>
        <div className="mb-3">
          <span className="text-white text-[21px]">
            Enter part link from one of
          </span>
          <select className="bg-transparent text-white text-[21px] outline-none underline">
            <option value="select">these websites</option>
            <option value="site1">siteone</option>
            <option value="site2">sitetwo</option>
          </select>
        </div>
        <div className="flex gap-3 h-13">
          <div className="flex-1">
            <div className="flex border border-black rounded-lg">
              <div className="bg-yellow rounded-l-lg overflow-hidden min-w-[150px] flex justify-center items-center gap-1">
                <img
                  className="w-[20px] h-[20px]"
                  src={manufacturer == "bmw" ? bmw : mercedes}
                  alt="logo"
                />
                <select
                  value={manufacturer}
                  onChange={handleSelect}
                  className="h-[50px] font-bold bg-yellow outline-none"
                >
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes</option>
                </select>
              </div>
              <div className="relative flex-1">
                <input
                  className="w-full rounded-r-lg h-[50px] indent-5 outline-none"
                  type="text"
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  placeholder={
                    manufacturer == "bmw"
                      ? "Enter BMW part link"
                      : "Enter Mercedes part link"
                  }
                />
                <img onClick={()=>setInput('')} className="absolute cursor-pointer right-0 top-0 bg-white p-4 rounded-r-lg" src={cross} alt="close" />
              </div>
            </div>
          </div>

          <div className="">
            <button onClick={handleGetInfo} className="bg-black text-white font-bold cursor-pointer px-[20px] py-[14px] rounded-lg text-center leading-12">
              Get information
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
