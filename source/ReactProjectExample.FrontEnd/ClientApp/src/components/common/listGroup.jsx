import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  listItems,
  onSelectItem,
  currentGenre,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {listItems.map((i, index) => (
        <li
          key={i._id}
          className={
            "list-group-item list-group-item-action" +
            (currentGenre && currentGenre._id == i._id ? " active" : "")
          }
          onClick={() => onSelectItem(i)}
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  listItems: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  currentGenre: PropTypes.object.isRequired
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
