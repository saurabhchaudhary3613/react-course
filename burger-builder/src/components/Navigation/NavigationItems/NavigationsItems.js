import React from 'react';
import classes from './NavigationsItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem link='/' active>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;