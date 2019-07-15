import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class ProductsTable extends Component {
  columns = [
    {
      key: "name",
      label: "Name",
      content: item => <Link to={`/products/${item.id}`}>{item.name}</Link>
    },

    { path: "price", label: "Price" },
    { path: "cost", label: "Cost" },
    {
      key: "isService",
      label: "Is Service",
      content: item => (
        <div>
          <p>{item.isService ? "YES" : "NO"}</p>
        </div>
      )
    },

    {
      key: "delete",
      content: item => (
        <div>
          <button
            type="button"
            className=" btn btn-danger btn-sm"
            onClick={() => {
              this.props.onDelete(item);
            }}
          >
            Delete
          </button>
          {!item.isService ? (
            <button
              type="button"
              className=" btn btn-info btn-sm"
              onClick={() => {
                this.props.addStock(item);
              }}
            >
              Add Stock
            </button>
          ) : (
            <div />
          )}
        </div>
      )
    }
  ];
  render() {
    const { products, sortColumn, onSort } = this.props;
    return (
      <Table
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default ProductsTable;
