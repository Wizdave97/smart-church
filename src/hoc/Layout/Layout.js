import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles';
import {toggleTheme } from '../../store/actions/themeActions';

class Layout extends Component {

  render(){
    const { classes } = this.props
    return (
      <React.Fragment>
          <CssBaseline/>
              <Navbar toggleTheme={this.props.toggleTheme}/>
              <main className={classes.main} style={{padding:32}}>
                  <Grid
                  container
                  spacing={8}
                  >
                      {this.props.children}
                  </Grid>
              </main>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch =>({
  toggleTheme:(mode)=> dispatch(toggleTheme(mode))
})
export default connect(null,mapDispatchToProps)(withStyles(styles)(Layout));
