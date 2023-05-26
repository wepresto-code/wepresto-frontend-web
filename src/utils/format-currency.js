// function to format currency
const formatCurrency = (value = 0, currency = "COP") => {
  return new Intl.NumberFormat("default", {
    style: "currency",
    currency,
  }).format(value);
};

export default formatCurrency;
