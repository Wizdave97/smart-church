import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import styles from './styles';
import { Grid, Paper,AppBar, Toolbar, Fab, Typography, Divider, Button,List,ListItem,ListItemText} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Landing_1 from '../../assets/landing_1.jpg';
import Landing_2 from '../../assets/landing_2.png';
import Landing_3 from '../../assets/landing_3.jpg';
import Landing_4 from '../../assets/landing_4.jpg';
import Landing_5 from '../../assets/landing_5.png';

const LandingPage  =props=>{

    const {classes}=props
    return(
      <div className={classes.root}>
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
                <Grid container item xs={12} md={10} justify="center" spacing={4} style={{marginTop:20}}>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                  <Grid item xs={8} sm={6} style={{display:'flex'}} >
                    <Typography variant="h4" style={{alignSelf:'center',width:'100%'}} align="center" color="primary">Fluid Experience on desktop and mobile</Typography>
                  </Grid>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Typography variant="h2" style={{width:'100%',fontSize:'2rem',padding:5,boxSizing:'border-box'}} align="left">
                      Well architected permissions system for access control
                    </Typography>
                    <Typography variant="body1" style={{width:'100%',fontSize:'1.3rem',color:'rgba(0,0,0,0.75)',padding:5,boxSizing:'border-box'}} align="left" color="primary">
                      Delegate tasks to staff and control data access with our dynamic permission system
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Paper className={[classes.paper,classes.imagePadding].join(' ')}>
                      <div className={classes.overlay}></div>
                      <img src={Landing_2} alt="SmartChurch"/>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12} container justify="space-between" spacing={0}>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Paper className={classes.paper}>
                      <div className={classes.overlay}></div>
                      <img src={Landing_4} alt="SmartChurch"/>

                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Typography variant="h2" style={{width:'100%',fontSize:'2rem',padding:5,boxSizing:'border-box'}} align="left">
                      Data visualization charts that give you deep insight into tailoring your church M.O.
                    </Typography>
                    <Typography variant="body1" style={{width:'100%',fontSize:'1.3rem',color:'rgba(0,0,0,0.75)',padding:5,boxSizing:'border-box'}} align="left" color="primary">
                      Intelligient analytics of long term trends
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} container justify="space-between" spacing={0}>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Typography variant="h2" style={{width:'100%',fontSize:'2rem',padding:5,boxSizing:'border-box'}} align="left">
                      Say goodbye to bulky papers, you'll be doing the planet a favour
                    </Typography>
                    <Typography variant="body1" style={{width:'100%',fontSize:'1.3rem',color:'rgba(0,0,0,0.75)',padding:5,boxSizing:'border-box'}} align="left" color="primary">
                      Transition from paper reports to well documented digital reports accessible on all your devices
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Paper className={classes.paper}>
                      <div className={classes.overlay}></div>
                      <img src={Landing_3} alt="SmartChurch"/>

                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12} container justify="space-between" spacing={0}>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                  <Grid item xs={2} sm={3} style={{display:'flex'}}><Divider className={classes.divider} /></Grid>
                </Grid>
                <Grid item xs={12} container spacing={0}>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Paper className={classes.paper}>
                      <div className={classes.overlay}></div>
                      <img src={Landing_5} alt="SmartChurch"/>

                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.item}>
                    <Typography variant="h2" style={{width:'100%',fontSize:'2rem',padding:5,boxSizing:'border-box'}} align="left">
                      Inspect branches without the hassle of endless trips
                    </Typography>
                    <Typography variant="body1" style={{width:'100%',fontSize:'1.3rem',color:'rgba(0,0,0,0.75)',padding:5,boxSizing:'border-box'}} align="left" color="primary">
                      Easily monitor growth and activities in different branches all from the comfort of your mobile or desktop
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>
            </main>
            <footer className={classes.footer} style={{padding:16}}>
              <Grid container spacing={4} justify="space-around">
                <Grid item xs={12} sm={4}>
                  <List style={{backgroundColor:'transparent'}}>
                      <ListItem component={Button}>
                        <ListItemText primary="Why Smart Church?" style={{color:'#fff'}}/>
                      </ListItem>
                      <ListItem component={Button}>
                        <ListItemText primary="Contact Us" style={{color:'#fff'}}/>
                      </ListItem>
                      <ListItem component={Button}>
                        <ListItemText primary="About US" style={{color:'#fff'}}/>
                      </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <List>
                      <ListItem component={Button}>
                        <ListItemText primary="FAQ" style={{color:'#fff'}}/>
                      </ListItem>
                      <ListItem component={Button}>
                        <ListItemText primary="Benefits" style={{color:'#fff'}}/>
                      </ListItem>
                      <ListItem component={Button}>
                        <ListItemText primary="Privacy Policy" style={{color:'#fff'}}/>
                      </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}><Typography variant="body1" className={classes.footerText} align="center">
                  Copyright 2019 Daveshoope Webmasters. All Rights Reserved.
                </Typography></Grid>
              </Grid>
            </footer>
          </div>
    )
}


export default withStyles(styles)(LandingPage)
