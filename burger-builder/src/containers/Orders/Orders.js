import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onInitOrders();
    }
    render() {
        let orders = <Spinner/>;
        if(!this.props.loading) {
            orders = this.props.orders.map( order => (
                <Order key={order.id} 
                ingredients={order.ingredients}
                price={order.price}
                />
            ) );
        }
        
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateTpProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: (orders) => dispatch(actions.fetchOrders(orders))
    }
};

export default connect(mapStateTpProps, mapDispatchToProps)(withErrorHandler(Orders, axios));