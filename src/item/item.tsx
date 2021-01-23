import Button from '@material-ui/core/Button';

//types
import {CartItemType} from '../App'
//styles
import { Wrapper } from './item.styles'

type Props = {
    item:CartItemType
    handleAddToCart:(clickedItem:CartItemType) => void
}

export default function Item({item, handleAddToCart}:Props){
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>{item.price}</h3>
            </div>
            <Button onClick={()=>handleAddToCart(item)}>Add to cart</Button>
        </Wrapper>
    )
} 