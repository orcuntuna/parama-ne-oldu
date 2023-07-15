import React from "react";

type CurrencySpanProps = {
  value: number;
  code: string;
};

const CurrencySpan = ({ value, code }: CurrencySpanProps) => {
  return (
    <>
      {new Intl.NumberFormat().format(value)} {code}
    </>
  );
};

export default CurrencySpan;
