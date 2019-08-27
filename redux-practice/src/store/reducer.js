import * as actionTypes from '../store/actions';

const initialSate = {
    persons: []
}
const reducer = (state = initialSate, action) => {

    if(action.type === actionTypes.ADD_PERSON) {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Saurabh',
            age: Math.floor( Math.random() * 40 )
        }
        return {
            ...state,
            persons: state.persons.concat(newPerson)
        }
    }
    if(action.type === actionTypes.DELETE_PERSON) {
        const updatedPersonsArray = state.persons.filter((person, index) => {
            return person.id !== action.personId;
        })
        return {
            ...state,
            persons: updatedPersonsArray
        }
    }
    return state;
};

export default reducer;