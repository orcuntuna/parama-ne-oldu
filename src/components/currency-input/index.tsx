import React from "react";
import ErrorMessage from "../error-message";

type CurrencyInputProps = {
  placeholder: string;
  value: number | string | undefined;
  error: any;
  type: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CurrencyInput = ({
  placeholder,
  value,
  type,
  id,
  error,
  onChange
}: CurrencyInputProps) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
      {error && <ErrorMessage message={error.message} />}
    </>
  );
};

export default CurrencyInput;
