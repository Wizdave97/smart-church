import React, { useState } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { CircularProgress,TableRow,TableCell,Typography } from '@material-ui/core';


const ListItem=props=>{
   const { classes }=props
   const [deleting,setState]=useState(false)
   const removeItem=()=>{
     setState(true)
     props.removeItem(props.id).then(res=>{
       setState(res)
       for(let index in props.data){
         if(props.data[index].id==props.id){
           let data=[...props.data]
           data.splice(index,1)
           props.setState({data:data})
         }
       }
     }).catch(err=>{
       setState(err)
     })
   }
   return (
     <TableRow className={classes.item}>
       <TableCell className={classes.item}>
       <Typography className={classes.text} variant="body1" color="inherit">{props.val}</Typography>
       <span onClick={()=>removeItem()}>{deleting?<CircularProgress color="secondary"/>:<Delete color="error"/>}</span>
       </TableCell>
     </TableRow>
   )
}

export default withStyles(styles)(ListItem)
