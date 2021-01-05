import React, { Component } from 'react';

import SimpleAux from '../../hoc/SimpleAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 2,
        },
    };

    render() {
        return (
            <SimpleAux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Burger Controls</div>
            </SimpleAux>
        );
    }
}

export default BurgerBuilder;
