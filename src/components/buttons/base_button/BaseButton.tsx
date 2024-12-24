import React from "react";

import classes from "./BaseButton.module.scss";

type BaseButtonProps = {
  type?: "button" | "submit";
  theme?: "primary" | "primary-light" | "gray" | "none";
  onClick?: () => void;
  br?: "4" | "8" | "20";
  p?: "xl" | "l" | "n" | "s";
  children?: React.ReactNode;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  type = "button",
  theme = "primary",
  onClick = () => {},
  br = "4",
  p = "n",
  children,
}) => {
  return (
    <button
      className={`${classes.button_wrap} 
        ${theme === "primary" ? classes.button_primary : undefined} 
        ${
          br === "4"
            ? classes.radius_4
            : br === "8"
              ? classes.radius_8
              : br === "20"
                ? classes.radius_20
                : undefined
        }
        ${
          p === "xl"
            ? classes.p_xl
            : p === "l"
              ? classes.p_l
              : p === "n"
                ? classes.p_n
                : p === "s"
                  ? classes.p_s
                  : undefined
        }
        `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
