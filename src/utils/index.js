export const getData = (path, setData) => {
  fetch(`http://localhost:3333/${path}`)
    .then((res) => res.json())
    .then((dados) => setData(dados));
};

const convertMonthNumberToName = (monthNumber) => {
  switch (monthNumber) {
    case "01":
      return "Janeiro";
    case "02":
      return "Fevereiro";
    case "03":
      return "Março";
    case "04":
      return "Abril";
    case "05":
      return "Maio";
    case "06":
      return "Junho";
    case "07":
      return "Julho";
    case "08":
      return "Agosto";
    case "09":
      return "Setembro";
    case "10":
      return "Outubro";
    case "11":
      return "Novembro";
    case "12":
      return "Dezembro";
    default:
      return "";
  }
};

export const groupDataByMonth = (data) => {
  const groupedData = {};
  data?.forEach((item) => {
    const month = item.data.split("-")[1];
    const monthName = convertMonthNumberToName(month);
    if (!groupedData[monthName]) {
      groupedData[monthName] = 0;
    }
    groupedData[monthName] += item.total;
  });
  return groupedData;
};

