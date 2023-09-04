import { CurrencyCode, SearchResultPrice } from "@/__generated__/graphql";

export const formatCurrency = (price: any, currencyCode: CurrencyCode) => {
  return new Intl.NumberFormat("vi", {
    currency: currencyCode,
    style: "currency",
  }).format(price / 100);
};

export const formatPrice = (
  price: SearchResultPrice,
  currencyCode: CurrencyCode
) => {
  if (price.__typename === "SinglePrice") {
    return formatCurrency(price.value, currencyCode);
  }
  if (price.__typename === "PriceRange") {
    if (price.min === price.max) {
      return formatCurrency(price.min, currencyCode);
    }
    return `${formatCurrency(price.min, currencyCode)}-${formatCurrency(
      price.max,
      currencyCode
    )}`;
  }
  return "N/A";
};
