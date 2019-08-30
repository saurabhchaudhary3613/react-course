import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
};
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.INCREMENT:
            // const newState = Object.assign({}, state);
            // newState.counter = state.counter + 1
            // return new State;
            return updateObject(state, {counter: state.counter + 1});

        case actionTypes.DECREMENT:
                return updateObject(state, {counter: state.counter - 1});
           
        case actionTypes.ADD:
                return updateObject(state, {counter: state.counter + action.value});

        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.value});

        default: 
            return state;
           
    }

    // if(action.type === 'INCREMENT') {
    //     return {
    //         counter: state.counter + 1
    //     }
    // }
    // if(action.type === 'DECREMENT') {
    //     return {
    //         counter: state.counter - 1
    //     }
    // }
    // if(action.type === 'ADD') {
    //     return {
    //         counter: state.counter + action.value
    //     }
    // }
    // if(action.type === 'SUBTRACT') {
    //     return {
    //         counter: state.counter - action.value
    //     }
    // }

};

export default reducer;
