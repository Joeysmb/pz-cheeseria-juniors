import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import { useState } from 'react';

type Props = {
  iteme: CartItemType;
};
//const [openPopup, setOpenPopup] = useState(false);

const Iteme: React.FC<Props> = ({ iteme}) => (
  <Wrapper>
    <img src={iteme.image} alt={iteme.title} />
    <div>
      <h3> {iteme.title}</h3>
      <h3>${iteme.price}</h3>
      <p>{iteme.description}</p>
    </div>
  </Wrapper>

  
);

export default Iteme;




// import React from 'react';
// import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
// import CardMedia from '@material-ui/core/CardMedia';
// // import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
// import { CartItemType } from '../../App';


// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       margin: 0,
//       padding: theme.spacing(2),
//     },
//     closeButton: {
//       position: 'absolute',
//       right: theme.spacing(1),
//       top: theme.spacing(1),
//       color: theme.palette.grey[500],
//     },
//   });

// export interface DialogTitleProps extends WithStyles<typeof styles> {
//   id: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme: Theme) => ({
//   root: {
//     border: "1px solid red",
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme: Theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// type Props = {popUpItem:CartItemType, openPopup:boolean, setOpenPopup:React.Dispatch<React.SetStateAction<boolean>> };

// const Popup: React.FC<Props> = ({popUpItem, openPopup, setOpenPopup}) =>{
//   // const [open, setOpen] = React.useState(false);

//   const handleClose = () => {
//     setOpenPopup(false);
//   };

  
//   return (
//     <div>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openPopup}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//         {popUpItem.title}
//         </DialogTitle>
//         <DialogContent dividers>
//         <CardMedia
//           component="img"
//           alt="Contemplative Reptile"
//           height="200"
//           image={popUpItem.image}
//           title={popUpItem.title}
//         />
//         <br/>
//           <Typography gutterBottom>
//           {popUpItem.description}
//           </Typography>
          
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Popup






















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