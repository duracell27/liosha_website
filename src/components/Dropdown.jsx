import React, { useContext, useState } from "react";
import { CarModel } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ dropdownHeading, data, highlightFn, highlightArray ,manufacturer}) => {
  const [isOpen, setIsOpen] = useState(true);
  let { dark } = useContext(CarModel);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const keysIds = [];
  data.map((obj, index) => {
    Object.keys(obj).map((keyName, index) => {
      keysIds.push(keyName);
    });
  });
  // let convertedArray = Object.fromEntries(
  const showHighlightHeader = keysIds.every((id) =>
    highlightArray.includes(id)
  );
  

  return (
    <div className="my-10 text-black dark:text-dark-text">
      <button
        className={`w-full ${
          showHighlightHeader
            ? "dark:bg-dark-green bg-yellow"
            : "dark:bg-dark-input-bg bg-input-bg"
        } text-left pl-6  h-[38px] text-[13px] border-b border-dark-border`}
        onClick={() => {
          highlightFn(null, "arr", keysIds);
        }}
      >
        <div className="flex items-center"> 
          
          <label className="flex gap-3 leading-4">
          <input
            type="checkbox"
            checked={showHighlightHeader}
            className="appearance-none cursor-pointer relative peer  w-4 h-4 border border-black dark:border-yellow rounded-sm bg-transparent checked:dark:bg-yellow checked:bg-dark-green checked:border-0"
          />
            <strong>{dropdownHeading}{' '}{manufacturer === 'mercedes'?'Class':'Series'}</strong>
          </label>
          {showHighlightHeader && <FontAwesomeIcon icon={faCheck} className="absolute pointer-events-none w-4 h-4 dark:text-dark-bg text-dark-button-bg"/>}
          
        </div>
      </button>
      <ul>
        {isOpen &&
          data.map((obj, index) => {
            return Object.keys(obj).map((keyName, index) => (
              <li
                key={index}
                onClick={() => highlightFn(keyName, "single")}
                className={`${
                  highlightArray.includes(keyName)
                    ? "dark:bg-dark-green bg-yellow"
                    : "dark:bg-dark-input-bg bg-input-bg"
                } cursor-pointer flex   h-[38px] border-b border-dark-border items-center text-[13px]`}
              >
                <span className="w-[250px] pl-[52px]">{keyName}</span>
                <span>{obj[keyName]}</span>
              </li>
            ));
          })}
      </ul>
    </div>
  );
};

export default Dropdown;
