import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import asyncComponent from './utils/asyncComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import { autoSignIn } from './store/actions/authActions';
import './App.css';


const asyncAddBranch=asyncComponent(()=>{
  return import('./containers/AddBranch/AddBranch')
})
const asyncReports=asyncComponent(()=>{
  return import('./containers/Reports/Reports')
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
const asyncViewFinances= asyncComponent(()=>{
  return import('./containers/ViewFinances/ViewFinances')
})
const asyncBranches= asyncComponent(()=>{
  return import('./containers/Branches/Branches')
})
const asyncAnalytics= asyncComponent(()=>{
  return import('./containers/Analytics/Analytics')
})
const asyncStaffs= asyncComponent(()=>{
  return import('./containers/Staffs/Staffs')
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
      let availableRoutes=[{path:'/',cmp:Dashboard}]
      if(this.props.permissions.indexOf(7)>0){
        availableRoutes.push({path:'/allbranches',cmp:asyncBranches})
      }
      if(this.props.permissions.indexOf(8)>0){
        availableRoutes.push({path:'/allstaff',cmp:asyncStaffs})
      }
      if(this.props.permissions.indexOf(9)>0){
        availableRoutes.push({path:'/viewreports',cmp:asyncReports})
        availableRoutes.push({path:'/analytics',cmp:asyncAnalytics})
        availableRoutes.push({path:'/settings',cmp:asyncSettings})
        availableRoutes.push({path:'/viewfinances',cmp:asyncViewFinances})
      }
      if(this.props.permissions.indexOf(10)>0){
        availableRoutes.push({path:'/newreport',cmp:asyncNewReport})
        availableRoutes.push({path:'/finance',cmp:asyncFinanceReport})
      }
      if(this.props.permissions.indexOf(6)>0){
        availableRoutes.push({path:'/addbranch',cmp:asyncAddBranch})
      }
      if(this.props.permissions.indexOf(5)>0){
        availableRoutes.push({path:'/addstaff',cmp:asyncAddStaff})
      }
        routes=(
          <Layout>
              <Switch>
                {availableRoutes.map(obj=>{
                  return (<Route exact path={obj.path} component={obj.cmp} key={obj.path}/>)
                })}
                <Redirect to="/"/>
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
  isAuthenticated:state.auth.token!==null,
  permissions:state.auth.permissions
})

const mapDispatchToProps= dispatch=>({
  onAutoSignIn:()=> dispatch(autoSignIn())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
