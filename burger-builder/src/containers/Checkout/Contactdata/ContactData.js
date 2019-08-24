import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            poatalCode: ''
        },
        loading: false
    };
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Saurabh',
                address: {
                    street: 'Test',
                    zipcode: 123456,
                    country: 'India'
                },
                email: 'sa@teat.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
        .then(response => {
            console.log('response');
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    };
    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Poatal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your details</h4>
                { form }
            </div>
        );
    }
};

export default ContactData;