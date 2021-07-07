import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import ItemDialog from './Cart/Item/ItemDialog';
import RecentPurchases from "./RecentPurchases/RecentPurchases"
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
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
 
 //Retrieve the items from server for display
const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();
 
const App = () => {
    const [checkoutMessage, setcheckoutMessage] = useState<string>("");
    const [dialogItem, setDialogItem] = useState<CartItemType>({} as CartItemType);
    const [purchasesDrawer, setOpenPurchasesDrawer] = useState(false);
    const [recentlyPurchasedItems, setRecentlyPurchasedItems] = useState([] as CartItemType[]);
    const [cartOpen, setCartOpen] = useState(false);
    const [openItemDialog, setOpenItemDialog] = useState(false);
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
      type res = {
          status: string,
          message: string
      }
      //Set up the request headers
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchasedItems)
    };
      //Send request to store purchased items on the server 
      const responseStream = await fetch("/api/storeCheckout", requestOptions);
      const jsonResponse: res = await responseStream.json()
      if(jsonResponse.status === "Successful"){
          //Send greeting and Empty the cart after Purchase
        setcheckoutMessage(jsonResponse.message);
        setCartItems([]); 
      }else{
        setcheckoutMessage(jsonResponse.message);
      }
      return;
  };

  const getRecentlyPurchasedItems = async () => {
          //Get recently purchased items from server
          const responseStream = await fetch('/api/recentlyPurchasedItems');
          const recentlyPurchasedItems = await responseStream.json();
          setRecentlyPurchasedItems(recentlyPurchasedItems);
          //Open the drawer to display the recently purchased items
          setOpenPurchasesDrawer(true);
          return;
  }

  const handleOpenCart = () => {
    setCartOpen(false);
    setcheckoutMessage('');
  }
 
  const handleItemDialog = (clickedItem:CartItemType) => { 
    setDialogItem(clickedItem) //Get and set  the clicked item for popup
    setOpenItemDialog(true); //Open the dialog box
    return;
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
            <StyledButton onClick={getRecentlyPurchasedItems}>
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
 
      <Drawer anchor='right' open={cartOpen} onClose={handleOpenCart}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          storePurchasedItems = {storePurchasedItems}
          checkoutMessage = {checkoutMessage}
        />
      </Drawer>

      <Drawer anchor='left' open={purchasesDrawer} onClose={() => setOpenPurchasesDrawer(false)}>
      <RecentPurchases
        recentPurchases = {recentlyPurchasedItems}
      >

      </RecentPurchases>
      </Drawer>
 
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4} > 
            <Item item={item} handleAddToCart={handleAddToCart} handleItemDialog={handleItemDialog} />
    
          </Grid>
        ))}
        <ItemDialog
              openItemDialog = {openItemDialog}
              setOpenItemDialog = {setOpenItemDialog}
              dialogItem = {dialogItem}
            >

            </ItemDialog>
      </Grid>
    </Wrapper>
 
  );
};
 
export default App;
 

