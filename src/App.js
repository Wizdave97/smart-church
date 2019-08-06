import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import asyncComponent from './utils/asyncComponent';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import { autoSignIn } from './store/actions/authActions';
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
const asyncFinanceReport= asyncComponent(()=>{
  return import('./containers/Finance/FinanceReport')
})
class App  extends Component{


  componentDidMount(){
    this.props.onAutoSignIn()
  }
  componentDidUpdate(prevProps,prevState){

  }
  render(){
    const theme=createMuiTheme(this.props.theme)
    let routes=<Switch><Route  path='/' component={Auth}/></Switch>
    if(this.props.isAuthenticated){
      routes=(
        <Layout>
            <Switch>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/addbranch' component={asyncAddBranch}/>
              <Route path='/addstaff' component={asyncAddStaff}/>
              <Route path='/newreport' component={asyncNewReport}/>
              <Route path='/settings' component={asyncSettings}/>
              <Route path='/finance' component={asyncFinanceReport}/>
            </Switch>
        </Layout>
      )
    }
    return (
        <MuiThemeProvider theme={theme}>
            {routes}
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps= state =>({
  theme:state.theme,
  isAuthenticated:state.auth.token!==null
})

const mapDispatchToProps= dispatch=>({
  onAutoSignIn:()=> dispatch(autoSignIn())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
