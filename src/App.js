import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import asyncComponent from './utils/asyncComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import { autoSignIn } from './store/actions/authActions';
import { deleteStaffAsync } from './store/actions/staffActions';
import { deleteBranchAsync } from './store/actions/branchActions';
import './App.css';
import { Slide,Dialog,DialogContent, DialogContentText,DialogTitle,DialogActions,Button} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
const asyncTrendAnalysis= asyncComponent(()=>{
  return import('./containers/TrendAnalysis/TrendAnalysis')
})
class App  extends Component{
  state={
    openModal:false,
    dataId:null,
    identifier:null,
  }
  toggleModal=(id,identifier)=>{
    this.setState(state=>({
      openModal:!state.openModal,
      dataId:id,
      identifier:identifier
    }))
  }
  deleteRecord=()=>{
    if(this.state.identifier==='branch'){
      this.props.onDeleteBranch(this.state.dataId)
    }
    if(this.state.identifier==='staff'){
      this.props.onDeleteStaff(this.state.dataId)
    }
    if(this.state.identifier==='finance'){

    }
    if(this.state.identifier==='report'){

    }
    this.toggleModal()
  }
  componentDidMount(){
    this.props.onAutoSignIn()
  }
  componentDidUpdate(prevProps,prevState){

  }
  render(){
    let modal=(
      <Dialog
        open={this.state.openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.toggleModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirmation?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toggleModal} color="primary">
            No
          </Button>
          <Button onClick={this.deleteRecord} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
    const theme=createMuiTheme(this.props.theme)
    let routes=<Switch><Route  path='/' component={Auth}/></Switch>
    if(this.props.isAuthenticated){
      let availableRoutes=[{path:'/',cmp:Dashboard,exact:true}]
      if(this.props.permissions.indexOf(7)>0){
        availableRoutes.push({path:'/allbranches',exact:false,cmp:asyncBranches,confirm:true})
      }
      if(this.props.permissions.indexOf(8)>0){
        availableRoutes.push({path:'/allstaff',exact:false,cmp:asyncStaffs,confirm:true})
      }
      if(this.props.permissions.indexOf(9)>0){
        availableRoutes.push({path:'/viewreports',exact:false,cmp:asyncReports,confirm:true})
        availableRoutes.push({path:'/analytics',exact:false,cmp:asyncAnalytics})
        availableRoutes.push({path:'/trends',exact:false,cmp:asyncTrendAnalysis})
        availableRoutes.push({path:'/settings',exact:false,cmp:asyncSettings})
        availableRoutes.push({path:'/viewfinances',exact:false,cmp:asyncViewFinances,confirm:true})
      }
      if(this.props.permissions.indexOf(10)>0){
        availableRoutes.push({path:'/newreport/:id',exact:false,cmp:asyncNewReport})
        availableRoutes.push({path:'/finance/:id',exact:false,cmp:asyncFinanceReport})
      }
      if(this.props.permissions.indexOf(6)>0){
        availableRoutes.push({path:'/addbranch/:id',exact:false,cmp:asyncAddBranch})
      }
      if(this.props.permissions.indexOf(5)>0){
        availableRoutes.push({path:'/addstaff/:id',exact:false,cmp:asyncAddStaff})
      }
        routes=(
          <Layout>
              <Switch>
                {availableRoutes.map(obj=>{

                    if(obj.confirm){
                      return <Route exact={obj.exact} path={obj.path} render={()=>{
                          return <obj.cmp toggleModal={this.toggleModal}/>
                        }} key={obj.path}/>
                    }
                    else{
                      return <Route exact={obj.exact} path={obj.path} component={obj.cmp} key={obj.path}/>
                    }

                })}
                <Redirect to="/"/>
              </Switch>
          </Layout>
        )
    }
    return (
        <MuiThemeProvider theme={theme}>
            {modal}
            {routes}
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps= state =>({
  theme:state.theme,
  isAuthenticated:state.auth.token!==null && state.auth.status?state.auth.status.toLowerCase()==='active':false,
  permissions:state.auth.permissions
})

const mapDispatchToProps= dispatch=>({
  onAutoSignIn:()=> dispatch(autoSignIn()),
  onDeleteBranch:(id)=> dispatch(deleteBranchAsync(id)),
  onDeleteStaff:(id)=> dispatch(deleteStaffAsync(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
