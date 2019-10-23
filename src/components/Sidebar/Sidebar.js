import React from 'react';
import styles from './styles';
import { Link,withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowTooltip from '../UI/ArrowTooltip/ArrowTooltip';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Dashboard,Settings, InsertChart,TableChart,PersonAdd,People,GroupWork,AddBox} from '@material-ui/icons';


const SideBar = (props) =>{
  const { classes } = props
  const theme = useTheme();
  const handleBranchReset=()=>{
    props.resetBranchId()
    props.closeSideBar()
    props.history.push('/')
  }
  return (
      <Drawer
        variant="permanent"
        className={[
            classes.drawer,
            props.showSideBar?classes.drawerOpen:'',
            !props.showSideBar?classes.drawerClose:''
        ].join(' ')}
        classes={{
          paper:[  props.showSideBar?classes.drawerOpen:'',
            !props.showSideBar?classes.drawerClose:''].join(' '),
        }}
        open={props.showSideBar}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.toggleSideBar}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
          {props.permissions.indexOf(9)>=0?
            <React.Fragment>
              <List className={classes.list}>
                  <ArrowTooltip title="Dashboard">
                  <ListItem button component={Link} to="/" onClick={props.closeSideBar}>
                    <ListItemIcon><Dashboard className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Dashboard'/>
                  </ListItem>
                  </ArrowTooltip>
                  <ArrowTooltip title="Analytics">
                  <ListItem  button component={Link} to="/analytics"  onClick={props.closeSideBar}>
                    <ListItemIcon><InsertChart className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Analytics'/>
                  </ListItem>
                  </ArrowTooltip>
                  <ArrowTooltip title="Trend Analysis">
                  <ListItem button component={Link} to="/trends" onClick={props.closeSideBar}>
                    <ListItemIcon><InsertChart className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Trend Analysis'/>
                  </ListItem>
                  </ArrowTooltip>
              </List>
              <Divider />
            </React.Fragment>:null}
            <List className={classes.list}>
              {props.permissions.indexOf(6)>=0?(
                <React.Fragment>
                  <ArrowTooltip title="Create Attendance Report">
                  <ListItem to="/newreport/new"  button component={Link} onClick={props.closeSideBar}>
                    <ListItemIcon><AddBox className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Create Attendance Report'/>
                  </ListItem>
                  </ArrowTooltip>
                </React.Fragment>
              ):null}
                {props.permissions.indexOf(7)>=0?(
                  <React.Fragment>
                    <ArrowTooltip title="View Attendance Reports">
                    <ListItem to="/viewreports"  button component={Link} onClick={props.closeSideBar}>
                      <ListItemIcon><TableChart className={classes.icons}/></ListItemIcon>
                      <ListItemText className={classes.links} primary='Attendance Reports'/>
                    </ListItem>
                    </ArrowTooltip>
                  </React.Fragment>
                ):null}
            </List><Divider/>
            <List className={classes.list}>
                  {props.permissions.indexOf(6)>=0?(
                    <React.Fragment>
                      <ArrowTooltip title="Create Financial Report">
                      <ListItem to="/finance/new" button component={Link} onClick={props.closeSideBar}>
                        <ListItemIcon><AddBox className={classes.icons}/></ListItemIcon>
                        <ListItemText className={classes.links} primary='Create Financial Report'/>
                      </ListItem>
                      </ArrowTooltip>
                    </React.Fragment>
                  ):null}
                  {props.permissions.indexOf(7)>=0?(
                    <React.Fragment>
                      <ArrowTooltip title="View Financial Reports">
                      <ListItem to="/viewfinances" button component={Link} onClick={props.closeSideBar} >
                        <ListItemIcon><InsertChart className={classes.icons}/></ListItemIcon>
                        <ListItemText className={classes.links} primary='Financial Reports'/>
                      </ListItem>
                      </ArrowTooltip>
                    </React.Fragment>
                  ):null}
            </List><Divider/>
            <List className={classes.list}>
              {props.permissions.indexOf(9)>=0?(
                <React.Fragment>
                  <ArrowTooltip title="View Branches">
                  <ListItem to="/allbranches" button component={Link} onClick={props.closeSideBar} >
                    <ListItemIcon><GroupWork className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Branches'/>
                  </ListItem>
                  </ArrowTooltip>
                </React.Fragment>
              ):null}
              {props.permissions.indexOf(2)>=0?(
                <React.Fragment>
                  <ArrowTooltip title="Create Branch">
                  <ListItem to="/addbranch/new" button component={Link} onClick={props.closeSideBar}>
                    <ListItemIcon><AddBox className={classes.icons}/></ListItemIcon>
                    <ListItemText className={classes.links} primary='Create Branch'/>
                  </ListItem>
                  </ArrowTooltip>
                </React.Fragment>
              ):null}
            </List>
            <Divider/>
              <List className={classes.list}>
                {props.permissions.indexOf(10)>=0?(
                  <React.Fragment>
                    <ArrowTooltip title="Staffs">
                    <ListItem to="/allstaff" button component={Link} onClick={props.closeSideBar}>
                      <ListItemIcon><People className={classes.icons}/></ListItemIcon>
                      <ListItemText className={classes.links} primary='Staffs'/>
                    </ListItem>
                    </ArrowTooltip>
                  </React.Fragment>
                ):null}
                {props.permissions.indexOf(4)>=0?(
                  <React.Fragment>
                    <ArrowTooltip title="Create Staff">
                    <ListItem to="/addstaff/new" button component={Link} onClick={props.closeSideBar}>
                      <ListItemIcon><PersonAdd className={classes.icons}/></ListItemIcon>
                      <ListItemText className={classes.links} primary='Create Staff'/>
                    </ListItem>
                    </ArrowTooltip>
                  </React.Fragment>
                ):null}
              </List>
              <Divider/>
                <List className={classes.list}>
                  {
                    props.permissions.indexOf(9)>=0?
                    <React.Fragment>
                      <ArrowTooltip title="Settings">
                      <ListItem to="/settings" button component={Link} onClick={props.closeSideBar}>
                        <ListItemIcon><Settings className={classes.icons}/></ListItemIcon>
                        <ListItemText className={classes.links} primary='Settings'/>
                      </ListItem>
                      </ArrowTooltip>
                      <ArrowTooltip title="Reset to default Branch">
                      <ListItem button  onClick={handleBranchReset}>
                        <ListItemIcon><Settings className={classes.icons}/></ListItemIcon>
                        <ListItemText className={classes.links} primary='Reset to default Branch'/>
                      </ListItem>
                      </ArrowTooltip>
                    </React.Fragment>:null
                  }
                </List>
      </Drawer>
  )
}

export default withRouter(withStyles(styles)(SideBar))
