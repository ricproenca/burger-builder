import React from 'react';

import SimpleAux from '../../hoc/SimpleAux';
import classes from './Layout.module.css';

const layout = props => (
    <SimpleAux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
    </SimpleAux>
);

export default layout;
