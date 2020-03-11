import logs from "../data/logs.json";

export default function getBatteryData(key) {
  const data = {
    id: key,
    data: logs.map(log => ({
      x: log.payload.Timestamp,
      y: !isNaN(Number(log.payload.BatteryData[key]))
        ? Number(log.payload.BatteryData[key])
        : 0
    }))
  };

  return [data];
}

export function getKeys() {
  return Object.keys(logs[0].payload.BatteryData);
}


