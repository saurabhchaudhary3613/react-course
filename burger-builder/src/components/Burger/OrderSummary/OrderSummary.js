import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This should be the functional component, doesn,t have to be a class
    componentDidUpdate() {
        console.log('component will update');
    }

    render() {
        const ingredientList = Object.keys(this.props.ingredients).map((igKey) => {
            return <li key={igKey}>
                    <span>{igKey} </span>: {this.props.ingredients[igKey]}
                   </li>
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger !</p>
                <ul>
                    {ingredientList}
                </ul>
                <p>Continue to checkout ?</p>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchasedCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;