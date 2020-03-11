import logs from "../data/logs.json";

export default function getStartEndDates() {
  return {
    startDate: logs[logs.length - 1].payload.Timestamp,
    endDate: logs[0].payload.Timestamp
  };
}
