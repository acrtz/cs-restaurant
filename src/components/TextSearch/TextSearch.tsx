import React, { useState } from "react";
import { TextSearchProps } from "../../types";
import "./TextSearch.css";
import SearchIcon from "../../icons/search";
import CloseIcon from "../../icons/close";

const Search: React.FC<TextSearchProps> = (props) => {
  const [text, setText] = useState<string>("");
  return (
    <div id="search-box">
      <input
        type="text"
        id="text-search"
        value={text}
        onChange={({ target: { value } }) => {
          setText(value);
          if (!value) props.setTextSearch("");
        }}
        onKeyPress={({ key }) =>
          key === "Enter" ? props.setTextSearch(text) : null
        }
        placeholder="search by name, city or genre"
      />
      {text && props.textSearch === text ? (
        <button
          data-testid="clear-search-button"
          onClick={() => {
            setText("");
            props.setTextSearch("");
          }}
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          data-testid="search-button"
          onClick={() => props.setTextSearch(text)}
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
