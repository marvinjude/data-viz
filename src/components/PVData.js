import React, { useMemo, useState } from "react";
import Line from "./Line.js";
import getInverterDataById, { getInvertersId } from "../utils/getInverterData";
import className from "classnames";
import getDictionaryKeysValue from "../utils/getDictionaryKeysValue.js";
import getStartEndDates from "../utils/getStartEndDates.js";
import PercentageIncrease from "./PecentageIncrease.js";

const dictionaryKV = getDictionaryKeysValue();

function PVData() {
  const inverterIds = getInvertersId();
  const [selectedInverterId, setSelectedInverterId] = useState(inverterIds[0]);
  const keys = ["PVInV1", "PVInV2", "PVInA1", "PVInA2"]; //Pv related keyss
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
        <div className="shadow p-4 rounded-md bg-white border border-gray-100">
          {/* <!-- details -->  */}
          <div className="flex my-5">
            <div className="p-3 bg-yellow-200 rounded-full flex-shrink-0">
              <svg
                width="24"
                height="25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-700 fill-current"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.683 23.124l5.225-1.099.29-3.392h7.605l.289 3.392 5.225 1.1.226 1.355H2.453l.23-1.356zM1.46 11.69h6.295l-.487 5.791H0l1.46-5.79zM8.846 11.69h6.322l.482 5.791H8.355l.491-5.79zM16.254 11.69h6.294L24 17.481h-7.264l-.482-5.79zM22.26 10.544h-6.105l-.41-4.91h5.275l1.24 4.91zM9.351 5.633h5.307l.41 4.91H8.941l.41-4.91zM2.99 5.633h5.275l-.41 4.91H1.748l1.24-4.91zM3.278 4.482L4.288.48h4.41l-.339 4.002H3.278zM9.45 4.482L9.79.48h4.436l.334 4.002H9.45zM15.65 4.482L15.312.48h4.418l1.001 4.002H15.65z"
                  fill="gold"
                />
              </svg>
            </div>
            <div className="flex-1 ml-2 text-xl">
              Solar Panel Data
              <span className="text-gray-60s0 text-lg">
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

export default PVData;
