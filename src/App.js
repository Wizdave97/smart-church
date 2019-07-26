import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import AddBranch from './containers/AddBranch/AddBranch';
import AddStaff from './containers/AddStaff/AddStaff';
import NewReport from './containers/NewReport/NewReport';
import Auth from './containers/Auth/Auth';
import Settings from './containers/Settings/Settings';

class App  extends Component{
  render(){
    const theme=createMuiTheme(this.props.theme)
    const unAuthenticated=<Switch><Route  path='/' component={Auth}/></Switch>
    const Authenticated=(
      <Layout>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/addbranch' component={AddBranch}/>
            <Route path='/addstaff' component={AddStaff}/>
            <Route path='/newreport' component={NewReport}/>
            <Route path='/settings' component={Settings}/>
          </Switch>
      </Layout>
    )
    return (
        <MuiThemeProvider theme={theme}>
            {Authenticated}
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps= state =>({
  theme:state.theme
})
export default connect(mapStateToProps)(App);
