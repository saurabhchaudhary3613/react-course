import React from 'react';
import classes from './NavigationsItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders' active>Orders</NavigationItem>
        { !props.isAuthenticated
            ? <NavigationItem link='/auth' active>Authenticate</NavigationItem>
            : <NavigationItem link='/logout' active>Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;