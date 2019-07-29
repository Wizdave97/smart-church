import React, { useState,useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar , Typography, InputBase, Switch} from '@material-ui/core';
import { Menu, Search as SearchIcon, AccountCircle,Notifications}  from '@material-ui/icons';
import  CSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup';
import ArrowTooltip from '../UI/ArrowTooltip/ArrowTooltip';
import SearchBar from '../Searchbar/Searchbar';
import './navbar.css'


const Navbar = props =>{
  const  { classes }= props
  const  [ state,setState ]= useState({searchBar:false})
  const x = window.matchMedia("(min-width:960px)");
  const removeMobileSearch = (x)=>{
    if(x.matches){
        setState({
          searchBar:false
        })
      }
  }
  const closeSearchBar=()=>{
    setState({
      searchBar:false
    })
  }
  useEffect(()=>{
    x.addListener(removeMobileSearch)
  },[])
  return (
    <AppBar className={classes.appbar} position="fixed" color="primary">
      <CSSTransitionGroup
          transitionName='searchbar'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionEnter={true}
          transitionLeave={true}>
          {state.searchBar?<SearchBar closeSearchBar={closeSearchBar}/>:null}
      </CSSTransitionGroup>
      <CSSTransitionGroup
        transitionName="navbar"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
        >
        <Toolbar className={classes.toolbar} variant="dense">
            <div className={classes.navbar}>
                <div className={classes.one}>
                    <div onClick={()=>props.toggleSideBar()} className={classes.menuIcon} tabIndex="0"><Menu/></div>
                    <div className={classes.churchName} tabIndex="0"><Typography className={classes.navText} variant="h1"> Smart Church</Typography></div>
                      <div onClick={()=>setState(state=>({searchBar:!state.searchBar }))} className={classes.searchButton} tabIndex="0">
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
                        <Typography variant="h1">Smart Church</Typography>
                    </div>
                </div>
                <div className={classes.three}>
                   <div className={classes.iconContainer}>
                        <div className={[classes.icons].join(' ')}>
                            <ArrowTooltip title="Toggle light/dark theme">
                                <Switch  onChange={(event)=>props.toggleTheme(event.target.checked)} color="secondary" />
                            </ArrowTooltip>
                          </div>
                        <div className={[classes.icons,classes.hide].join(' ')} tabIndex="0"><Notifications/></div>
                        <div className={classes.profileName}><Typography variant="body1">Sarah Mckenzie</Typography></div>
                        <div className={classes.icons} tabIndex="0"><AccountCircle/></div>
                   </div>
                </div>
            </div>
        </Toolbar>
      </CSSTransitionGroup>
    </AppBar>
  )
}

export default withStyles(styles)(Navbar);
