import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "./common/form";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import { toast } from "react-toastify";

class ProductStock extends Form {
  state = {
    product: this.props.product,
    data: {
      id: 0,
      productId: 0,
      quantity: 0
    },
    buttonDisabled: true,
    errors: {}
  };

  schema = {
    quantity: Joi.number()
      .required()
      .min(1)
      .label("Price"),
    id: Joi.number()
      .optional()
      .allow(0),
    productId: Joi.number()
      .optional()
      .allow(0)
  };

  modalClose = () => {
    this.setState({ open: false });
  };

    doSubmit = () => {
      

        const data = this.state.data;;
    let self = this;

    httpService
      .call({
        method :"post",
        url: `/api/Stock`,
        headers: {
          "Content-Type": "application/json",
          Authorization: self.getCurrentToken()
        },
        data: data
      })
      .then(response => {
        if (response.data.status >= 0) {
          toast.success(response.data.message);
          self.setState({ open: false });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(reason => {
        toast.error("Something happened... Please try later");
      });
    };
    getProductStock = productId => {
        let self = this;
        

        httpService
            .call({
                method: 'get',
                url: `/api/Stock/GetProductStock/${productId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: self.getCurrentToken()
                }
            })
            .then(response => {
                if (response.data.status >= 0) {
                   
                    let currentStock = response.data.data;
                    if (currentStock) {
                        self.setState({
                            data: {
                                id: currentStock.id,
                                productId: currentStock.productId,
                                quantity: currentStock.quantity
                            }
                        });
                      
                    }
                    
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(reason => {
                toast.error("Something happened... Please try later");
            });
    }
  componentDidMount() {
      const { product } = this.props;
      this.getProductStock(product.id);
  }

  render() {
    const { open, product } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("quantity", "Quantity", "number")}
          <div className="text-center">{this.renderButton("Save")}</div>
        </form>
      </div>
    );
  }
}

export default ProductStock;
