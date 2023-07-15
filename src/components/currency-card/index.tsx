import React from "react";

type CurrencyCardProps = {
  currencyCode: string;
  currencyName: string;
  currencyOldDate: string;
  currencyNewDate: string;
  oldCurrencyValue: number;
  currentCurrencyValue: number;
};

const CurrencyCard = ({
  currencyCode,
  currencyOldDate,
  currencyNewDate,
  currencyName,
  oldCurrencyValue,
  currentCurrencyValue
}: CurrencyCardProps) => {
  const handleColor = () => {
    switch (currencyCode) {
      case "USD":
        return "bg-green-600";
      case "EUR":
        return "bg-blue-500";
      case "Altın":
        return "bg-yellow-500";
      default:
        break;
    }
  };

  return (
    <li>
      <li className="col-span-1 flex rounded-md shadow-sm">
        <div
          className={`flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white ${handleColor()}`}
        >
          {currencyCode}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">
              {currencyName}
            </div>
            <p className="text-gray-500">
              {currencyOldDate}{" "}
              <span className="font-medium text-black">{oldCurrencyValue}</span>
            </p>
            <p className="text-gray-500">
              {currencyNewDate}:{" "}
              <span className="font-medium text-black">
                {currentCurrencyValue}
              </span>
            </p>
          </div>
        </div>
      </li>
    </li>
  );
};

export default CurrencyCard;
