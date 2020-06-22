import SearchIcon from "../Icons/SearchIcon";
import { FunctionComponent, ChangeEvent } from "react";

interface SearchInputProps {
  alignIcon?: "right" | "left";
  onChange?: (val: string) => void;
}

export const SearchInput: FunctionComponent<SearchInputProps> = ({
  alignIcon = "left",
  onChange,
}) => {
  const handleInputChange = (val: ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(val.target.value);

  return (
    <span className="relative flex-initial">
      <span
        className={`absolute ${
          alignIcon === "right" ? "right-0" : ""
        } m-2 text-gray-600 w-4 h-4 focus:outline-none focus:shadow-outline`}
        tabIndex={1}
      >
        <SearchIcon></SearchIcon>
      </span>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search"
        className={`border-2 border-gray-300 rounded ${
          alignIcon === "left" ? "pl-8" : "pl-2"
        } focus:outline-none focus:shadow-outline`}
      />
    </span>
  );
};

export default SearchInput;
