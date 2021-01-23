import CartItem from '../cart_item/CartItem'
//styles
import { Wrapper } from './Cart.styles'
//types
import {CartItemType} from '../App'

type Props = {
    cartItems : CartItemType[];
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(clickedItemId:number)=>void;
}

export default function Cart({cartItems, addToCart, removeFromCart }:Props){
    const calcTotal = (items:CartItemType[]):number =>{
        return items.reduce((acc:number, item)=>{
            return acc + item.amount * item.price
        }, 0)
    }

    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map(item=>(
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
            ))}
            <h2>Total : ${calcTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}