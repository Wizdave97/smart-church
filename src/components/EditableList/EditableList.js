import React from 'react';
import { Paper, Button, Typography,Table,TableHead,TableRow,TableCell,TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '../ListItem/ListItem';
import Snackbar from '../NotificationSnackbar/NotificationSnackbar';
import styles from './styles';

const editableList = props => {
  const { classes, list }= props
  let listItems=null
  if(list.length!==0){
    listItems=(
      list.map(item=>{
        return <ListItem identifier={props.identifier} removeItem={props.removeItem} item={item} key={item}/>
      })
    )
  }
  return(
    <Paper elevation={6} className={classes.paper}>
      {props.fail||props.success?<Snackbar open={props.fail||props.success} color={props.success?'primary':'error'} message={props.success?'success':'failed'} handleClose={props.handleClose}/>:null}
      <Table className={classes.list}>
        <TableHead><TableRow><TableCell align="left" component="th"><Typography variant="h6">Start Adding categories</Typography></TableCell></TableRow></TableHead>
        <TableBody>
          {listItems}
        </TableBody>
      </Table>
      <div className={classes.inputBox}>
          <div className={classes.formGroup}>
              <label className={classes.label} htmlFor={props.identifier}>{props.label}</label>
              <input className={classes.formInput} id={props.identifier} value={props.value} onChange={props.handleChange(props.identifier)}/>
          </div>
          <Button onClick={()=>props.addItem(props.identifier)} variant="contained" size="small" color="secondary" fullWidth={true}>Add</Button>
      </div>
    </Paper>
  )
}
export default withStyles(styles)(editableList);
