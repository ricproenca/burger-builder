import React from 'react';

import burgerLogo from '../../../assets/burger-logo.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger Builder Logo"></img>
    </div>
);

export default logo;
