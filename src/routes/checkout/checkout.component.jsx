import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                <span>Description</span>
                </div>
                <div className='header-block'>
                <span>Quantity</span>
                </div>
                <div className='header-block'>
                <span>Price</span>
                </div>
                <div className='header-block'>
                <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    );
                })}
                <span className='total'>${cartTotal}</span>
            {/* <table>
                <tbody>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                {cartItems.map((cartItem) => (
                    <tr>
                    <td><img src={cartItem.imageUrl} alt={`${cartItem.name}`} /></td>
                    <td>{cartItem.name}</td>
                    <td><span>{'<'}</span>{cartItem.quantity}<span>{'>'}</span></td>
                    <td>${cartItem.price}</td>
                    <td>X</td>
                    </tr>
                ))}
                </tbody>
            </table> */}
        </div>
    )
}

export default Checkout;