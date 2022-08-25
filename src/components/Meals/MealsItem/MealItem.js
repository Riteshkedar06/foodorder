import React, { useContext } from 'react';
import CardContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';



const MealItem = prpos => {
    const cartCtx = useContext(CardContext);
    const price = `$${prpos.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: prpos.id,
            name: prpos.name,
            amount: amount,
            price: prpos.price
        });
    };
    return <li className={classes.meal}>
        <div>
            <h3>{prpos.name}</h3>
            <div className={classes.description}>{prpos.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} />
        </div>
    </li>

};
export default MealItem;