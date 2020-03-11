import React, { useMemo, useState } from "react";
import Line from "./Line.js";
import getBatteryData, { getKeys } from "../utils/getBatteryData.js";
import className from "classnames";
import getDictionaryKeysValue from "../utils/getDictionaryKeysValue.js";
import getStartEndDates from "../utils/getStartEndDates.js";
import PercentageIncrease from "./PecentageIncrease.js";

const dictionaryKeyValue = getDictionaryKeysValue();

function BatteryData() {
  const keys = useMemo(() => getKeys("BatteryData"), []);
  const [selectedKey, setSelectedKey] = useState("TotalBatCur");
  const data = useMemo(() => getBatteryData(selectedKey), [selectedKey]);
  const { startDate, endDate } = getStartEndDates();

  const dictionaryKey = dictionaryKeyValue[selectedKey] || selectedKey;

  return (
    <>
      <div className="w-full sm:w-2/3 p-3">
        <div className="card">
          {/* <!-- details -->  */}
          <div className="flex my-5">
            <div className="p-3 rounded-full flex-shrink-0	bg-orange-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-orange-600 stroke-current fill-current"
              >
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
                <path d="M23 13v-2" />
              </svg>
            </div>
            <div className="flex-1 ml-2 text-xl">
              Battery data
              <span className="text-gray-600 text-lg">
                {/* Use dictionary */}({dictionaryKey})
              </span>
              <p className="text-sm text-gray-700">
                from {new Date(startDate).toGMTString()} to{" "}
                {new Date(endDate).toGMTString()}
              </p>
            </div>
          </div>
          {/* <!-- filter --> */}
          <div className="w-full text-xs overflow-scroll flex py-3">
            {keys.map(key => (
              <button
                onClick={() => setSelectedKey(key)}
                className={className(
                  "border-orange-500 delay-100 transition ease border focus:shadow-outline focus:outline-none rounded-full px-3 p-1 whitespace-no-wrap mx-1",
                  { "bg-orange-500 text-white": selectedKey === key }
                )}
              >
                {key}
              </button>
            ))}
          </div>
          {/* <!-- end filter --> */}
          <div style={{ height: "50vh" }}>
            <Line data={data} />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/3 p-3">
        <PercentageIncrease
          first={data[0].data[0].y}
          last={data[0].data[data[0].data.length - 1].y}
          dictionaryKey={dictionaryKey}
        />
      </div>
    </>
  );
}

export default BatteryData;
