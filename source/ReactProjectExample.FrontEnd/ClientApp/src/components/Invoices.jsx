import React, { Component } from "react";
import httpService from "./services/httpService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import InvoicesTable from "./productsTable";
import { Link } from "react-router-dom";
import Input from "./common/input";
import { toast } from "react-toastify";
import BaseComponent from "./baseComponent";
import _ from "lodash";
import ProductStock from "./ProductStock";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Invoices extends BaseComponent {
  state = {
    invoices: [],
    open: false,
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "name", order: "asc" }
  };
  componentDidMount() {
    this.getInvoices();
  }

  getInvoices = () => {
    let self = this;
    httpService
      .call({
        method: "get",
        url: `/api/invoice`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        }
      })
      .then(response => {
        if (response.data.status >= 0) {
          self.setState({ invoices: response.data.data });
        } else {
          toast.info(response.data.message);
        }
      })
      .catch(reason => {});
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  deleteInvoice = item => {
    let self = this;
    httpService
      .call({
        method: "delete",
        url: `/api/invoice/${item.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        }
      })
      .then(response => {
        if (response.data.status >= 0) {
          toast.success(response.data.message);
          this.getInvoices();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(reason => {
        toast.error("Something happened.... please try later.");
      });
  };

  setPage = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
    this.renderTable();
  };
  previewInvoice = invoice => {};
  modalClose = () => {
    this.setState({ open: false });
  };

  render() {
    return this.renderTable();
  }
  renderTable() {
    const { invoices, currentPage, pageSize, sortColumn, open } = this.state;
    const sorted = _.orderBy(invoices, [sortColumn.path], [sortColumn.order]);
    const paginated = paginate(sorted, currentPage, pageSize);

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <Link
                to="/invoices/0"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Invoice
              </Link>
            </div>
            {invoices.length === 0 ? (
              <h4>There are no invoices in the database !!!!!</h4>
            ) : (
              <div className="row">
                <p>Showing {invoices.length} invoices in the database</p>
                <InvoicesTable
                  invoices={paginated}
                  onDelete={this.deleteInvoice}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                  previewInvoice={this.previewInvoice}
                />
                <Pagination
                  count={invoices.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  setCurrentPage={this.setPage}
                  onPageChange={this.setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Invoices;
