
const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate}`;

function formatDateMMDDYYYY(date) {
  const formattedDate = date.toLocaleDateString("en-US");
  return `Formatted Date (MM/DD/YYYY): ${formattedDate}`;
}
console.log(formatDateMMDDYYYY(currentDate));

function formatDateLong(date) {
  const formattedDate = date.toLocaleDateString("en-US", {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return `Formatted Date (Month Day, Year): ${formattedDate}`
}
console.log(formatDateLong(currentDate));