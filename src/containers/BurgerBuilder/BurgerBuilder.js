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

class BurgerBuilder extends Component {
    state = {
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

    updatePurchasableHandler(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((arr, el) => {
                return arr + el;
            }, 0);

        return sum > 0;
    }

    updatePurchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    purchasingCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchasingContinueHandler = () => {
        this.props.history.push('/checkout');
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
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchasableHandler(this.props.ings)}
                        ordered={this.updatePurchasingHandler}
                    />
                </SimpleAux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
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
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
