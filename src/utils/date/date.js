export const substractDaysFromNewDate = (days = 0) =>
  new Date(new Date().setDate(new Date().getDate() - days));

export const convertDateToIsoString = (date) =>
  date.toISOString().split("T")[0];

export const addDaysFromNewDate = (days = 0) =>
  new Date(new Date().setDate(new Date().getDate() + days))
    .toISOString()
    .split("T")[0];

export const today = () => new Date().toISOString().split("T")[0];

export const addMinutes = (oldDate, minutes) =>
  new Date(oldDate.getTime() + minutes * 60000);

export const toISOStringWithTimezone = (date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - offset);
  return (
    adjustedDate.toISOString().slice(0, -1) +
    (offset > 0 ? "-" : "+") +
    String(Math.abs(offset / 3600000)).padStart(2, "0") +
    ":" +
    String(Math.abs(offset / 60000) % 60).padStart(2, "0")
  );
};

export const formatDateToBackend = (date) => {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":" +
    String(date.getSeconds()).padStart(2, "0")
  );
};

export const formatDateToDayMonthAndYear = (date) =>
  toISOStringWithTimezone(date).split("T")[0].split("-").reverse().join("/");

export const formatDateToYearMonthDate = (date) =>
  toISOStringWithTimezone(date).split("T")[0]
