import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false,
    error: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };

            return {
                ...state,
                loading: false,
                orders: state.order.concat(newOrder),
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
