import React from 'react';

import SimpleAux from '../../../hoc/SimpleAux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
                {props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <SimpleAux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </SimpleAux>
    );
};

export default orderSummary;
