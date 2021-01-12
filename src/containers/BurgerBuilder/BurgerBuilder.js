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
import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }
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
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

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
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ingName => dispatch(actions.initIngredients()),
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
