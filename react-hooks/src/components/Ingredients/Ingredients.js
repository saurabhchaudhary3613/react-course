import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients ] = useState([]);

  // useEffect( () => {
  //   fetch('https://react-hook-update-14bdf.firebaseio.com/ingredient.json')
  //   .then( response => response.json())
  //   .then( responseData => {
  //     const loadedIngredients = [];
  //     for(const key in responseData ){
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
        
  //     }
  //     setUserIngredients(loadedIngredients);
  //   })
  // }, []);

  const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients)
  }, []);
  
  const addIngredientsHandler = ingredient => {
    fetch('https://react-hook-update-14bdf.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    })
    .then( response => {
      return response.json()
    })
    .then( responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id: Math.random().toString(), ...ingredient}
      ])
    })
    
  };

  const removeIngredientHandler = id => {
    fetch(`https://react-hook-update-14bdf.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
    .then( response => {
      setUserIngredients( prevIngredients => 
        prevIngredients.filter( ingredient =>id !== ingredient.id ))
    })
    // .then( responseData => {
    //   setUserIngredients(prevIngredients => [
    //     ...prevIngredients,
    //     {id: Math.random().toString(), ...ingredient}
    //   ])
    // })
    
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler}/>

      <section>
        <Search onLoadIngredients={filterIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
