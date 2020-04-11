import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({open, type, message}) {
  const classes = useStyles();


 


  return (
    <div className={classes.root}>
      
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert  severity={type}>
           {message}
        </Alert>
      </Snackbar>
      
    </div>
  );
}