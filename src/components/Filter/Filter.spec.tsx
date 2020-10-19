import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Filter from "./Filter";
import { FilterProps } from "../../types";

describe("Filter", () => {
  const defaultProps = {
    filter: {
      state: [],
      genre: [],
      attire: [],
    },
    setFilter: () => {},
    filterGroups: {
      state: [],
      genre: [],
      attire: [],
    },
  };

  const renderFilter = (props: FilterProps) => {
    return render(
      <Filter
        setFilter={props.setFilter}
        filter={props.filter}
        filterGroups={props.filterGroups}
      />
    );
  };

  it("doesn't show filter if options is an empty array", () => {
    const { queryByText } = renderFilter({
      ...defaultProps,
    });

    expect(queryByText(/By state/)).toBeNull();
  });

  it("shows filter if options is not an empty array", () => {
    const { queryByText } = renderFilter({
      ...defaultProps,
      filterGroups: {
        ...defaultProps.filterGroups,
        state: [{ id: "AL", name: "Alabama" }],
      },
    });

    expect(queryByText(/Alabama/)).not.toBeNull();
  });

  it("selecting a filter value calls set filter with correct arguments", () => {
    const setFilter = jest.fn().mockName("setFilter");
    const { queryByTestId } = renderFilter({
      ...defaultProps,
      filterGroups: {
        ...defaultProps.filterGroups,
        state: [{ id: "AL", name: "Alabama" }],
      },
      setFilter,
    });

    const checkbox = queryByTestId("checkbox-AL")!;

    fireEvent.click(checkbox);

    expect(setFilter).toHaveBeenCalledWith({
      state: ["AL"],
      genre: [],
      attire: [],
    });
  });

  it("deselecting a filter value calls set filter with correct arguments", () => {
    const setFilter = jest.fn().mockName("setFilter");
    const { queryByTestId } = renderFilter({
      ...defaultProps,
      filter: {
        state: ["AL", "OR"],
        genre: [],
        attire: [],
      },
      filterGroups: {
        ...defaultProps.filterGroups,
        state: [
          { id: "AL", name: "Alabama" },
          { id: "OR", name: "Oregon" },
        ],
      },
      setFilter,
    });

    const checkbox = queryByTestId("checkbox-AL")!;

    fireEvent.click(checkbox);

    expect(setFilter).toHaveBeenCalledWith({
      state: ["OR"],
      genre: [],
      attire: [],
    });
  });

  it("clearing filter group correctly calls setFilter ", () => {
    const setFilter = jest.fn().mockName("setFilter");
    const { queryByText } = renderFilter({
      ...defaultProps,
      filter: {
        state: ["AL", "OR"],
        genre: [],
        attire: [],
      },
      filterGroups: {
        ...defaultProps.filterGroups,
        state: [
          { id: "AL", name: "Alabama" },
          { id: "OR", name: "Oregon" },
        ],
      },
      setFilter,
    });

    const clearButton = queryByText("clear")!;

    fireEvent.click(clearButton);

    expect(setFilter).toHaveBeenCalledWith({
      state: [],
      genre: [],
      attire: [],
    });
  });
});
