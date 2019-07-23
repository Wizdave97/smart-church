import React from 'react';
import styles from './styles';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import './sidebar.css';
import {Paper, Typography , Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Dashboard, InsertChart,TableChart,PersonAdd,People,GroupWork,AddBox} from '@material-ui/icons';


const sideBar = (props) =>{
  const { classes } = props
  return (
    <aside id="style-9" className={classes.aside}>
        <div className={classes.space}></div>
        <Paper square={true} elevation={0} className={classes.sideBar}>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography  className={classes.titleText} align="left" variant='h5'>General</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                <Link to="/"><ListItem><Dashboard className={classes.icons}/><ListItemText className={classes.links} primary='Dashboard'/></ListItem></Link>
                <Divider className={classes.divider}/>
                <Link><ListItem><InsertChart className={classes.icons}/><ListItemText className={classes.links} primary='Analytics'/></ListItem></Link>
                <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Reports</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <Link><ListItem><AddBox className={classes.icons}/><ListItemText className={classes.links} primary='New Report'/></ListItem></Link>
                  <Divider className={classes.divider}/>
                  <Link><ListItem><TableChart className={classes.icons}/><ListItemText className={classes.links} primary='View Reports'/></ListItem></Link>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Finance</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <Link><ListItem><Dashboard className={classes.icons}/><ListItemText className={classes.links} primary='Income'/></ListItem></Link>
                  <Divider className={classes.divider}/>
                  <Link><ListItem><InsertChart className={classes.icons}/><ListItemText className={classes.links} primary='Expenditure'/></ListItem></Link>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Branches</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <Link to="/addbranch"><ListItem><AddBox className={classes.icons}/><ListItemText className={classes.links} primary='New Branch'/></ListItem></Link>
                  <Divider className={classes.divider}/>
                  <Link><ListItem><GroupWork className={classes.icons}/><ListItemText className={classes.links} primary='All Branches'/></ListItem></Link>
                  <Divider className={classes.divider}/>
              </List>
            </div>
            <div className={classes.section}>
              <div className={classes.title}>
                  <Typography className={classes.titleText} align="left" variant='h5'>Staffs</Typography>
              </div>
              <Divider className={classes.divider}/>
              <List className={classes.list}>
                  <Link><ListItem><PersonAdd className={classes.icons}/><ListItemText className={classes.links} primary='New Staff'/></ListItem></Link>
                  <Divider className={classes.divider}/>
                  <Link><ListItem><People className={classes.icons}/><ListItemText className={classes.links} primary='All Staff'/></ListItem></Link>
                  <Divider className={classes.divider}/>
              </List>
            </div>
        </Paper>
    </aside>

  )
}

export default withStyles(styles)(sideBar)
