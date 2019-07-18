import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard'

class App  extends Component{
  render(){
    const theme=createMuiTheme(this.props.theme)
    return (
        <MuiThemeProvider theme={theme}>
            <Layout>
                <Switch>
                    <Route path='/' component={Dashboard}/>
                </Switch>
            </Layout>
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps= state =>({
  theme:state.theme
})
export default connect(mapStateToProps)(App);
