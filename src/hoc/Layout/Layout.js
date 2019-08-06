import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid,Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles';
import './routes.css'
import { authLogout} from '../../store/actions/authActions';
import {toggleTheme } from '../../store/actions/themeActions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SideBar from '../../components/Sidebar/Sidebar'

class Layout extends Component {
  state={
    showSideBar:false,
    path:'/'
  }
  componentDidMount(){

    const x=window.matchMedia("(min-width:960px)")
    this.showSideBar(x)
    x.addListener(this.showSideBar)

  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.path!==window.location.pathname){
      this.setPath(window.location.pathname)
    }
  }
  setPath= (newPath)=>{
    this.setState({path:newPath})
  }
  showSideBar=(x)=>{
    if(x.matches){
      this.setState({
        showSideBar:true
      })
    }
    else{
      this.setState({
        showSideBar:false
      })
    }
  }
  toggleSideBar = () =>{
    this.setState(state=>({
      showSideBar:!state.showSideBar
    }))
  }
  render(){
    const { classes } = this.props
    let title="Dashboard"
    switch (this.state.path) {
      case '/':
        title="Dashboard"
        break;
      case '/newreport':
        title="Service Report"
        break;
      case '/addbranch':
        title="New Branch"
        break;
      case '/settings':
        title="Settings"
        break;
      case '/finance':
        title="Income and Expenditure"
        break;
      case '/addstaff':
        title="Staff"
        break
      default:title="Dashboard"

    }
    return (
      <React.Fragment>
          <CssBaseline/>
              <div className={classes.gradient}></div>
              <Navbar logOut={this.props.onLogOut} toggleSideBar={this.toggleSideBar} toggleTheme={this.props.toggleTheme}/>
              {<CSSTransitionGroup
                transitionName="sidebar"
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                { this.state.showSideBar?<SideBar  key={"sidebar"}/>:null }
              </CSSTransitionGroup>}
              <div className={classes.root} >
                <main className={classes.main}  style={{padding:32}}>
                    <Grid
                    container
                    spacing={8}
                    justify="flex-start"
                    >
                    <div className={classes.pageInfo}>
                      <div className={classes.title}><Typography  variant="h2">{title}</Typography></div>
                    </div>
                        {this.props.children}
                    </Grid>
                </main>
              </div>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch =>({
  toggleTheme:(mode)=> dispatch(toggleTheme(mode)),
  onLogOut:()=> dispatch(authLogout())
})

export default connect(null,mapDispatchToProps)(withStyles(styles)(Layout));
