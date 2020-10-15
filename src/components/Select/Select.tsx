import React from "react";
import "./Select.css";
import { SelectProps } from "../../types";

const Select: React.FC<SelectProps> = (props) => {
  return (
    <>
      {(props.label || props.clear) && (
        <div className="select-header" date-testid="select-header">
          {props.label || ""}{" "}
          {props.clear && <button onClick={props.clear}>clear</button>}
        </div>
      )}
      <div className="select-container">
        {props.options.map((option, i) => (
          <label key={i}>
            <input
              value={option.id}
              data-testid={`checkbox-${option.id}`}
              type="checkbox"
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
    </>
  );
};

export default Select;
