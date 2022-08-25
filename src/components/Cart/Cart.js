import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext, useState } from 'react';
import CardContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import React from 'react';

const Cart = props => {
    const cartCtx = useContext(CardContext);
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);


    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderHandler = async (uesrData) => {
        setIsSubmitting(true);
        await fetch("https://react-food-ae07e-default-rtdb.firebaseio.com/order.json", {
            method: "POST",
            body: JSON.stringify({
                user: uesrData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItem = (
        <ul className={classes['cart-item']}>
            {cartCtx.items.map(item => {
                return <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            })}
        </ul>
    );

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
    const cartModelContent = (<React.Fragment>{cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckOut && modalActions}

    </React.Fragment>
    );
    const isSubmittingModalContent = <p>Sending Order Data</p>;

    const didSubmitModalContent = (<React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>);

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModelContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
};
export default Cart;