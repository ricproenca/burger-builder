import React from 'react';

import classes from './Modal.module.css';
import SimpleAux from '../../../hoc/SimpleAux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    return (
        <SimpleAux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh',
                    opacity: props.show ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </SimpleAux>
    );
};

export default modal;
