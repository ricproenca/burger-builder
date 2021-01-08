import React, { Component } from 'react';

import SimpleAux from '../../hoc/SimpleAux/SimpleAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../helpers/axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios
            .get(
                'https://react-my-burger-40b8d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
            )
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

        this.updatePurchasableHandler(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];

        if (oldCount === 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

        this.updatePurchasableHandler(updatedIngredients);
    };

    updatePurchasableHandler(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((arr, el) => {
                return arr + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    purchasingCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchasingContinueHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ricardo',
                address: {
                    street: 'My street',
                    zipCode: '5875',
                    country: 'Luxembourg',
                },
                email: 'ricardo@5875.com',
            },
            deliveryMethod: 'fastest',
        };

        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <SimpleAux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.updatePurchasingHandler}
                    />
                </SimpleAux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    purchaseCanceled={this.purchasingCancelHandler}
                    purchaseContinued={this.purchasingContinueHandler}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <SimpleAux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </SimpleAux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
