import React from 'react';

import Subscribe from './subscribe'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51HblMrHIP3KRpeIqBffbca4V9XAefLAgld3E8em8MFf7WVXen5HYy9Ia37wAg5kuPd39g0xSmR2Mz0aqKGgsSAyr00CKL6i7jB');
// const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY)




const Subscription = () => {
    return (
        <Elements stripe={stripePromise}>
            <Subscribe />
        </Elements>
    );
}

export default Subscription;