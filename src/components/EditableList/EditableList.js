import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransitionGroup } from 'react-transition-group';
import ListItem from '../ListItem/ListItem';
import './list.css';
import styles from './styles';

const editableList = props => {
  const { classes, list }= props
  let listItems=<Typography variant="body1">Start Adding categories</Typography>
  if(list.length!==0){
    listItems=(
      list.map(item=>{
        return <ListItem identifier={props.identifier} removeItem={props.removeItem} item={item} key={item}/>
      })
    )
  }
  return(
    <Paper elevation={6} className={classes.paper}>
      <div className={classes.list}>
        <CSSTransitionGroup
        transitionName="list"
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
          {listItems}
        </CSSTransitionGroup>
      </div>
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
