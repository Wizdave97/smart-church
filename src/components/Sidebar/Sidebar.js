import React from 'react';
import styles from './styles';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography , Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Dashboard, InsertChart,TableChart,PersonAdd,People,GroupWork,AddBox} from '@material-ui/icons';


const sideBar = (props) =>{
  const { classes } = props
  return (
    <aside className={classes.aside}>
        <Paper square={true} elevation={0} className={classes.sideBar}>
            <List className={classes.list}>
                <Link><ListItem><Dashboard color="secondary"/><ListItemText className={classes.links} primary='Dashboard'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><InsertChart color="secondary"/><ListItemText className={classes.links} primary='Analytics'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem style={{cursor:'pointer'}}><TableChart color="secondary"/><ListItemText className={classes.links} primary='Reports'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><GroupWork color="secondary"/><ListItemText className={classes.links} primary='Branches'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><AddBox color="secondary"/><ListItemText className={classes.links} primary='Add Branch'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><PersonAdd color="secondary"/><ListItemText className={classes.links} primary='Add Staff'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><People color="secondary"/><ListItemText className={classes.links} primary='Staffs'/></ListItem></Link>
                <Divider className={classes.divider}/>
            </List>
        </Paper>
    </aside>

  )
}

export default withStyles(styles)(sideBar)
