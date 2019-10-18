import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import styles from './styles';
import { Grid, Paper,AppBar, Toolbar, Fab, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Landing  =props=>{

    const {classes}=props
    return(
      <>
        <AppBar position="fixed" color="default">
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <div className={classes.logoContainer}>
                    <div className={classes.logo}></div>
                  </div>
                </div>
                <Fab variant="extended" size="medium" color="primary" component={Link} to="/auth"><Typography variant="body1">Login</Typography></Fab>
              </Toolbar>
            </AppBar>
            <main style={{padding:16}} className={classes.main}>
              <Grid container spacing={4}>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
              </Grid>
            </main>
            <footer className={classes.footer}>
            </footer>
          </>
    )
}


export default withStyles(styles)(Landing)
