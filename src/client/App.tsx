import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
// import Iteme from './Cart/Item/Iteme';
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import Popup from './Cart/Item/Popup';

 
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
 
 
const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();
 
const App = () => {
    var [popUpItem, setpopUpitem] = useState<CartItemType>({
        id: 99,
        category: "Brazilian Cheese",
        description: "You gotta love it",
        image: "https://www.cheese.com/media/img/cheese/Abbaye-de-Belloc.jpg",
        price: 20,
        title: "No Title",
        amount: 3
      });
  const [cartOpen, setCartOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  //console.log(data);
 
  
 
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
 
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
 
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
 
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
              return ack;
            }
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
 
  const storePurchasedItems = async (purchasedItems: CartItemType[]) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchasedItems)
    };
    // console.log(cartItems)
    try {
      const responseStream = await fetch("/api/store", requestOptions);
      const jsonResponse = await responseStream.json()
      console.log(jsonResponse)
      setCartItems([]);
    } catch (error) {
      console.log("Something went wrong, check out was unsuccessful: " + error);
    }  
  };
 
  const setId = (clickedItem:CartItemType) => { 
    setpopUpitem(popUpItem = clickedItem)
    setOpenPopup(true);
    
    console.log("Setid was triggered")
    console.log(clickedItem)
  };
 
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
 
  return (
 
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>
 
            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>
 
            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>
 
              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>
 
          </Grid>
        </Toolbar>
      </StyledAppBar>
 
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          storePurchasedItems = {storePurchasedItems}
        />
      </Drawer>
 
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4} /* added onClick={setId(item)} */> 
            <Item item={item} handleAddToCart={handleAddToCart} setId={setId} />
            <Popup
              openPopup = {openPopup}
              setOpenPopup = {setOpenPopup}
              popUpItem = {popUpItem}
               
            >
              {/* <Item item = {popUpItem} handleAddToCart = {handleAddToCart} setId={setId}/> */}
              {/* <div> Description: {popUpItem.description}</div> */}
            </Popup>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
 
  );
};
 
export default App;
 

