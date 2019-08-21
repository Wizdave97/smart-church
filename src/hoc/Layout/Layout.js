import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid,Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles';
import Sunrise from '../../assets/sunrise.png';
import Sunset from '../../assets/sunset.png';
import Sunny from '../../assets/sunny.png';
import './routes.css'
import { authLogout} from '../../store/actions/authActions';
import {toggleTheme } from '../../store/actions/themeActions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SideBar from '../../components/Sidebar/Sidebar'

class Layout extends Component {
  state={
    showSideBar:false,
    hours:null
  }
  componentDidMount(){
    this.checkTime()
    const x=window.matchMedia("(min-width:960px)")
    this.showSideBar(x)
    x.addListener(this.showSideBar)

  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.hours!==new Date().getHours()){
      this.checkTime()
    }
  }
  setPath= (newPath)=>{
    this.setState({path:newPath})
  }
  checkTime=()=>{
    let hours=new Date().getHours()
    this.setState({hours:hours})
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
    const { hours }=this.state
    let greeting=null
    let src=null
    if(hours>=0 && hours<=11){
      greeting="Good Morning"
      src=Sunrise
    }
    else if (hours>=12 && hours<=16) {
      greeting="Good Afternoon"
      src=Sunny
    }
    else {
      greeting="Good Evening"
      src=Sunset
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
                    style={{padding:32,display:'block'}}
                    justify="flex-start"
                    >
                    <div className={classes.pageInfo}>
                      <div className={classes.title}><Typography  variant="h2">{greeting}</Typography><div><img src={src} /></div></div>
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
