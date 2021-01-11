import React, { Component } from 'react';
import { connect } from 'react-redux';

import SimpleAux from '../../hoc/SimpleAux/SimpleAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../helpers/axios-orders';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7,
// };

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        error: false,
    };

    // componentDidMount() {
    //     axios
    //         .get(
    //             'https://react-my-burger-40b8d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
    //         )
    //         .then(response => {
    //             this.setState({ ingredients: response.data });
    //         })
    //         .catch(error => {
    //             this.setState({ error: true });
    //         });
    // }

    // addIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;

    //     this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

    //     this.updatePurchasableHandler(updatedIngredients);
    // };

    // removeIngredientHandler = type => {
    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount === 0) {
    //         return;
    //     }

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceDeduction;

    //     this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });

    //     this.updatePurchasableHandler(updatedIngredients);
    // };

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
        let queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ings[i])}`);
        }
        queryParams.push(`price=${encodeURIComponent(this.state.totalPrice)}`);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`,
        });
    };

    render() {
        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <SimpleAux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        // ingredientAdded={this.addIngredientHandler}
                        // ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.updatePurchasingHandler}
                    />
                </SimpleAux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.state.totalPrice}
                    purchaseCanceled={this.purchasingCancelHandler}
                    purchaseContinued={this.purchasingContinueHandler}
                />
            );
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

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName,
            }),
        onIngredientRemoved: ingName =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName,
            }),
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
