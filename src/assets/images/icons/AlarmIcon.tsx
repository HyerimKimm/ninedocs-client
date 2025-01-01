import React from "react";

const AlarmIcon = ({
  width = 24,
  height = 24,
  color = "var(--color_brand01)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3V5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 5C8.69 5 6 7.69 6 11V17C5 17 4 18 4 19H12M12 5C15.31 5 18 7.69 18 11V17C19 17 20 18 20 19H12"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AlarmIcon;
