import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import asyncComponent from './utils/asyncComponent';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import './App.css';


const asyncAddBranch=asyncComponent(()=>{
  return import('./containers/AddBranch/AddBranch')
})
const asyncAddStaff=asyncComponent(()=>{
  return import('./containers/AddStaff/AddStaff')
})
const asyncNewReport=asyncComponent(()=>{
  return import('./containers/NewReport/NewReport')
})
const asyncSettings= asyncComponent(()=>{
  return import('./containers/Settings/Settings')
})
class App  extends Component{

  componentDidMount(){

  }
  componentDidUpdate(prevProps,prevState){

  }
  render(){
    const theme=createMuiTheme(this.props.theme)
    const unAuthenticated=<Switch><Route  path='/' component={Auth}/></Switch>
    const Authenticated=(
      <Layout>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/addbranch' component={asyncAddBranch}/>
            <Route path='/addstaff' component={asyncAddStaff}/>
            <Route path='/newreport' component={asyncNewReport}/>
            <Route path='/settings' component={asyncSettings}/>
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
