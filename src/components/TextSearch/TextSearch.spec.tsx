import { render, fireEvent } from "@testing-library/react";
import React from "react";
import TextSearch from "./TextSearch";
import { TextSearchProps } from "../../types";

describe("allows users to do a text search", () => {
  const defaultProps = {
    textSearch: "",
    setTextSearch: () => {},
  };

  const renderTextSearch = (props: TextSearchProps) => {
    return render(
      <TextSearch
        setTextSearch={props.setTextSearch}
        textSearch={props.textSearch}
      />
    );
  };

  it("pressing enter submits", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText } = renderTextSearch({
      ...defaultProps,
      setTextSearch,
    });

    const input = getByPlaceholderText(/search/);

    fireEvent.change(input, { target: { value: "The petite chef" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    expect(setTextSearch).toHaveBeenCalledWith("The petite chef");
  });

  it("clicking search button submits", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText, getByRole } = renderTextSearch({
      ...defaultProps,
      setTextSearch,
    });

    const input = getByPlaceholderText(/search/);
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "The petite chef" } });
    fireEvent.click(button);

    expect(setTextSearch).toHaveBeenCalledWith("The petite chef");
  });

  it("clearing all text calls setTextSearch with empty string", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText } = renderTextSearch({
      ...defaultProps,
      setTextSearch,
    });

    const input = getByPlaceholderText(/search/);

    fireEvent.change(input, { target: { value: "T" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(setTextSearch).toHaveBeenCalledWith("");
  });

  it("if textSearch maches input text then clear button is shown and search button isn't", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText, queryByTestId } = renderTextSearch({
      setTextSearch,
      textSearch: "Toro",
    });

    const input = getByPlaceholderText(/search/);
    fireEvent.change(input, { target: { value: "Toro" } });

    expect(queryByTestId("clear-search-button")).not.toBeNull();
    expect(queryByTestId("search-button")).toBeNull();
  });

  it("if textSearch does not match input text then clear button is shown and search button isn't", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText, queryByTestId } = renderTextSearch({
      setTextSearch,
      textSearch: "Toro",
    });

    const input = getByPlaceholderText(/search/);
    fireEvent.change(input, { target: { value: "Tor" } });

    expect(queryByTestId("clear-search-button")).toBeNull();
    expect(queryByTestId("search-button")).not.toBeNull();
  });

  it("hitting clear button calls setTextSearch with empty string", () => {
    const setTextSearch = jest.fn().mockName("setTextSearch");
    const { getByPlaceholderText, getByRole } = renderTextSearch({
      setTextSearch,
      textSearch: "Toro",
    });

    const input = getByPlaceholderText(/search/);
    fireEvent.change(input, { target: { value: "Toro" } });

    const button = getByRole("button");

    fireEvent.click(button);

    expect(setTextSearch).toHaveBeenCalledWith("");
  });
});
