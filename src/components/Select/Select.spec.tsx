import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Select from "./Select";
import states from "../../util/states";
import { SelectProps } from "./Select";

describe("shows and enables user to select all options ", () => {
  const defaultProps = {
    selected: [],
    multiple: true,
    options: states,
    onChange: () => {},
  };

  const renderSelect = (props: SelectProps) => {
    return render(
      <Select
        selected={props.selected}
        multiple={props.multiple}
        options={props.options}
        onChange={props.onChange}
        label={props.label}
        clear={props.clear}
      />
    );
  };

  it("shows the options", () => {
    const { getByText } = renderSelect(defaultProps);

    expect(getByText(/Alabama/)).not.toBeNull();
    expect(getByText(/Wyoming/)).not.toBeNull();
  });

  it("fires onChange event when a checkbox is clicked", () => {
    const onChange = jest.fn().mockName("onChange");
    const { getByTestId } = renderSelect({ ...defaultProps, onChange });

    fireEvent.click(getByTestId("checkbox-AL"));
    expect(onChange).toHaveBeenCalled();
  });

  it("fires clear function when a clear button is clicked", () => {
    const clear = jest.fn().mockName("clear");
    const { getByRole } = renderSelect({ ...defaultProps, clear });
    fireEvent.click(getByRole("button"));
    expect(clear).toHaveBeenCalled();
  });

  it("doesn't show select header if lable and clear() aren't passed as arguments", () => {
    const { queryByTestId } = renderSelect({ ...defaultProps });
    expect(queryByTestId("select-header")).toBeNull();
  });

  it("shows selected values as checked, and unselected values as unchecked", () => {
    const selected = ["AL", "CO"];
    const { getByTestId } = renderSelect({ ...defaultProps, selected });

    const checkboxAL = getByTestId("checkbox-AL") as HTMLInputElement;
    const checkboxCO = getByTestId("checkbox-CO") as HTMLInputElement;
    const checkboxHI = getByTestId("checkbox-HI") as HTMLInputElement;

    expect(checkboxAL.checked).toBe(true);
    expect(checkboxCO.checked).toBe(true);
    expect(checkboxHI.checked).toBe(false);
  });
});
