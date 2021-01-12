import * as actionTypes from './actionTypes';
import axios from '../../helpers/axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngredientsFailed = errorMessage => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios
            .get(
                'https://react-my-burger-40b8d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
            )
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error.message));
            });
    };
};
