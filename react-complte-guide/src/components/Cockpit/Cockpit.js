import React, { useRef, useEffect, useContext } from 'react';
import styles from './Cockpit.module.scss';
import AuthContext from '../../context/auth-context';


const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
        toggleBtnRef.current.click();
    }, []);

    const btnStyle = {
        background: 'green'
    }

    if(props.showPersons) {
        btnStyle.background = 'red';
    }
    
    const pclasses = [];

     if(props.persons.length <=2) {
      pclasses.push(styles.red)
     }
     if(props.persons.length <=1) {
      pclasses.push(styles.bold)
     }
     
    return(
        <div>
            <h1>{props.title}</h1>
            <p className={pclasses.join(' ')}>This is really working!</p>
            <button
            ref={toggleBtnRef}
            className={styles.myBtn}
            style={btnStyle}
            onClick={props.clicked}>Toggle Persons</button>
            <button className={styles.loginBtn} onClick={authContext.login}>Login in</button>
        </div>
    );
}

export default Cockpit;
