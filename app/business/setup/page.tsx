"use client";

import { FormEvent, useState } from "react";

const countryCurrencyMap: Record<
  string,
  {
    currency: string;
    currencyName: string;
    symbol: string;
  }
> = {
  India: {
    currency: "INR",
    currencyName: "Indian Rupee",
    symbol: "₹",
  },

  "United States": {
    currency: "USD",
    currencyName: "US Dollar",
    symbol: "$",
  },

  "United Kingdom": {
    currency: "GBP",
    currencyName: "British Pound",
    symbol: "£",
  },

  "United Arab Emirates": {
    currency: "AED",
    currencyName: "UAE Dirham",
    symbol: "د.إ",
  },

  Singapore: {
    currency: "SGD",
    currencyName: "Singapore Dollar",
    symbol: "S$",
  },

  Australia: {
    currency: "AUD",
    currencyName: "Australian Dollar",
    symbol: "A$",
  },

  Canada: {
    currency: "CAD",
    currencyName: "Canadian Dollar",
    symbol: "C$",
  },

  Japan: {
    currency: "JPY",
    currencyName: "Japanese Yen",
    symbol: "¥",
  },

  China: {
    currency: "CNY",
    currencyName: "Chinese Yuan",
    symbol: "¥",
  },

  Germany: {
    currency: "EUR",
    currencyName: "Euro",
    symbol: "€",
  },

  France: {
    currency: "EUR",
    currencyName: "Euro",
    symbol: "€",
  },

  Italy: {
    currency: "EUR",
    currencyName: "Euro",
    symbol: "€",
  },

  Spain: {
    currency: "EUR",
    currencyName: "Euro",
    symbol: "€",
  },

  Netherlands: {
    currency: "EUR",
    currencyName: "Euro",
    symbol: "€",
  },

  Switzerland: {
    currency: "CHF",
    currencyName: "Swiss Franc",
    symbol: "CHF",
  },

  "Saudi Arabia": {
    currency: "SAR",
    currencyName: "Saudi Riyal",
    symbol: "﷼",
  },

  Qatar: {
    currency: "QAR",
    currencyName: "Qatari Riyal",
    symbol: "﷼",
  },

  Kuwait: {
    currency: "KWD",
    currencyName: "Kuwaiti Dinar",
    symbol: "د.ك",
  },

  Oman: {
    currency: "OMR",
    currencyName: "Omani Rial",
    symbol: "﷼",
  },

  Pakistan: {
    currency: "PKR",
    currencyName: "Pakistani Rupee",
    symbol: "₨",
  },

  Bangladesh: {
    currency: "BDT",
    currencyName: "Bangladeshi Taka",
    symbol: "৳",
  },

  Nepal: {
    currency: "NPR",
    currencyName: "Nepalese Rupee",
    symbol: "₨",
  },

  "Sri Lanka": {
    currency: "LKR",
    currencyName: "Sri Lankan Rupee",
    symbol: "Rs",
  },

  "South Africa": {
    currency: "ZAR",
    currencyName: "South African Rand",
    symbol: "R",
  },

  Malaysia: {
    currency: "MYR",
    currencyName: "Malaysian Ringgit",
    symbol: "RM",
  },

  Indonesia: {
    currency: "IDR",
    currencyName: "Indonesian Rupiah",
    symbol: "Rp",
  },

  Thailand: {
    currency: "THB",
    currencyName: "Thai Baht",
    symbol: "฿",
  },

  Vietnam: {
    currency: "VND",
    currencyName: "Vietnamese Dong",
    symbol: "₫",
  },

  Philippines: {
    currency: "PHP",
    currencyName: "Philippine Peso",
    symbol: "₱",
  },

  "South Korea": {
    currency: "KRW",
    currencyName: "South Korean Won",
    symbol: "₩",
  },

  Mexico: {
    currency: "MXN",
    currencyName: "Mexican Peso",
    symbol: "MX$",
  },

  Brazil: {
    currency: "BRL",
    currencyName: "Brazilian Real",
    symbol: "R$",
  },

  Russia: {
    currency: "RUB",
    currencyName: "Russian Ruble",
    symbol: "₽",
  },

  Turkey: {
    currency: "TRY",
    currencyName: "Turkish Lira",
    symbol: "₺",
  },

  "New Zealand": {
    currency: "NZD",
    currencyName: "New Zealand Dollar",
    symbol: "NZ$",
  },
};

