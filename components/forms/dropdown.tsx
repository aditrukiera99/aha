import React, { useMemo, useState } from "react";
import { IDropdown } from "../../ts/typing/interfaces";

const Dropdown = (props: IDropdown) => {
  let className =
    "w-full border border-solid rounded-md px-2.5 py-1.5 pr-5 bg-chroma-white hover:cursor-pointer select-none border-chroma-dark text-ellipsis ";
  className =
    props.className != undefined ? props.className + className : className;
  const [value, setValue] = useState<number | string>(
    props.value != undefined ? props.value : 0
  );
  const selected = value == undefined || !value ? true : false;

  const onDropdownChange = (event: any) => {
    setValue(event.target.value);
    props.onSelected(event.target.value);
  };

  const classSelect = useMemo(() => {
    const classFinal =
      className + (value == 0 ? "text-chroma-darkest" : "text-chroma-darkest");
    return classFinal;
  }, [value, className]);

  return (
    <div className={props.containerClass ?? ""}>
      {props.label != undefined && <p className="mb-2">{props.label}</p>}
      <select
        className={" " + classSelect}
        onChange={(event) => onDropdownChange(event)}
      >
        {props.placeholder != undefined && (
          <option className="py-10" value={0}>
            {props.placeholder} {selected}
          </option>
        )}
        {props.objects.map((element) => (
          <option
            key={element.value}
            className="py-10"
            value={element.value}
            disabled={element.disabled}
            selected={element.disabled}
          >
            {element.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
