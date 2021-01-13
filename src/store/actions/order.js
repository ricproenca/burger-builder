import * as actionTypes from './actionTypes';
import axios from '../../helpers/axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios
            .post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.id, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
    };
};
