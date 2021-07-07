import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  storePurchasedItems: (purchasedItems: CartItemType[]) => void
  checkoutMessage: string;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, storePurchasedItems, checkoutMessage }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      
      {/* Is there any item in the cart? */}
      {cartItems.length === 0  
      ? null 
      : <Button onClick = {()=> storePurchasedItems(cartItems)} color="primary">
        Purchase
        </Button>}
        <p>{checkoutMessage}</p>
    </Wrapper>
  );
};

export default Cart;