export default function BusinessSetup() {
  const [businessType, setBusinessType] =
    useState("Hotel");

  const [country, setCountry] =
    useState("India");

  const [currency, setCurrency] =
    useState("INR");

    const [businessName, setBusinessName] = useState("");
const [city, setCity] = useState("");
const [timezone, setTimezone] = useState("Asia/Kolkata");

  const handleCountryChange = (
    selectedCountry: string
  ) => {
    setCountry(selectedCountry);

    const currencyData =
      countryCurrencyMap[selectedCountry];

    if (currencyData) {
      setCurrency(currencyData.currency);
    }
  };

  const handleSubmit = (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const businessData = {
    businessName,
    businessType,
    country,
    city,
    currency,
    timezone,
  };

  localStorage.setItem(
    "hotel_saas_business",
    JSON.stringify(businessData)
  );

  window.location.href = "/business/modules";
};

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">

          <div className="mb-8 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827] text-xl font-bold text-white">
              H
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Hotel SaaS
              </h1>

              <p className="text-xs text-gray-500">
                Hospitality Management Platform
              </p>
            </div>

          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 text-sm">

            <div className="flex items-center gap-2">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111827] text-xs font-bold text-white">
                ✓
              </span>

              <span className="font-medium text-gray-900">
                Account
              </span>

            </div>

            <div className="h-px flex-1 bg-gray-300" />

            <div className="flex items-center gap-2">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111827] text-xs font-bold text-white">
                2
              </span>

              <span className="font-medium text-gray-900">
                Business
              </span>

            </div>

            <div className="h-px flex-1 bg-gray-300" />

            <div className="flex items-center gap-2 text-gray-400">

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold">
                3
              </span>

              <span className="hidden sm:block">
                Modules
              </span>

            </div>

            <div className="h-px flex-1 bg-gray-300" />

            <div className="flex items-center gap-2 text-gray-400">

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold">
                4
              </span>

              <span className="hidden sm:block">
                Dashboard
              </span>

            </div>

          </div>

        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-7 shadow-xl sm:p-10">

          <div className="mb-8">

            <p className="mb-2 text-sm font-medium text-gray-500">
              STEP 2 OF 4
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Set up your business
            </h2>

            <p className="mt-2 text-gray-500">
              Tell us a little about your hospitality business.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* Business Name */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Business / Hotel name
              </label>

            <input
  type="text"
  required
  value={businessName}
  onChange={(e) => setBusinessName(e.target.value)}
  placeholder="Grand Palace Hotel"
  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
/>

            </div>

            {/* Business Type */}
            <div>

              <label className="mb-3 block text-sm font-medium text-gray-700">
                Business type
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {[
                  "Hotel",
                  "Resort",
                  "Restaurant",
                  "Hotel + Restaurant",
                ].map((type) => (

                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setBusinessType(type)
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      businessType === type
                        ? "border-gray-900 bg-gray-50 ring-2 ring-gray-900/10"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >

                    <div className="font-semibold text-gray-900">
                      {type}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">

                      {type === "Hotel" &&
                        "Manage rooms, guests and reservations"}

                      {type === "Resort" &&
                        "Manage resort operations and guests"}

                      {type === "Restaurant" &&
                        "Manage restaurant and food operations"}

                      {type === "Hotel + Restaurant" &&
                        "Manage complete hospitality operations"}

                    </div>

                  </button>

                ))}

              </div>

            </div>

            {/* Location */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Country */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Country
                </label>

                <select
                  required
                  value={country}
                  onChange={(e) =>
                    handleCountryChange(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                >

                  {Object.keys(
                    countryCurrencyMap
                  ).map((countryName) => (

                    <option
                      key={countryName}
                      value={countryName}
                    >
                      {countryName}
                    </option>

                  ))}

                </select>

              </div>

              {/* City */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
<input
  type="text"
  required
  value={city}
  onChange={(e) => setCity(e.target.value)}
  placeholder="Pune"
  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
/>

              </div>

            </div>

            {/* Currency / Timezone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Currency */}
            {/* Currency */}
<div>

  <label className="mb-2 block text-sm font-medium text-gray-700">
    Currency
  </label>

  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
    
    <div>
      <div className="font-semibold text-gray-900">
        {countryCurrencyMap[country]?.currencyName}
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {countryCurrencyMap[country]?.currency}
      </div>
    </div>

    <div className="text-2xl font-bold text-gray-900">
      {countryCurrencyMap[country]?.symbol}
    </div>

  </div>

  <p className="mt-2 text-xs text-gray-500">
    Currency is automatically set based on your country.
  </p>

</div>

              {/* Timezone */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Timezone
                </label>

              <select
  required
  value={timezone}
  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                >

                  <option value="Asia/Kolkata">
                    India — IST (UTC+5:30)
                  </option>

                  <option value="America/New_York">
                    Eastern Time (UTC-5)
                  </option>

                  <option value="America/Los_Angeles">
                    Pacific Time (UTC-8)
                  </option>

                  <option value="Europe/London">
                    London (UTC+0)
                  </option>

                  <option value="Asia/Dubai">
                    Dubai (UTC+4)
                  </option>

                  <option value="Asia/Singapore">
                    Singapore (UTC+8)
                  </option>

                  <option value="Australia/Sydney">
                    Sydney (UTC+10)
                  </option>

                  <option value="Asia/Tokyo">
                    Tokyo (UTC+9)
                  </option>

                </select>

              </div>

            </div>

            {/* Continue */}
            <div className="flex justify-end border-t border-gray-100 pt-7">

              <button
                type="submit"
                className="rounded-xl bg-[#111827] px-8 py-3.5 font-semibold text-white transition hover:bg-black active:scale-[0.99]"
              >
                Continue to modules →
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}

