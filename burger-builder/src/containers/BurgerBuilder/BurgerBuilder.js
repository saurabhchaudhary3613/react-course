import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum;
        // this.setState({purchaseable: sum>0})
    };

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        
    };

    purchseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };
    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded !</p> : <Spinner />;
        if(this.props.ings) {
            console.log(this.props.ings);
            burger = (
                
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        disabled={disabledInfo}
                    />
                </Aux>
            );
            orderSummary =  <OrderSummary ingredients={this.props.ings}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price.toFixed(2)}
            purchasedCancelled={this.purchseCancelHandler}/>;
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (ingName) => dispatch (burgerBuilderActions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch (burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch (burgerBuilderActions.initIngredients()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));