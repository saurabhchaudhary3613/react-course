import React from 'react';
import classes from './Order.module.scss';

const order = (props) => {
    const ingredients = [];
    let ingredientName;
    for (ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientsOutput = ingredients.map((ing) => {
        return <span 
        style={{
            textTransform: 'capitalize', 
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #eee'
        }}
        key={ing.name}>{ing.name}({ing.amount})</span>
    });

    return(
        
        
        <div className={classes.Order}>
            <p>Ingredients:
               {ingredientsOutput}
            </p>
            <p>Total Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;