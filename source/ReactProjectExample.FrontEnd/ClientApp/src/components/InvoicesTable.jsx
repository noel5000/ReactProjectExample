import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class InvoicesTable extends Component {
  columns = [
    {
      key: "id",
      label: "Id"
    },

    { path: "billDate", label: "Date" },
    { path: "subTotal", label: "SubTotal" },
    { path: "taxes", label: "Tax" },
    { path: "discount", label: "Discount" },
    { path: "total", label: "Total" },
    {
      key: "delete",
      content: item => (
        <div>
          <button
            type="button"
            className=" btn btn-info btn-sm"
            onClick={() => {
              this.props.previewInvoice(item);
            }}
          >
            Preview
          </button>
        </div>
      )
    }
  ];
  render() {
    const { invoices, sortColumn, onSort } = this.props;
    return (
      <Table
        data={invoices}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default InvoicesTable;
