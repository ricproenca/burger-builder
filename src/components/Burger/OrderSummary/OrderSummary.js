import React from 'react';

import SimpleAux from '../../../hoc/SimpleAux';

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
        </SimpleAux>
    );
};

export default orderSummary;
