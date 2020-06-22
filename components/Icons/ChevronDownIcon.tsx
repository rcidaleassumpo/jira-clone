import { FunctionComponent } from "react";

interface ChevronDownIcon {
  onClick: (ev: any) => void;
  open: boolean;
  size: "xs" | "sm" | "md" | "lg";
  tabIndex: number;
}

export const ChevronDownIcon: FunctionComponent<ChevronDownIcon> = ({
  size = "sm",
  onClick,
  open,
  tabIndex = 0,
}) => {
  return (
    <button onClick={onClick} tabIndex={tabIndex}>
      <svg
        className={`${size === "sm" ? "w-4 h-4" : ""} rotate-90`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        transform={open ? "rotate(180)" : ""}
      >
        <path d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  );
};

export default ChevronDownIcon;
