import React, { Component } from 'react';
import './App.scss';
import Radium, {StyleRoot} from 'radium';
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons';
import Validate from '../components/Validate/Validate';
import Char from '../components/Char/Char';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id:'wqwq1', name: 'Max', age: 28 },
      { id:'xsd2', name: 'Manu', age: 29 },
      {  id:'kjk3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    userInput: '',
    textLength: 0,
    changeCounter: 0,
    authenticated: false
  }
  nameChangedHandler = (event, id) => {
    console.log('sasa')
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    // Not recommeded 
    // this.setState({
    //   persons: persons, 
    //   changeCounter: this.state.changeCounter + 1 
    // })

    // Best paractice to update state
    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 
      };
    });
  };

  displayPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  clickPersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons})
  }

  textInputChangeHandler = (event) => {
    this.setState({userInput: event.target.value})
    
  }
  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const udatedText = text.join('');
    this.setState({userInput: udatedText})

  }
  loginHandler = () => {
    this.setState({authenticated: true})
  }
  
  render () {
    let persons = null;
     if(this.state.showPersons) {
       persons = <Persons 
            persons={this.state.persons} 
            clicked={this.clickPersonHandler}
            changed={this.nameChangedHandler}
          />
     }

     
     const charList = this.state.userInput.split('').map((ch, index) => {
        return <Char character={ch} key={index} removeChar={() => this.deleteCharHandler(index)}/>
     })

    return (
      <StyleRoot>
        <div className="App">
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>
            <Cockpit persons={this.state.persons} 
            title={this.props.title}
            showPersons={this.state.showPersons}
            login={this.loginHandler}
            clicked={this.displayPersonsHandler}/>
            {persons}
          </AuthContext.Provider>
          <hr></hr>
          <input type="text" onChange={this.textInputChangeHandler} 
          value={this.state.userInput}/>
          <p>{this.state.userInput}</p>
          
          {<Validate inputLength={this.state.userInput.length} /> }
          {charList}
        </div>

      </StyleRoot>
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
