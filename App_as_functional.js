import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const App = props =>  { 

   const [personState, setPersonState] =  useState({
      persons : [
        {name: 'Saurabh', age: 30},
        {name: 'Gaurav', age: 31},
        {name: 'Rahul', age: 32},
      ]
    });

    const switchNameHandler = () => {

      const clonePersons = [...personState.persons];
      clonePersons[0].name = 'Saurabh Chaudhary';

      setPersonState({
        persons : clonePersons
      })
    }

    const persons = personState.persons;
    return (
      <div className="App">
        <h1> Hi React..</h1>      
        <button onClick={switchNameHandler}>Switch Name</button>
        {persons.map((val, i) => {
          return <Person key={i} 
          click={switchNameHandler}
          name={val.name} 
          age={val.age}/>
        })}
        
      </div>
    );
}

export default App;
