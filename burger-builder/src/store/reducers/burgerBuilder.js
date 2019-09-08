import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
            return updatedObject(state, updatedState);
            // return {
            //     ...state,
            //     ingredients: updatedIngredients,
            //     totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            // };
        case (actionTypes.REMOVE_INGREDIENT):
        return {
            ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
        };
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            };
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            }
        default: 
            return state
    } 
};

export default reducer;
