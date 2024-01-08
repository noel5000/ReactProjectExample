import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ count, pageSize, currentPage, setCurrentPage }) => {
  let numberPages = Math.floor(count / pageSize);
  numberPages = Math.ceil(count / pageSize);

  const pages = _.range(1, numberPages + 1);
  if (numberPages == 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={"page-item " + (currentPage == 1 ? "disabled" : "")}>
          <a
            className="page-link"
            href="#"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {pages.map((page, index) => (
          <li
            key={index}
            className={"page-item" + (page == currentPage ? " active" : "")}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={
            "page-item " + (currentPage >= numberPages ? "disabled" : "")
          }
        >
          <a
            className="page-link"
            href="#"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default Pagination;
