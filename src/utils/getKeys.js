import logs from "../data/logs.json";

/**
 * Get the keys for "InterverData" object
 * @param {Array} except list of keys to exclude
 */
export default function getKeys(except = []) {
  const keys = {
    InverterData: Object.keys(logs[0].payload["InverterData"][0]).filter(
      element => !except.includes(element)
    ),
    BatteryData: Object.keys(logs[0].payload["BatteryData"]).filter(
      element => !except.includes(element)
    ),
    SolalPanelData: ["PVInV1", "PVInV2", "PVInA1", "PVInA2"]
  };

  return keys;
}
