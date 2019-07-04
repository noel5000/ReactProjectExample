import React, { Component } from "react";

class TableHeader extends Component {
  state = {};

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    const newOrder = path === sortColumn.path ? "desc" : "asc";
    const newSortColumn = {
      path,
      order: newOrder
    };
    this.props.onSort(newSortColumn);
  };
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((c, index) => (
            <th
              className="clickable"
              key={index}
              onClick={() => this.raiseSort(c.path)}
              scope="col"
            >
              {c.label} {this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
