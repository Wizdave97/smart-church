import React from 'react';
import { Snackbar,IconButton,Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons'

const styles= theme =>({
  close: {
  padding: theme.spacing(0.5),
  },

})

const NotificationSnackbar = props =>{
  const { classes }= props
  return(
    <Snackbar
    anchor={{
      vertical:'top',
      horizontal:'center',
    }}
    open={props.open}
    onClose={props.handleClose}
    autoHideDuration={2500}
    message={<Typography color={props.color} variant="body1" id="message-id">{props.message ? props.message : undefined}</Typography>}
    action={[
      <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>,
    ]}
    />
  )
}

export default withStyles(styles)(NotificationSnackbar)
