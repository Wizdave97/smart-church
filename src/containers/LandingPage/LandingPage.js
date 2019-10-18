import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import styles from './styles';
import { Grid, Paper,AppBar, Toolbar, Fab, Typography, Divider, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Landing_1 from '../../assets/landing_1.jpg';

const LandingPage  =props=>{

    const {classes}=props
    return(
      <React.Fragment>
        <AppBar position="fixed" color="default">
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <div className={classes.logoContainer}>
                    <div className={classes.logo}></div>
                  </div>
                </div>
                <Fab  variant="extended" size="medium" color="primary" component={Link} to="/auth"><Typography variant="body1">Login</Typography></Fab>
              </Toolbar>
            </AppBar>
            <main style={{padding:16}} className={classes.main}>
              <Grid container spacing={4}>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} style={{padding:16,boxSizing:'border-box'}}>
                    <Paper className={classes.paper}>
                      <div className={classes.overlay}></div>
                      <img src={Landing_1} alt="SmartChurch"/>
                      <Button component={Link} to="/auth" size="large" className={classes.getStarted} color="primary" variant="contained">Get Started</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Typography variant="h2" style={{width:'100%',fontSize:'2rem',padding:5,boxSizing:'border-box'}} align="left">
                      Successfully manage your church on all your devices from anywhere in the world with a fluid response.
                      SmartChurch takes your church global.
                    </Typography>
                    <Typography variant="body1" style={{width:'100%',fontSize:'1.3rem',color:'rgba(0,0,0,0.75)',padding:5,boxSizing:'border-box'}} align="left" color="primary">
                      Visualize your church growth, finance records with our Analytic charts.
                      Make comparisons and easily see where you need to improve. See trends in attendance and finances over time and make well informed decisions
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                  <Grid item xs={8} sm={6} style={{display:'flex'}} >
                    <Typography variant="h4" style={{alignSelf:'center',width:'100%'}} align="center" color="primary">Fluid Experience on desktop and mobile</Typography>
                  </Grid>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                  <Grid item xs={12} md={6} className={classes.item}></Grid>
                </Grid>
              </Grid>
            </main>
            <footer className={classes.footer}>
            </footer>
          </React.Fragment>
    )
}


export default withStyles(styles)(LandingPage)
