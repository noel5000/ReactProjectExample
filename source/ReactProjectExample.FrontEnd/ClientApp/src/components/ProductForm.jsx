import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import { toast } from "react-toastify";

class ProductsForm extends Form {
    state = {
        data: {
            name: "",
            id: 0,
            price: 0,
            cost: 0,
            barCode: "",
            isService: false
        },
        buttonDisabled: true,
        errors: {},
        productId: 0
    };

    schema = {
        name: Joi.string()
            .required()
            .label("Name"),
        barCode: Joi.string()
            .optional()
            .label("BarCode")
            .allow(""),
        isService: Joi.boolean()
            .optional()
            .label("Is Service")
            .allow(false),
        price: Joi.number()
            .required()
            .min(0)
            .label("Price"),
        id: Joi.number()
            .optional()
            .allow(0),
        cost: Joi.number()
            .required()
            .min(0)
            .label("cost")
    };

    getProduct = id => {
        let self = this;
        httpService
            .call({
                method: "get",
                url: `/api/products/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: self.getCurrentToken()
                }
            })
            .then(response => {
                if (response.data.status >= 0) {
                    const product = response.data.data;

                    self.setState({
                        data: {
                            name: product.name,
                            id: product.id,
                            price: product.price,
                            cost: product.cost,
                            barCode: product.barCode ? product.barCode:"",
                            isService: product.isService
                        }
                    });
                    document.getElementById('isService').checked = self.state.data.isService;
                } else {
                    toast.info(response.data.message);
                }
            })
            .catch(reason => {
                toast.error("Something happened... Please try later");
            });
    };
    doSubmit = () => {
        let self = this;
        let data = self.state.data;
        data.isService = document.getElementById('isService').checked;

        httpService
            .call({
                method: self.state.data.id===0? "post":'put',
                url: `/api/products`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: self.getCurrentToken()
                },
                data: data
            })
            .then(response => {
                if (response.data.status >= 0) {
                    toast.success(response.data.message);
                    this.props.history.push("/products");
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(reason => {
                toast.error("Something happened... Please try later");
            });
    };

    componentDidMount() {
        const productId = this.props.match.params.id;

        if (!productId) return;
        if (productId !== "0") {
            this.setState({ productId });
            this.getProduct(productId);
        }
    }

    render() {
        return (
            <div>
                <h1>New Product</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name", "text")}
                    {this.renderInput("price", "Price", "number")}
                    {this.renderInput("cost", "Cost", "number")}
                    {this.renderInput("barCode", "Barcode", "text")}
                    {this.renderInput("isService", "Is service?", "checkbox")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default ProductsForm;
