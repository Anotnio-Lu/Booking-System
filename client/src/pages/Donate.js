import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const prices = [10, 20, 50]

const Donate = () => {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);

    const Donation = ( price ) => {
        const aray = [{
            name: "Your Donation",
            price: price.price,
            quantity: 1
        }]
        
        const handleButtonClick = async () => {
    
            getCheckout({
                variables: { 
                    products: [...aray],
                },
              });
        };
      
        return (
          <div>
            <button onClick={handleButtonClick}>Donate {price.price}</button>
          </div>
        );
      };

  return (
    <main className="">
        <div>
            <h1>Donate today!</h1>
        </div>
        <div className='buttons'>
            {prices &&
            prices.map((price) => (
            <div key={price} className="">
                <Donation
                    price={price}
                />
            </div>
            ))}
            
        </div>

    </main>
  );
};

export default Donate;
