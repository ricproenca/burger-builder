import React from 'react';

import SimpleAux from '../../hoc/SimpleAux';

const layout = props => (
    <SimpleAux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>{props.children}</main>
    </SimpleAux>
);

export default layout;
