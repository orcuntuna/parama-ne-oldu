import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  variant: "outlined" | "success";
  type: "button" | "submit" | "reset" | undefined;
};

const handleVariant = (variant: string) => {
  switch (variant) {
    case "outlined":
      return "rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
    case "success":
      return "flex justify-center items-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";
  }
};

const Button = ({
  text,
  onClick,
  type,
  variant = "outlined",
  className
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${handleVariant(variant)}`}
    >
      {text}
    </button>
  );
};

export default Button;
