import React from 'react'
import { Typography,TableRow,TableCell } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const listItem = props =>{
  const { classes } = props
  return(
    <TableRow className={classes.item}>
      <TableCell className={classes.item}>
      <Typography className={classes.text} variant="body1" color="inherit">{props.item}</Typography>
      <span onClick={()=>props.removeItem(props.identifier,props.item)}><Close/></span>
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(listItem);
