import logs from "../data/logs.json";

/**
 * Generate data for charts
 * @param {string} key 
 * @param {string} inverterId
 */
export default function getIntervalData(key, inverterId) {
  const data = {
    id: key,
    data: logs.map(log => {
      const x = log.payload.Timestamp;
      let yValue =
        log.payload.InverterData.find(
          ({ InverterId: id }) => inverterId === id
        ) || {};

      const y = !isNaN(Number(yValue[key])) ? Number(yValue[key]) : 0;
      return { x, y };
    })
  };

  return [data];
}
/**
 * Get the keys for "InterverData" object
 * @param {Array} except list of keys to exclude
 */
export function getKeys(except = []) {
  return Object.keys(logs[0].payload.InverterData[0]).filter(
    element => !except.includes(element)
  );
}
/**
 * Extract all inverterIds from data
 */
export function getInvertersId() {
  const ids = new Set();
  for (const log of logs) {
    log.payload.InverterData.forEach(({ InverterId }) => {
      if (InverterId !== "null") ids.add(InverterId);
    });
  }

  return [...ids];
}
