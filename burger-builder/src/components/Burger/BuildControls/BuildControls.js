import React from 'react';
import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'}
    ];
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((control) => {
                return <BuildControl key={control.label} 
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]}
                label={control.label}/>
            })}
            <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchaseable}>{props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}</button>
        </div>
    );
}

export default buildControls;