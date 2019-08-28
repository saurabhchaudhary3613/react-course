import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
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
        this.setState({purchasing: true})
    };

    purchseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };
    componentDidMount() {
        console.log(this.props);
        // axios.get('https://burger-builder-f7508.firebaseio.com/ingredients/.json')
        //     .then(response => {
        //         console.log(response.data);
        //         // const totalPrice = this.calculateInitialPrice(response.data)
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({error: true})
        //     })
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Aux>
            );
            orderSummary =  <OrderSummary ingredients={this.props.ings}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price.toFixed(2)}
            purchasedCancelled={this.purchseCancelHandler}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
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
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (ingName) => dispatch ({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientsRemoved: (ingName) => dispatch ({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));