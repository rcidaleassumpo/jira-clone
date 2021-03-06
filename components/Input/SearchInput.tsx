import React, { FunctionComponent } from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

interface SearchInputProps {
  placeholder?: string;
  size?: "small" | "medium";
  onChange: (e: any) => void;
}

export const SearchInput: FunctionComponent<SearchInputProps> = ({
  placeholder,
  size,
  onChange,
}) => {
  return (
    <>
      <InputBase
        onChange={onChange}
        className="pl-3"
        placeholder={placeholder}
        inputProps={{ "aria-label": "Search" }}
      />
      <IconButton size={size} type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
};

export default SearchInput;
