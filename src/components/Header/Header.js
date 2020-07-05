import React from 'react';
import classes from './Header.module.scss';
import Container from '../Container/Container';

const Header = () => (
    <header className={classes.Header}>
        <Container>
            <h1 className={classes.Header__title}>Data Table</h1>
        </Container>
    </header>
);

export default Header;
