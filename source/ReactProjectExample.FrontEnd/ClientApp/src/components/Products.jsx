import React, { Component } from "react";
import httpService from "./services/httpService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import ProductsTable from "./productsTable";
import { Link } from "react-router-dom";
import Input from "./common/input";
import { toast } from "react-toastify";
import BaseComponent from "./baseComponent";
import _ from "lodash";

class Products extends BaseComponent {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "name", order: "asc" }
  };
  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    let self = this;
    httpService
      .call({
        method: "get",
        url: `/api/products`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        }
      })
      .then(response => {
        if (response.data.status >= 0) {
          self.setState({ products: response.data.data });
        } else {
          toast.info(response.data.message);
        }
      })
      .catch(reason => {});
  };

  deleteProduct = item => {
    let self = this;
    httpService
      .call({
        method: "delete",
        url: `/api/products/${item.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        }
      })
      .then(response => {
        if (response.data.status >= 0) {
          toast.success(response.data.message);
          this.getProducts();
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
  addStock = product => {
    toast.info("add stock");
  };

  filterproductsByName = ({ currentTarget: input }) => {
    const text = input.value;

    this.setState({ selectedGenre: {} });
    const products = this.state.products.filter(m =>
      m.name.toLowerCase().includes(text.toLowerCase())
    );

    this.setState({ products, currentPage: 1 });
  };

  render() {
    return this.renderTable();
  }
  renderTable() {
    const { products, currentPage, pageSize, sortColumn } = this.state;
    const sorted = _.orderBy(products, [sortColumn.path], [sortColumn.order]);
    const paginated = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <Link
              to="/products/0"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Product
            </Link>
          </div>
          {products.length === 0 ? (
            <h4>There are no products in the database !!!!!</h4>
          ) : (
            <div className="row">
              <p>Showing {products.length} products in the database</p>
              <ProductsTable
                products={paginated}
                onDelete={this.deleteProduct}
                addStock={this.addStock}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                count={products.length}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={this.setPage}
                onPageChange={this.setPage}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
