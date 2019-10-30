import React,{useState} from 'react';
import { Paper,Table,TableBody,CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ListItem from './ListItem'
import styles from './styles';

const SettingsList = props => {
  const { classes }=props
  const [state,setState]=useState({data:props.data})
  const removeItem=(id)=>{
     return props.deleteItem(id,props.identifier)
  }
  let listItems=<CircularProgress color="secondary"/>
  if(props.success && state.data){
    listItems=state.data.map((obj,index)=>{
      return(
        <ListItem setState={setState} data={state.data} key={index} id={obj.id} val={obj.name?obj.name:obj.category} removeItem={removeItem}/>
      )
    })
  }
  return(
    <Paper elevation={6} className={classes.paper}>
      <Table className={classes.list}>
        <TableBody>
          {listItems}
        </TableBody>
      </Table>
    </Paper>
  )
}
export default withStyles(styles)(SettingsList);
