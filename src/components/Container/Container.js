import React from 'react';
import {node} from 'prop-types';
import classes from './Container.module.scss';

const Container = ({children}) => (
    <div className={classes.Container}>{children}</div>
);

Container.propTypes = {
    children: node.isRequired,
};

export default Container;
