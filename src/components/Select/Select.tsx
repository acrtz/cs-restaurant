import React, { ChangeEvent } from "react";
import "./Select.css";

export interface SelectProps {
  selected: string | string[];
  options: { id: string; name: string }[];
  onChange: (event: ChangeEvent) => void;
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className="select-container">
      {props.options.map((option, i) => (
        <label htmlFor={`option${i}`} key={i}>
          <input
            data-testid={`checkbox-${option.id}`}
            type="checkbox"
            id={`option${i}`}
            name={`option${i}`}
            checked={
              Array.isArray(props.selected)
                ? props.selected.some((id) => id === option.id)
                : props.selected === option.id
            }
            onChange={props.onChange}
          />
          <div>{option.name}</div>
        </label>
      ))}
    </div>
  );
};

export default Select;
