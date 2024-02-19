import React, { useContext, useState } from "react";
import copyButton from "../img/copybutton.svg";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CarModel } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const MainInfo = () => {

    let {pageStatus, setPageStatus, input, setInput,data, setData} = useContext(CarModel)

//   const [data, setData] = useState("");

  let partNumber = "";
  let replaces = "";
  let position = "";
  let description = "";
  let tableRows = [];
  let mas = [];
  let unicFromMas = [];
  let title = "";
  let compabilityObj = {};
  let replacesVariants = "";
  let images = [];

//   const handleGetInfo = () => {
    
//     setPageStatus('loading');
//     axios
//       .get(input)
//       .then((res) => {
//         if (res.status === 200) {
//           setData(res.data);
//         }
//         setPageStatus('mainInfo');
//       })
//       .catch((err) => {
//         console.log(err);
//         setPageStatus('error');
//         toast.error("Помилка отримання даних, або cors виключений");
//       });
//   };

  if (data !== "") {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");

    partNumber = htmlDoc?.getElementsByClassName("list-value sku-display")[0]
      ?.innerText;
    replaces = htmlDoc?.getElementsByClassName("product-superseded-list")[0]
      ?.childNodes[3]?.innerText;
    position =
      htmlDoc?.getElementsByClassName("positions")[0]?.childNodes[3]?.innerText;

    title = htmlDoc?.getElementsByClassName("product-title")[0]?.innerText;
    title = title?.split("(")[0];

    description = htmlDoc?.getElementsByClassName(
      "list-value description_body"
    )[0]?.childNodes[0]?.innerText;

    tableRows = htmlDoc?.querySelectorAll(".fitment-row");

    for (var i = 0; i < tableRows.length; i++) {
      mas[i] = [];
      let k = 0;
      for (var j = 0; j < tableRows[i].childNodes.length; j++) {
        if (tableRows[i].childNodes[j].innerText) {
          mas[i][k] = tableRows[i].childNodes[j].innerText;
          k++;
        }
      }
    }

    mas.filter((row) => {
      if (!unicFromMas.includes(row[2])) {
        unicFromMas.push(row[2]);
      }
    });

    mas.sort(); // від цього залежить функція sortYears
    unicFromMas.map((unicModel) => {
      let yearsArr = [];
      mas.forEach((row) => {
        if (unicModel === row[2]) {
          yearsArr.push(Number(row[0].trim()));
        }
      });
      compabilityObj[unicModel] = sortYears(yearsArr);
    });
    if (replaces?.length > 0) {
      replacesVariants = generateVariationsForReplaces(replaces, partNumber);
    }

    let ul = htmlDoc?.querySelectorAll(".secondary-images");
    ul[0].childNodes.forEach((li) => {
      if (li.childNodes.length > 0) {
        images.push(`https:${li.childNodes[1].attributes[4].value}`);
      }
    });

    compabilityObj = Object.keys(compabilityObj)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = compabilityObj[key];

        return accumulator;
      }, {});

    // console.log("obj", compabilityObj);
  }
  // ця функція приймає масив років, і сортує їх в послідовності по типу 2008-2012
  function sortYears(array) {
    if (array.length === 0) return "";

    let ranges = [];
    let start = array[0];
    let end = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i] - array[i - 1] === 1) {
        end = array[i];
      } else {
        if (start !== end) {
          ranges.push(`${start}-${end}`);
        } else {
          ranges.push(start.toString());
        }
        start = array[i];
        end = array[i];
      }
    }

    if (start !== end) {
      ranges.push(`${start}-${end}`);
    } else {
      ranges.push(start.toString());
    }

    return ranges.join(",");
  }
  function generateVariationsForReplaces(inputString, mainPartNumber) {
    let elements = inputString.split(", ");
    elements.unshift(mainPartNumber);
    let variations = [];

    elements.forEach((element) => {
      let strippedElement = element.replace(/-/g, ""); // варіація 1
      let spacedElement = element.replace(/-/g, " "); // варіація 2

      variations.push(strippedElement); // варіація 1
      variations.push(spacedElement); // варіація 2
      variations.push(element); // варіація 3

      variations.push("A" + strippedElement); // варіація 4
      variations.push("A" + spacedElement); // варіація 5
      variations.push("A" + element); // варіація 6
    });

    return variations.join(", ");
  }

  return (
    <div className="py-[50px] px-6">
      <div className="max-w-[1152px] mx-auto flex gap-7">
        <div className="w-[25%]">slider</div>
        <div className="w-[75%]">
          <div className="section">
            <h3 className="text-[36px]">Control Module - Mercedes-Benz</h3>
            <p>
              Other names: Control modules, sam. Sam-h. Control modules, signal
              acquistion.
            </p>
          </div>
          <div className="section mt-6">
            <h3 className="label">Part number</h3>
            <p>164-900-54-01 | A1649005401</p>
          </div>
          <div className="section mt-6">
            <h3 className="label">Position</h3>
            <p>No information</p>
          </div>
          <hr className="border border-gray my-12" />
          <div className="section">
            <h3 className="label">Replaces</h3>
            <div className="p-4 shadow-[0_0px_13px_-3px_rgba(0,0,0,0.5)] rounded-lg mt-2 flex gap-[15px] items-start">
              <ReactTextareaAutosize
                className="w-[96%] outline-none resize-none"
                maxRows={6}
                defaultValue="1649005401, 164 900 54 01, 164-900-54-01, A1649005401, A164
              900 54 01, A164-900-54-01, 1644403501, 164 440 35 01,
              164-440-35-01, A1644403501, A164 440 35 01, A164-440-35-01,
              1644404601, 164 440 46 01, 164-440-46-01, A1644404601, A164
              440 46 01, A164-440-46-01, 1644405401, 164 440 54 01,
              164-440-54-01, A1644405401, A164 440 54 01, A164-440-54-01,
              1645400101, 164 540 01 01, 164-540-01-01, A1645400101, A164
              540 01 01, A164-540-01-01, 1645401101, 164 540 11 01,
              164-540-11-01, A1645401101, A164 540 11 01, A164-540-11-01,
              1645402201, 164 540 22 01, 164-540-22-01, A1645402201, A164
              540 22 01, A164-540-22-01, 1645402201, 164 540 22 01,
              164-540-22-01, A1645402201, A164 540 22 01, A164-540-22-01,"
              />
              <button>
                <img src={copyButton} alt="copy"></img>
              </button>
            </div>
          </div>
          <div className="section mt-12">
            <h3 className="label">Compatibility</h3>
            <ul>
              <li className="flex gap-6 h-[38px] items-center rounded-md font-bold text-[13px]">
                <span className="min-w-[74px] pl-[24px]">№</span>
                <span className="min-w-[180px]">Model</span>
                <span className="min-w-[100px]">Years</span>
              </li>
              <li className="flex stripped gap-6 h-[38px] items-center rounded-md text-[13px]">
                <span className="min-w-[74px] pl-[24px]">1</span>
                <span className="min-w-[180px] font-semibold">1 Series M</span>
                <span className="min-w-[100px]">2008-2011</span>
              </li>
              <li className="flex stripped gap-6 h-[38px] items-center rounded-md text-[13px]">
                <span className="min-w-[74px] pl-[24px]">2</span>
                <span className="min-w-[180px] font-semibold">1 Series M</span>
                <span className="min-w-[100px]">2008-2011</span>
              </li>
            </ul>
          </div>
          <div className="section mt-12">
            <h3 className="label">Description</h3>
            <div className="p-4 shadow-[0_0px_13px_-3px_rgba(0,0,0,0.5)] rounded-lg mt-2 flex gap-[15px] items-start">
              <ReactTextareaAutosize
                className="w-[96%] outline-none resize-none whitespace-pre-line"
                maxRows={6}
              >
                {
                  'Warranty: 60 Days\n\nShipping: Free Most items ship within 24 hours of payment.\n\nMost items paid for on the weekend or holidays ship on the following business day.\n\nReturns: 30-day standard on all parts.\n\nPlease verify fitment independently prior to purchase, as the information in the "compatibility" section above is generated by eBay Motors and not from us.\n\nIf you have questions or concerns about fitment, please contact me prior to purchase. \n\nAfter you have received your product in satisfactory condition, please leave us positive feedback.\n\nIf there is a problem with your purchase, do not leave neutral or negative feedback: CONTACT ME so that we can help you to resolve your issue to your satisfaction.'
                }
              </ReactTextareaAutosize>
              <button>
                <img src={copyButton} alt="copy"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
