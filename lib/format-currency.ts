const formatCurrency = (value?: number): string => {
  if (value == null || !Number.isFinite(value)) {
    return "-";
  }

  // Format with up to 5 decimal places
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(value);

  if (formatted.length > 10) {
    return formatted.slice(0, 10) + "...";
  }

  return formatted;
};

export { formatCurrency };
