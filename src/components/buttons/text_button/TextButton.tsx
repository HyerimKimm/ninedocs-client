import React from "react";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./TextButton.module.scss";

type TextButtonProps = {
  type?: "button" | "submit";
  theme?: "primary" | "primary-line" | "gray" | "none";
  text: string;
  size?: "small" | "normal" | "large" | "xlarge" | "h3" | "h2" | "h1";
  width?: 0 | "fit-content" | string;
  height?: string;
  br?: "0" | "4" | "8" | "20";
  p?: "xl" | "l" | "n" | "s" | "xs" | "none";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  disabled?: boolean;
};
const TextButton: React.FC<TextButtonProps> = ({
  type,
  theme,
  text,
  size = "normal",
  width = "fit-content",
  height,
  br,
  p,
  onClick,
  title,
  disabled = false,
}) => {
  return (
    <BaseButton
      type={type}
      width={width}
      height={height}
      theme={theme}
      onClick={onClick}
      br={br}
      p={p}
      title={title}
      disabled={disabled}
    >
      <span
        className={`
          ${size === "h1" && classes.h1} 
          ${size === "h2" && classes.h2} 
          ${size === "h3" && classes.h3} 
          ${size === "small" && classes.small} 
          ${size === "normal" && classes.normal} 
          ${size === "large" && classes.large} 
          ${size === "xlarge" && classes.xlarge}`}
      >
        {text}
      </span>
    </BaseButton>
  );
};

export default TextButton;
