import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid,Typography,Fab,Menu,MenuItem,Button,List,ListItem,Drawer,Divider} from '@material-ui/core';
import { GroupWork } from '@material-ui/icons';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles';
import Sunrise from '../../assets/sunrise.png';
import Sunset from '../../assets/sunset.png';
import Sunny from '../../assets/sunny.png';
import './routes.css';
import '../../components/Sidebar/sidebar.css';
import { authLogout, resetBranchId } from '../../store/actions/authActions';
import {  fetchBranchAsync } from '../../store/actions/branchActions';
import {  fetchStaffsAsync } from '../../store/actions/staffActions';
import { fetchReportAsync} from '../../store/actions/reportActions';
import {  fetchFinanceAsync } from '../../store/actions/financeActions';
import { changeBranchId } from '../../store/actions/authActions';
import {toggleTheme } from '../../store/actions/themeActions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import SideBar from '../../components/Sidebar/Sidebar'

const SideList =(props)=> (
    <div
      className={props.list}
      role="presentation"
      onClick={props.handleClose}
      onKeyDown={props.handleClose}
    >
      <List>
        {props.branches?props.branches.map((data,index)=>{
          return (data.status.toLowerCase()==='active'?(
           <ListItem  key={index}  onClick={props.handleClose}>
             <Button component={Link} to={`/analytics`} onClick={()=>props.onChangeBranch(data.id,data.name)} color="default" variant="text" fullWidth>{data.name}</Button>
           </ListItem>):null)
         }):null}
      </List>
      <Divider />
        <div className={props.menuNav} >
            <Button onClick={(event)=>{event.stopPropagation();props.onChangePage(props.prev)}} size="small" variant="contained" color="secondary" disabled={props.prev==null?true:false}>Previous</Button>
            <Button onClick={(event)=>{event.stopPropagation();props.onChangePage(props.next)}} size="small" variant="contained" color="secondary" disabled={props.next==null?true:false}>Next</Button>
        </div>
    </div>
  );

class Layout extends Component {
  state={
    showSideBar:false,
    hours:null,
    anchorEl:null,

  }
  componentDidMount(){
    this.checkTime()
    this.props.onFetchBranches()

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
  handleClick=(event)=> {
    this.setState({anchorEl:event.currentTarget});
  }

  handleClose=()=> {
    this.setState({anchorEl:null});
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchBranches(url)
  }
  render(){
    const { classes } = this.props
    const { hours }=this.state
    let open=Boolean(this.state.anchorEl)
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
              <Navbar showSideBar={this.state.showSideBar} logOut={this.props.onLogOut} userName={this.props.userName} toggleSideBar={this.toggleSideBar} toggleTheme={this.props.toggleTheme}/>
              {<CSSTransitionGroup
                transitionName="sidebar"
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <SideBar showSideBar={this.state.showSideBar} toggleSideBar={this.toggleSideBar} permissions={this.props.permissions} resetBranchId={this.props.onResetBranchId}  key={"sidebar"}/>
              </CSSTransitionGroup>}
              <div className={[classes.root].join(' ')} >
                <main className={classes.main}  style={{padding:16}}>
                    <Grid
                    container
                    spacing={2}
                    style={{padding:16,display:'block'}}
                    justify="flex-start"
                    >
                    <div className={classes.pageInfo}>
                      <div className={classes.title}><Typography  variant="h2">{greeting}</Typography><div><img src={src} /></div>{this.props.branchName?<Typography  variant="h2">Viewing Branch: <strong>{this.props.branchName}</strong></Typography>:null}</div>
                    </div>
                        {this.props.children}
                    </Grid>
                </main>
              </div>
              {this.props.permissions.indexOf(9)>=0?<Fab onClick={this.handleClick} color="secondary" aria-label="View Branches" className={classes.fab}>
                  <GroupWork />
              </Fab>:null}
            {this.props.permissions.indexOf(9)>=0?
            <Drawer anchor="right" open={open} onClose={this.handleClose}>
              <SideList
                next={this.props.next}
                handleClose={this.handleClose}
                prev={this.props.prev}
                onChangeBranch={this.props.onChangeBranch}
                list={classes.list}
                menuNav={classes.menuNav}
                branches={this.props.branches}
                onChangePage={this.onChangePage}/>
            </Drawer>:null}
      </React.Fragment>
    )
  }
}
const mapStateToProps= state =>({
  permissions:state.auth.permissions,
  userName:state.auth.userName,
  branchName:state.auth.branchName,
  branches:state.branch.branches,
  next:state.branch.next,
  prev:state.branch.prev,
})
const mapDispatchToProps = dispatch =>({
  onFetchBranches:(url)=> dispatch(fetchBranchAsync(url)),
  toggleTheme:(mode)=> dispatch(toggleTheme(mode)),
  onChangeBranch:(id,name)=>{
    dispatch(changeBranchId(id,name))
    dispatch(fetchBranchAsync())
    dispatch(fetchFinanceAsync())
    dispatch(fetchReportAsync())
  },
  onLogOut:()=> dispatch(authLogout()),
  onResetBranchId:()=>{
    dispatch(resetBranchId())
    dispatch(fetchFinanceAsync())
    dispatch(fetchBranchAsync())
    dispatch(fetchReportAsync())
    dispatch(fetchStaffsAsync())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Layout));
