export function formatDate(date) {
  let data = new Date(date);
  let dataFormatada =
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
  return dataFormatada;
}

export function formatDateFromServer(date) {
  const [dateFromServer] = date.split("T");
  const [year, month, day] = dateFromServer.split("-");
  const data = new Date(year, month - 1, day);
  return data;
}

export function formatTimeFromServer(date) {
  const dateTime = date.split("T");
  const time = dateTime[1].split(":", 2).join(":");
  return time;
}
