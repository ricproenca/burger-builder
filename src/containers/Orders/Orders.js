import React, { Component } from 'react';
import axios from '../../helpers/axios-orders';

import Order from './Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios
            .get('orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        id: key,
                        ...resp.data[key],
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={Number.parseFloat(order.price)}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
