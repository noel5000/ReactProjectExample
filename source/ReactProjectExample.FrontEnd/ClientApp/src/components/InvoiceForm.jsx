import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import { toast } from "react-toastify";
import { InvoiceDetail } from "./common/models";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class InvoicesForm extends Form {
  state = {
    options: [],
    invoice: {
      subtotal: 0,
      taxes: 0,
      discount: 0,
      details: [],
      id: 0,
      date: ""
    },
    data: new InvoiceDetail(),
    buttonDisabled: true,
    errors: {},
    filteredProducts: [],
    isLoading: false
  };

  schema = {
    id: Joi.number()
      .optional()
      .allow(0),
    invoiceId: Joi.number()
      .optional()
      .allow(0),
    productId: Joi.number()
      .required()
      .min(1),
    quantity: Joi.number()
      .required()
      .min(1)
      .label("Quantity"),
    subtotal: Joi.number()
      .required()
      .min(1)
      .label("SubTotal"),
    discount: Joi.number()
      .optional()
      .allow(0)
      .label("Discount"),
    taxes: Joi.number()
      .optional()
      .allow(0)
      .label("Taxes"),
    total: Joi.number()
      .required()
      .min(1)
      .label("Total")
  };
  getInvoice = id => {};

  filterProducts = name => {
    let self = this;
    self.setState({ isLoading: true });
    httpService
      .call({
        method: "get",
        url: `/api/products/filterproductsbyname/${name}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        }
      })
      .then(response => {
        if (response.data.status >= 0) {
          const products = response.data.data;

          self.setState({
            filteredProducts: products,
            isLoading: false
          });
        } else {
          self.setState({
            filteredProducts: [],
            isLoading: false
          });
          toast.info(response.data.message);
        }
      })
      .catch(reason => {
        self.setState({
          filteredProducts: [],
          isLoading: false
        });
        toast.error("Something happened... Please try later");
      });
  };
  doSubmit = () => {
    let invoice = this.state.invoice;
    invoice.details.push(this.state.data);
    console.log(document.getElementsByClassName("close rbt-close"));
    this.eventFire(
      document.getElementsByClassName("close rbt-close")[0],
      "click"
    );
    this.setState({ invoice });
    this.setState({ data: new InvoiceDetail() });
  };
  selectProduct = product => {
    if (product && product.length > 0) {
      const selectedProduct = product[0];
      const { invoice } = this.state;
      let currentDetail = {
        id: 0,
        invoiceId: invoice.id,
        productId: selectedProduct.id,
        quantity: 1,
        discount: 0,
        taxes: 0,
        subtotal: selectedProduct.price,
        total: 0
      };
      const { quantity, taxes, discount, subtotal } = currentDetail;
      currentDetail.total = quantity * (taxes + subtotal - discount);
      this.setState({ data: currentDetail, selectedProduct });
    } else this.setState({ data: new InvoiceDetail() });
  };
  componentDidMount() {
    const invoiceId = this.props.match.params.id;

    if (!invoiceId) return;
    if (invoiceId !== "0") {
      this.getInvoice(invoiceId);
    }
  }
  calculateTotal = ({ currentTarget: input }) => {
    console.log(input);

    this.handleChangeDelegated(input);
  };
  componentDidUpdate() {
    this.recalculateTotal();
  }
  recalculateTotal() {
    let data = this.state.data;
    let { quantity, subtotal, discount, taxes } = data;
    quantity = !quantity ? 0 : isNaN(quantity) ? 0 : parseFloat(quantity);
    subtotal = !subtotal ? 0 : isNaN(subtotal) ? 0 : parseFloat(subtotal);
    discount = !discount ? 0 : isNaN(discount) ? 0 : parseFloat(discount);
    taxes = !taxes ? 0 : isNaN(taxes) ? 0 : parseFloat(taxes);

    const total = quantity * (subtotal + taxes - discount);
    if (parseFloat(data.total) != total) {
      data.total = parseFloat(total);
      console.log(total);
      this.setState({ data });
    }
  }
  render() {
    const { filteredProducts, isLoading, data } = this.state;

    return (
      <div>
        <h1>New Invoice</h1>
        <AsyncTypeahead
          id="productSelect"
          clearButton
          isLoading={isLoading}
          placeholder="Choose an item..."
          labelKey="name"
          onSearch={query => this.filterProducts(query)}
          onChange={product => this.selectProduct(product)}
          options={filteredProducts}
        />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("quantity", "Quantity", "number")}
          {this.renderInput("taxes", "Tax", "number")}
          {this.renderInput("discount", "Discount", "number")}
          {this.renderInput("subtotal", "SubTotal", "number")}
          {this.renderInput("total", "Total", "number")}
          {this.renderButton("Add product")}
        </form>
      </div>
    );
  }
}

export default InvoicesForm;
