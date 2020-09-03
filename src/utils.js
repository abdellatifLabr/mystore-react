export function formatDateTime(dateTime) {
  let date = new Date(dateTime).toLocaleDateString();
  let time = new Date(dateTime).toLocaleTimeString();
  return `${date} at ${time}`;
}