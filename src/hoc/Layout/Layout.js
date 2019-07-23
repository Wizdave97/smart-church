import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid,Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles';
import {toggleTheme } from '../../store/actions/themeActions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SideBar from '../../components/Sidebar/Sidebar'

class Layout extends Component {
  state={
    showSideBar:false
  }
  componentDidMount(){

    const x=window.matchMedia("(min-width:960px)")
    this.showSideBar(x)
    x.addListener(this.showSideBar)
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
    const path=window.location.pathname
    return (
      <React.Fragment>
          <CssBaseline/>
              <Navbar toggleSideBar={this.toggleSideBar} toggleTheme={this.props.toggleTheme}/>
              {<CSSTransitionGroup
                transitionName="sidebar"
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                { this.state.showSideBar?<SideBar key={"sidebar"}/>:null }
              </CSSTransitionGroup>}
              <div className={[classes.root,path=='/addbranch'?classes.branchBackground:' ',].join(' ')} >
                <main className={classes.main}  style={{padding:32}}>
                    <Grid
                    container
                    spacing={8}
                    justify="flex-start"
                    >
                    <div className={classes.pageInfo}>
                      <div className={classes.title}><Typography  variant="h2">Dashboard</Typography></div>
                      <div className={classes.breadcrumb}><Typography variant="body1">Breadcrumbs</Typography></div>
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
  toggleTheme:(mode)=> dispatch(toggleTheme(mode))
})
export default connect(null,mapDispatchToProps)(withStyles(styles)(Layout));
