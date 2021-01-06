import React from 'react';

import SimpleAux from '../../hoc/SimpleAux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => (
    <SimpleAux>
        <Toolbar />
        <main className={classes.Content}>{props.children}</main>
    </SimpleAux>
);

export default layout;
