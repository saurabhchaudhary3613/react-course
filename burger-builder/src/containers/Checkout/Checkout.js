import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './Contactdata/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingrendents = {};
        let price = 0;
        console.log(query.entries());

        for(let param of query.entries()) {
            
            if(param[0] === 'price') {
                price = param[1];
            }else {
                ingrendents[param[0]] = +param[1];
            }
        }
        
        this.setState({ingredients: ingrendents, totalPrice: price});
    }
    checkoutcancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        return (
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutcancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props) => {
                    return(
                        <ContactData ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} {...props}/>
                    )
                }}/>
            </div>
        )
    }
};

export default Checkout;