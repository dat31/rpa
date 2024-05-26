function formatDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const hh = today.getHours();
  const min = today.getMinutes();

  return `${mm}${dd}${hh}${min}`;
}

module.exports = formatDate;
