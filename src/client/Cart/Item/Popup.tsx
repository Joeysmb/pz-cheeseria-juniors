import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import { CartItemType } from '../../App';



type Props = {popUpItem:CartItemType, openPopup:boolean, setOpenPopup:React.Dispatch<React.SetStateAction<boolean>> };



const Popup: React.FC<Props> = ({ popUpItem, openPopup, setOpenPopup }) => {
  const handleClose = () => {
    setOpenPopup(false)
  }
    return (<div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openPopup}>
        <DialogTitle id="customized-dialog-title" >
        <b>{popUpItem.title}</b>
        <br/>
        <b>{`$${popUpItem.price}`}</b>
        </DialogTitle>
        <DialogContent dividers>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={popUpItem.image}
          title={popUpItem.title}
        />
        <br/>
          <Typography gutterBottom>
          {popUpItem.description}
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
  

export default Popup






















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