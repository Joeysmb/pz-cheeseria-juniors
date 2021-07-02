import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import { CartItemType } from '../../App';


//Setting the Prop type
type Props = {dialogItem:CartItemType, openItemDialog:boolean, setOpenItemDialog:React.Dispatch<React.SetStateAction<boolean>> };



const ItemDialog: React.FC<Props> = ({ dialogItem, openItemDialog, setOpenItemDialog }) => {
  const handleClose = () => {
    setOpenItemDialog(false)
  }
    return (<div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openItemDialog}>
        <DialogTitle id="customized-dialog-title" >
        <b>{dialogItem.title}</b>
        <br/>
        <b>{`$${dialogItem.price}`}</b>
        </DialogTitle>
        <DialogContent dividers>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={dialogItem.image}
          title={dialogItem.title}
        />
        <br/>
          <Typography gutterBottom>
          {dialogItem.description}
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
};
  

export default ItemDialog






















// type Props = {  children:JSX.Element, desc:string, openPopup:boolean, setOpenPopup:React.Dispatch<React.SetStateAction<boolean>> };

// const Popup: React.FC<Props> = ({ children, desc, openPopup, setOpenPopup }) => (
//     <Dialog open={openPopup}>
//         {/* <DialogTitle>
         
//         </DialogTitle> */}
//         <DialogContent>
//            {children}
//            <p>{desc}</p>
//         </DialogContent>
//         <button onClick = {()=> setOpenPopup(false)}>Close</button>
//     </Dialog>
//   );
  
// export default Popup; 