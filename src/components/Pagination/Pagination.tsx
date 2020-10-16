import React from "react";
import { PaginationProps } from "../../types";
import "./Pagination.css";
import PreviousIcon from "../../icons/chevron-left";
import NextIcon from "../../icons/chevron-right";

const Search: React.FC<PaginationProps> = (props) => {
  if (props.restaurantCount === undefined) return null;

  const { offset, limit } = props.pagination;
  const pageNumber = Math.ceil(offset / limit) + 1;
  const totalPages = Math.ceil(props.restaurantCount / limit);

  const goToPreviousePage = () => {
    props.setPagination({ offset: offset - limit, limit });
  };

  const goToNextPage = () => {
    props.setPagination({ offset: offset + limit, limit });
  };

  return (
    <div id="pagination">
      <button
        onClick={goToPreviousePage}
        disabled={pageNumber === 1}
        data-testid="previous-button"
      >
        <PreviousIcon />
      </button>
      Page {pageNumber} of {totalPages}
      <button
        onClick={goToNextPage}
        disabled={pageNumber === totalPages}
        data-testid="next-button"
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default Search;
