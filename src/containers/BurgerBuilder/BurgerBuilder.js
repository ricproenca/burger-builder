import React, { Component } from 'react';

import SimpleAux from '../../hoc/SimpleAux';

class BurgerBuilder extends Component {
    render() {
        return (
            <SimpleAux>
                <div>Burger View</div>
                <div>Burger Controls</div>
            </SimpleAux>
        );
    }
}

export default BurgerBuilder;
