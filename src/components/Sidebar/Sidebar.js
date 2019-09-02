import React from 'react';
import styles from './styles';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import './sidebar.css';
import {Paper, Typography , Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Dashboard,Settings, InsertChart,TableChart,PersonAdd,People,GroupWork,AddBox} from '@material-ui/icons';


const SideBar = (props) =>{
  const { classes } = props

  return (
    <aside id="style-9" className={classes.aside}>
        <div className={classes.space}></div>
        <Paper  square={true} elevation={0} className={classes.sideBar} onClick={()=>props.toggleSideBar()}>
          <div className={classes.section}>
            <div className={classes.title}>
                <Typography  className={classes.titleText} align="left" variant='h5'>Setup</Typography>
            </div>
            <Divider className={classes.divider}/>
            <List className={classes.list}>
              <NavLink to="/settings" ><ListItem><Settings className={classes.icons}/><ListItemText className={classes.links} primary='Settings'/></ListItem></NavLink>
              <Divider className={classes.divider}/>
              {
                props.permissions.indexOf(8)>0?(<React.Fragment><ListItem style={{cursor:'pointer'}} onClick={()=>props.resetBranchId()}><Settings className={classes.icons}/><ListItemText className={classes.links} primary='Reset to My Branch'/></ListItem>
              <Divider className={classes.divider}/></React.Fragment>):null
              }
            </List>
          </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography  className={classes.titleText} align="left" variant='h5'>General</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                <NavLink to="/" exact><ListItem><Dashboard className={classes.icons}/><ListItemText className={classes.links} primary='Dashboard'/></ListItem></NavLink>
                <Divider className={classes.divider}/>
                <NavLink to="/analytics" ><ListItem><InsertChart className={classes.icons}/><ListItemText className={classes.links} primary='Analytics'/></ListItem></NavLink>
                <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Reports</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <NavLink to="/newreport/new" ><ListItem><AddBox className={classes.icons}/><ListItemText className={classes.links} primary='New Service Report'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
                  <NavLink to="/viewreports" ><ListItem><TableChart className={classes.icons}/><ListItemText className={classes.links} primary='View Reports'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Finance</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <NavLink to="/finance/new" ><ListItem><AddBox className={classes.icons}/><ListItemText className={classes.links} primary='New Finance Report'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
                  <NavLink to="/viewfinances" ><ListItem><InsertChart className={classes.icons}/><ListItemText className={classes.links} primary='View Finance Reports'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Branches</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <NavLink to="/addbranch/new" ><ListItem><AddBox className={classes.icons}/><ListItemText className={classes.links} primary='New Branch'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
                  <NavLink to="/allbranches" ><ListItem><GroupWork className={classes.icons}/><ListItemText className={classes.links} primary='All Branches'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Staffs</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <NavLink to="/addstaff/new" ><ListItem><PersonAdd className={classes.icons}/><ListItemText className={classes.links} primary='New Staff'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
                  <NavLink to="/allstaff" ><ListItem><People className={classes.icons}/><ListItemText className={classes.links} primary='All Staff'/></ListItem></NavLink>
                  <Divider className={classes.divider}/>
              </List>
            </div>
        </Paper>
    </aside>

  )
}

export default withStyles(styles)(SideBar)
