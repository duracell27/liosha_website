import React, { useContext } from "react";

import { CarModel } from "../App";

const Error = () => {
  let {dark
  } = useContext(CarModel);
  return (
    <div className="py-[50px] px-6 dark:bg-dark-bg">
      <div className="max-w-[1152px] mx-auto border border-gray dark:border-dark-border rounded-lg min-h-[calc(100vh-398px)]">
        <div className="flex flex-col items-center mt-[64px]">
          
          <svg
            width="64"
            height="52"
            viewBox="0 0 64 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_52_2614)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45 35C45 34.448 44.552 34 44 34H30.72L29.948 31.684C29.812 31.276 29.43 31 29 31H20C19.448 31 19 31.448 19 32V51C19 51.552 19.448 52 20 52H44C44.552 52 45 51.552 45 51V35ZM43 36V50H21V33H28.28L29.052 35.316C29.188 35.724 29.57 36 30 36H43ZM32 41.586L28.708 38.292C28.316 37.902 27.684 37.902 27.292 38.292C26.902 38.684 26.902 39.316 27.292 39.708L30.586 43L27.292 46.292C26.902 46.684 26.902 47.316 27.292 47.708C27.684 48.098 28.316 48.098 28.708 47.708L32 44.414L35.292 47.708C35.684 48.098 36.316 48.098 36.708 47.708C37.098 47.316 37.098 46.684 36.708 46.292L33.414 43L36.708 39.708C37.098 39.316 37.098 38.684 36.708 38.292C36.316 37.902 35.684 37.902 35.292 38.292L32 41.586ZM14.032 16H14C6.274 16 0 22.274 0 30C0 37.726 6.274 44 14 44H17C17.552 44 18 43.552 18 43C18 42.448 17.552 42 17 42H14C7.378 42 2 36.622 2 30C2 23.378 7.378 18 14 18H15C15.552 18 16 17.552 16 17C16 8.704 23.186 2 32 2C40.814 2 48 8.704 48 17C48 17.552 48.448 18 49 18H50C56.622 18 62 23.378 62 30C62 36.622 56.622 42 50 42H47C46.448 42 46 42.448 46 43C46 43.552 46.448 44 47 44H50C57.726 44 64 37.726 64 30C64 22.274 57.726 16 50 16H49.968C49.422 7.098 41.594 0 32 0C22.406 0 14.578 7.098 14.032 16Z"
                fill={`${dark?'#70798C':'#DBDBDB'}`}
              />
            </g>
            <defs>
              <clipPath id="clip0_52_2614">
                <rect width="64" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="text-black dark:text-dark-button-bg mb-[48px] text-[21px]">
            Cant get info about the part
          </p>
          <p className="font-bold dark:text-dark-button-bg">
            Please make sure:
          </p>
          <p className="dark:text-dark-button-bg">
            1. Your United States VPN is turned on (If you actually located in
            US you don’t need it).
          </p>
          <p className="dark:text-dark-button-bg">
            2. You have{" "}
            <a
              className="text-blue dark:text-yellow cursor-pointer underline"
              href="https://chromewebstore.google.com/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc"
              target="blank"
            >
              CORS browser extension
            </a>{" "}
            installed and it’s working now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
