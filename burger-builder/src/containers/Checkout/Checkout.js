import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './Contactdata/ContactData';


class Checkout extends Component {

    // componentWillMount() {
    //     this.props.onPurchaseInit();
    // };
    
    checkoutcancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        let summary = <Redirect to='/'/>;
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div> 
                    { purchasedRedirect }
                    <CheckoutSummary 
                    checkoutCancelled={this.checkoutcancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            );
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};
// const mapDispatchToProps = dispatch => {
//     return {
//         onPurchaseInit: () => dispatch(actionTypes.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);