import React, { useMemo, useState } from "react";
import Line from "./Line.js";
import getInverterDataById, {
  getKeys,
  getInvertersId
} from "../utils/getInverterData";
import className from "classnames";
import getDictionaryKeysValue from "../utils/getDictionaryKeysValue.js";
import getStartEndDates from "../utils/getStartEndDates.js";
import PercentageIncrease from "./PecentageIncrease.js";

const dictionaryKV = getDictionaryKeysValue();

function InverterData() {
  const inverterIds = getInvertersId();
  const [selectedInverterId, setSelectedInverterId] = useState(inverterIds[0]);
  const keys = getKeys([
    "PVInV1",
    "PVInV2",
    "PVInA1",
    "1616",
    "PVInA2",
    "InverterId"
  ]); //Exclude "InverterId" and pv related data
  const [selectedKey, setSelectedKey] = useState(() => keys[0]);

  const data = useMemo(
    () => getInverterDataById(selectedKey, selectedInverterId),
    [selectedKey, selectedInverterId]
  );
  const { startDate, endDate } = getStartEndDates();

  const dictionaryKey = dictionaryKV[selectedKey] || selectedKey;

  return (
    <>
      <div className="w-full sm:w-2/3 p-3">
        <div className="card">
          {/* <!-- details -->  */}
          <div className="flex my-5">
            <div className="p-3 bg-green-200 w-12 h-12 flex justify-center items-center rounded-full flex-shrink-0">
              <svg
                width="16"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600 stroke-current fill-current"
              >
                <path d="M15.8 6.317a.942.942 0 00-.606-.216c-.049 0-.12.01-.215.029l-7.07 1.413L10.963.865a.508.508 0 00.09-.26c0-.163-.078-.304-.232-.425a.902.902 0 00-.572-.18H4.393a.946.946 0 00-.5.13.636.636 0 00-.285.331l-3.589 11.9c-.06.23.018.418.232.562a.954.954 0 00.554.159c.095 0 .166-.005.214-.014l7.248-1.457L4.75 23.265a.459.459 0 00.08.432.765.765 0 00.456.274c.119.02.202.029.25.029.345 0 .595-.12.75-.36l9.64-16.688c.13-.23.089-.442-.126-.635z" />
              </svg>
            </div>
            <div className="flex-1 ml-2 text-xl">
              Inverter data
              <span className="text-gray-600 text-lg">
                {/* Use dictionary */}(
                {dictionaryKV[selectedKey] || selectedKey})
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

          <div style={{ height: "50vh" }}>
            <Line data={data} />
          </div>
          <div className="flex justify-center">
            <select
              className="form-select block mt-1"
              onChange={e => setSelectedInverterId(e.target.value)}
            >
              {inverterIds.map(id => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
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

export default InverterData;
