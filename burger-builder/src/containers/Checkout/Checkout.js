import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './Contactdata/ContactData';

class Checkout extends Component {
    
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
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);