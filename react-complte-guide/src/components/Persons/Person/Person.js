import React, { Component } from 'react';
 import Aux from '../../../hoc/Auxiliary';
// import Radium from 'radium';
import withClass from '../../../hoc/withClass';
import classes from './Person.module.scss';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component  {

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElement.focus();
        console.log(this.context.authenticated);
    }
    render(){

        console.log("person props", this.props);
        return (
            <Aux>
               
                {this.context.authenticated ? <p>Authenticated</p>: <p>Please Login</p>}
              
                <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text"
                ref={(inputEl) => {this.inputElement = inputEl}}
                onChange={this.props.changed} 
                value={this.props.name}/>
            </Aux>
        )
    };
}
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.person);