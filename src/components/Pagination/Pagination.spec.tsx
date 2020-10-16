import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Pagination from "./Pagination";
import { PaginationProps } from "../../types";

describe("Pagination", () => {
  const defaultProps = {
    pagination: { offset: 0, limit: 10 },
    setPagination: () => {},
    restaurantCount: 50,
  };

  const renderPagination = (props: PaginationProps) => {
    return render(
      <Pagination
        setPagination={props.setPagination}
        pagination={props.pagination}
        restaurantCount={props.restaurantCount}
      />
    );
  };

  it("shows correct page of (eg. Page 1 of 5)", () => {
    const { getByText } = renderPagination({
      ...defaultProps,
      restaurantCount: 41,
    });

    expect(getByText(/Page 1 of 5/)).not.toBeNull();
  });

  it("shows correct page of (eg. Page 3 of 5)", () => {
    const { getByText } = renderPagination({
      ...defaultProps,
      restaurantCount: 41,
      pagination: { offset: 20, limit: 10 },
    });

    expect(getByText(/Page 3 of 5/)).not.toBeNull();
  });

  it("next and previous buttons are disable if no next or previous page exists", () => {
    const { getByTestId } = renderPagination({
      ...defaultProps,
      restaurantCount: 5,
    });

    const previous = getByTestId("previous-button");
    const next = getByTestId("next-button");

    expect(previous).toBeDisabled();
    expect(next).toBeDisabled();
  });

  it("next button correctly increments offset", () => {
    const setPagination = jest.fn().mockName("setPagination");
    const { getByTestId } = renderPagination({
      ...defaultProps,
      restaurantCount: 25,
      setPagination,
    });

    const next = getByTestId("next-button");

    fireEvent.click(next);

    expect(setPagination).toHaveBeenCalledWith({ offset: 10, limit: 10 });
  });

  it("previous button correctly decrements offset", () => {
    const setPagination = jest.fn().mockName("setPagination");
    const { getByTestId } = renderPagination({
      ...defaultProps,
      restaurantCount: 25,
      setPagination,
      pagination: { offset: 10, limit: 10 },
    });

    const previous = getByTestId("previous-button");

    fireEvent.click(previous);

    expect(setPagination).toHaveBeenCalledWith({ offset: 0, limit: 10 });
  });
});
