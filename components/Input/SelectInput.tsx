import { FunctionComponent, useState, MouseEvent, useRef } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import { useOnClickOutside } from "../../utils/customHooks";

interface SelectInputOption {
  name: string;
  value: string;
}

interface SelectInputProps {
  options: SelectInputOption[];
}

const SelectInput: FunctionComponent<SelectInputProps> = ({ options }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [selectedOption, updateSelectedOption] = useState("");
  const handleClick = () => {
    toggleOpen(!isOpen);
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleOpen(!isOpen));

  const handleSelectedClick = (e: MouseEvent<HTMLButtonElement>) => {
    updateSelectedOption(e.currentTarget.textContent || "");
  };

  return (
    <div>
      <div
        onClick={handleClick}
        tabIndex={0}
        className="outline-none flex text-gray-600 justify-between w-56 text-sm bg-gray-200 border-none items-center p-1"
      >
        {selectedOption || <span>All Types</span>}
        <ChevronDownIcon
          open={isOpen}
          onClick={handleClick}
          size="sm"
          tabIndex={-1}
        ></ChevronDownIcon>
      </div>
      {isOpen && (
        <div ref={ref} className="mt-1 bg-gray-200 flex flex-col">
          {options.map((option, ind) => {
            return (
              <button
                className="text-center outline-none"
                key={ind}
                onClick={handleSelectedClick}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
