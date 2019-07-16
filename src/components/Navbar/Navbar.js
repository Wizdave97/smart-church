import React from 'react'
import styles from './styles';
import { withStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar , Typography, InputBase, Grid, Switch} from '@material-ui/core';
import { Menu, Search as SearchIcon, AccountCircle,Notifications}  from '@material-ui/icons';


const Navbar = props =>{
  const  { classes }= props

  return (
    <AppBar position="fixed" color="default">
        <Toolbar variant="dense">
            <div className={classes.navbar}>
                <div className={classes.one}>
                    <div className={classes.menuIcon}><Menu/></div>
                    <div className={classes.churchName}><Typography className={classes.navText} variant="h5"> Smart Church</Typography></div>
                      <div className={classes.searchButton}>
                        <SearchIcon className={classes.iconSearch} />
                      </div>
                    <div className={classes.searchBar}>
                        <div className={classes.search}>
                             <div className={classes.searchIcon}>
                               <SearchIcon />
                             </div>
                             <InputBase
                               placeholder="Search…"
                               classes={{
                                 root: classes.inputRoot,
                                 input: classes.inputInput,
                               }}
                               inputProps={{ 'aria-label': 'Search' }}
                             />
                        </div>
                    </div>
                </div>
                <div className={classes.two}>
                    <div className={classes.logoContainer}>
                        <Typography>App Logo</Typography>
                    </div>
                </div>
                <div className={classes.three}>
                   <div className={classes.iconContainer}>
                        <div className={[classes.icons,classes.hide].join(' ')}><Switch  onChange={(event)=>props.toggleTheme(event.target.checked)} color="secondary" /></div>
                        <div className={[classes.icons,classes.hide].join(' ')}><Notifications/></div>
                        <div className={classes.profileName}><Typography variant="body1">Sarah Mckenzie</Typography></div>
                        <div className={classes.icons}><AccountCircle/></div>
                   </div>
                </div>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Navbar);
