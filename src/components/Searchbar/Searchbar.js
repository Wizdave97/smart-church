import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputBase,AppBar } from '@material-ui/core';
import { Search, ArrowBack} from '@material-ui/icons'
import styles from './styles';
import './searchbar.css'

const searchBar = props => {
  const { classes } = props
  return(
    <div className={classes.container}>
        <AppBar position='relative' color="default">
        <div className={classes.searchBar}>
            <div  className={classes.backIcon} onClick={()=>props.closeSearchBar()}><ArrowBack /></div>
            <div className={classes.searchIcon}><Search/></div>
            <InputBase
              fullWidth={true}
              placeholder="Search"
              label="Search"
              type="search"
              classes={{
                root:classes.inputRoot,
                input:classes.inputInput
              }}
              inputProps={{'aria-label':'search'}}
             />
        </div>
        </AppBar>
    </div>
  )
}

export default withStyles(styles)(searchBar);
