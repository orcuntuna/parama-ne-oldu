import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className="text-sm text-red-300 font-semibold">{message}</div>;
};

export default ErrorMessage;
