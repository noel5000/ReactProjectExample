import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class ProductsTable extends Component {
  columns = [
    {
      key: "name",
      label: "Name",
      content: item => <Link to={`/productsform/${item.id}`}>{item.name}</Link>
    },

    { path: "price", label: "Price" },
    { path: "cost", label: "Cost" },

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
          <button
            type="button"
            className=" btn btn-info btn-sm"
            onClick={() => {
              this.props.addStock(item);
            }}
          >
            Add Stock
          </button>
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
