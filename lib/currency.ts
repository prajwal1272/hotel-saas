export type CurrencyInfo = {
  code: string;
  name: string;
  symbol: string;
};

export const currencies: Record<string, CurrencyInfo> = {
  INR: {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
  },

  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },

  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
  },

  AED: {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
  },

  SGD: {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
  },

  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
  },

  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
  },

  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
  },

  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },

  SAR: {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
  },

  QAR: {
    code: "QAR",
    name: "Qatari Riyal",
    symbol: "﷼",
  },
};

export const DEFAULT_CURRENCY = "INR";

export function getCurrencySymbol(
  currencyCode: string = DEFAULT_CURRENCY
) {
  return currencies[currencyCode]?.symbol ?? "₹";
}

export function formatCurrency(
  amount: number,
  currencyCode?: string
) {
  let selectedCurrency = currencyCode;

  if (!selectedCurrency && typeof window !== "undefined") {
    try {
      const businessData = localStorage.getItem(
        "hotel_saas_business"
      );

      if (businessData) {
        const business = JSON.parse(businessData);

        selectedCurrency = business.currency;
      }
    } catch {
      selectedCurrency = undefined;
    }
  }

  const finalCurrency =
    selectedCurrency || DEFAULT_CURRENCY;

  const currency = currencies[finalCurrency];

  if (!currency) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  return `${currency.symbol}${amount.toLocaleString(
    "en-IN"
  )}`;
}