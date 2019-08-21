import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
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

        this.setState({purchaseable: sum>0})
    };

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        console.log(this.state.totalPrice);
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        console.log('continue');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Saurabh',
                address: {
                    street: 'Test',
                    zipcode: 123456,
                    country: 'India'
                },
                email: 'sa@teat.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
        .then(response => {
            console.log('response');
            this.setState({loading: false, purchasing: false});
        }).catch(error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        });
        
    };
    // calculateInitialPrice = (ingredients) => {
    //     return Object.keys(ingredients)
    //     .map(ingredientKey => (ingredients[ingredientKey] * INGREDIENTS_PRICES[ingredientKey]) + this.state.totalPrice)
    //     .reduce((acumulator, element) => acumulator + element, 0)
    // }

    componentDidMount() {

        axios.get('https://burger-builder-f7508.firebaseio.com/ingredients/.json')
            .then(response => {
                console.log(response.data);
                // const totalPrice = this.calculateInitialPrice(response.data)
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true})
            })
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
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientsHandler} 
                        ingredientRemoved={this.removeIngredientsHandler}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Aux>
            );
            orderSummary =  <OrderSummary ingredients={this.state.ingredients} 
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
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

export default withErrorHandler(BurgerBuilder, axios);