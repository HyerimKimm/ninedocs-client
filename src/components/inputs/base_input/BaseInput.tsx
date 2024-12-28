import React from "react";
import { useFormContext } from "react-hook-form";

import classes from "./BaseInput.module.scss";

type BaseInputProps = {
  type: "text" | "number" | "password" | "";
  placeholder: string;
  disabled?: boolean;
  width?: "fit-content" | 0 | string;
  align: "center" | "start" | "end";
  registerName: string;
  registerOption: object;
  maxLength?: number;
};

const BaseInput: React.FC<BaseInputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  registerName,
  registerOption,
  maxLength = 100,
}) => {
  const methods = useFormContext();

  const isSubmitted = methods.formState.isSubmitted;

  const error = methods.formState.errors[registerName];

  return (
    <div className={classes.input_wrap}>
      <input
        type={type}
        placeholder={placeholder}
        width="100%"
        className={classes.input}
        disabled={disabled}
        maxLength={maxLength}
        {...methods.register(registerName, { ...registerOption })}
      />
      {!!isSubmitted && !!error && (
        <span className={classes.error_text}>{error.message as string}</span>
      )}
    </div>
  );
};

export default BaseInput;
