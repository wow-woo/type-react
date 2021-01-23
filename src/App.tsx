import {useState} from 'react' 
import {useQuery} from 'react-query'
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge';
//components
import Item from './item/item'
import Cart from './cart/Cart'
//styles
import {Wrapper, StyledButton } from './App.styles'

//types response
export type CartItemType = {
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts = async () :Promise<CartItemType[]>=> await (await fetch('https://fakestoreapi.com/products')).json();

const App = ()=> {
const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items:CartItemType[])=>{
    return items.reduce((acc:number, item) => acc + item.amount, 0)
  }

  const handleAddToCart = (clickedItem:CartItemType)=> {
    setCartItems(pre=>{
      const isItemInCart = pre.find(item=>item.id === clickedItem.id)
      const asExist = pre.map(item=>item.id===clickedItem.id?{...item, amount:item.amount+1 } : item )
      const noExist = [...pre, {...clickedItem, amount:1}]

      return isItemInCart ? asExist : noExist
    })
  };

  const handleRemoveFromCart = (clickedItemId:number)=> {
    setCartItems(prev=>{
      return prev.reduce((acc, item)=>{
        if(item.id === clickedItemId){
          if(item.amount === 1) return acc;
          return [...acc, {...item, amount : item.amount -1}]
        }else{
          return [...acc, item]
        }
      }, [] as CartItemType[])
    })
  };

  if(isLoading) return <LinearProgress />
  if(error) return <div>Error occurred</div>
  
  return (
    <Wrapper className="App">
      <Drawer anchor='right' open={cartOpen} onClose={()=> setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          data?.map(item=>(
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
