import React, { useState, useMemo, useEffect } from "react";
import logs from "../data/logs.json";
import getKeys from "../utils/getKeys";
import pick from "lodash.pick";

function getAllData() {
  let allData = {
    BatteryData: [],
    InverterData: [],
    SolalPanelData: []
  };

  for (let i = 0; i < logs.length; i++) {
    allData = {
      ...allData,
      BatteryData: [
        ...allData["BatteryData"],
        { ...logs[i].payload.BatteryData }
      ]
    };

    allData = {
      ...allData,
      InverterData: [
        ...allData["InverterData"],
        { ...logs[i].payload.InverterData[0] }
      ]
    };

    let pvRow = pick(logs[i].payload.InverterData[0], [
      "PVInV1",
      "PVInV2",
      "PVInA1",
      "PVInA2"
    ]);

    allData = {
      ...allData,
      SolalPanelData: [...allData["SolalPanelData"], { ...pvRow }]
    };
  }

  return new Promise(resolve => {
    setTimeout(() => resolve(allData), 1000);
  });
}

export default function Tables() {
  const [selectedType, setSelectedType] = useState("BatteryData");
  const allKeys = useMemo(() => getKeys(), []);
  const keys = allKeys[selectedType];
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getAllData().then(data => {
      setData(data);
      setIsFetching(false);
    });
  }, []);

  return (
    <div className="overflow-scroll flex flex-col w-full">
      <div class="card mb-5 flex-shrink-1">
        <label class="block">
          <span class="text-gray-700 text-sm">SELECT DATA TYPE</span>
          <select
            onChange={e => setSelectedType(e.target.value)}
            class="form-select block mt-1"
          >
            <option value="BatteryData">Battery </option>
            <option value="InverterData">Inverter</option>
            <option value="SolalPanelData">Solar Panel</option>
          </select>
        </label>
      </div>
      <div className="min-h-screen overflow-scroll p-0">
        <div class="flex flex-col">
          <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="card min-h-screen align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              {isFetching && (
                <div className="flex justify-center items-center h-full">
                  Loading...
                </div>
              )}
              {!isFetching && (
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      {keys.map(key => (
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          {key}
                        </th>
                      ))}
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                    {data[selectedType].map((dataRow, index) => (
                      <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          {index + 1}
                        </td>
                        {Object.keys(dataRow).map(key => (
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                              <div class="ml-4">
                                <div class="text-sm leading-5 font-medium text-gray-900">
                                  {dataRow[key]}
                                </div>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
