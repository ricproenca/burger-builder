import React, { Component } from 'react';

import SimpleAux from '../../hoc/SimpleAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <SimpleAux>
                <Burger></Burger>
                <div>Burger Controls</div>
            </SimpleAux>
        );
    }
}

export default BurgerBuilder;
