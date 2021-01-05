import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    //ingredient keys from the state are added to a new array and then mapped over
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //a new array with n number of indexes is created
            // based on the value held by the key in the 'transformedIngredients' array
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
            });
        })
        .reduce((arr, el) => arr.concat(el), []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients.</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;
