import React, { Component } from 'react';
import { AppBar, Toolbar, Grid, Paper, Typography, Button, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './auth.css';
import { authAsync,authSync }  from '../../store/actions/authActions';
import * as actionTypes  from '../../store/actions/actionTypes';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

class Auth extends Component {
  state={
    isSignUp:false,
    name:'',
    email:'',
    regemail:'',
    address:'',
    phone:'',
    adminfname:'',
    adminlname:'',
    adminemail:'',
    adminsex:'',
    password:'',
    errorName:false,
    errorEmail:false,
    errorAddress:false,
    errorAdminfname:false,
    errorRegemail:false,
    errorAdminlname:false,
    errorAdminemail:false,
    errorAdminsex:false,
    errorPassword:false,
    fixValidityBug:''
  }
  regemail=null
  name=null
  email=null
  phone=null
  address=null
  password=null
  adminsex=null
  adminemail=null
  adminfname=null
  adminlname=null
  password=null
  componentDidMount(){
    this.setState({
      fixValidityBug:''
    })
  }
  switchAuthMode =()=>{
    this.setState(state=>({
      isSignUp:!state.isSignUp
    }))
  }
  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let authData=formSerialize(form,{hash:true})
      this.props.onSubmitAuth(this.state.isSignUp,authData)
    }
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.isSignUp!=this.state.isSignUp){
      this.setState({fixValidityBug:''})
    }
  }
  render() {
    let progress=null
    if(this.props.authStart){
      progress=<CircularProgress color="primary" />
    }
    const { classes } = this.props
    const { name,regemail,errorRegemail,email,address,phone,adminemail,adminfname,adminlname,password,
            errorName,errorEmail,errorAddress,errorPhone,errorAdminemail,errorAdminfname,errorAdminlname,errorAdminsex,errorPassword}=this.state
    let references=[this.name,this.regemail,this.phone,this.address,this.adminfname,this.adminlname,this.adminemail,this.adminsex]
    let notification=null;
    if (this.props.authSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.authSuccess} message={"Authentication Successful"}/>
    }
    if (this.props.authFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.authFail} message={"Check your Network or Make sure the details are correct"}/>
    }

    let formDisplay=(
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.gridItem} >
          <Paper elevation={4} square={true} className={classes.paper} >
            <div className={classes.gradient}></div>
            <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
              <div className={classes.contain}>
                <div className={classes.mobileLogoContainer} >
                  <div className={classes.logoContainer}>
                    <div className={classes.mobileLogo}></div>
                  </div>
                  <Typography color="primary" variant="h2" align="center">Welcome<br></br>Sign up in seconds</Typography>
                </div>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} sm={6}><div className={classes.entry} ><Input
                    label="Church Name"
                    required={true}
                    id="church-name"
                    reference={this.setRef}
                    name="name"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={name}
                    placeholder="Enter the name of the church"
                    errorMessage="Please this field is required"
                    error={errorName} /></div></Grid>
                  <Grid item xs={12} sm={6}><div className={classes.entry} ><Input
                    label="Church Email"
                    required={true}
                    reference={this.setRef}
                    id="church-email"
                    name="regemail"
                    type="email"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={regemail}
                    pattern={emailPattern}
                    placeholder="Enter the church email"
                    errorMessage="Please fill in a valid email"
                    error={errorRegemail}/></div></Grid>
                </Grid>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} sm={6}><div className={classes.entry} ><Input
                    label="Address"
                    required={true}
                    reference={this.setRef}
                    id="church-address"
                    name="address"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={address}
                    placeholder="Enter the church address"
                    errorMessage="Please this field is required"
                    error={errorAddress}/></div></Grid>
                  <Grid item xs={12} sm={6}><div className={classes.entry} ><Input
                    label="Telephone"
                    required={true}
                    reference={this.setRef}
                    id="church-telephone"
                    name="phone"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={phone}
                    placeholder="Enter the church telephone no."
                    errorMessage="Please this field is required"
                    error={errorPhone}/></div></Grid>
                </Grid>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} sm={6}>  <div className={classes.entry} ><Input
                    label="Admin FirstName"
                    required={true}
                    reference={this.setRef}
                    id="admin-firstname"
                    name="adminfname"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={adminfname}
                    placeholder="Enter the Admin's Firstname"
                    errorMessage="Please this field is required"
                    error={errorAdminfname}/></div></Grid>
                  <Grid item xs={12} sm={6}><div className={classes.entry} ><Input
                    label="Admin LastName"
                    required={true}
                    reference={this.setRef}
                    id="admin-lastname"
                    name="adminlname"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={adminlname}
                    placeholder="Enter the Admin's Lastname"
                    errorMessage="Please this field is required"
                    error={errorAdminlname}/></div></Grid>
                </Grid>
                <Grid container spacing={0} justify="space-between">
                  <Grid item xs={12} sm={6}>  <div className={classes.entry} ><Input
                    label="Admin Email"
                    required={true}
                    id="admin-email"
                    reference={this.setRef}
                    name="adminemail"
                    type="text"
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    value={adminemail}
                    pattern={emailPattern}
                    placeholder="example@gmail.com"
                    errorMessage="Please use a valid email"
                    error={errorAdminemail}/></div></Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                <Grid container spacing={0} justify="space-between">
                  <Grid item sm={12}><Typography variant="body1" align="left" style={{paddingLeft:16}}>Choose Sex</Typography></Grid>
                  <Grid item xs={12} sm={6}> <div className={classes.entry} ><Input
                    label="Male"
                    required={true}
                    reference={this.setRef}
                    id="male"
                    name="adminsex"
                    type="text"
                    inputType="radio"
                    value="male"
                    helperText="Select male or female"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    errorMessage="Please this field is required"
                    error={errorAdminsex}/></div></Grid>
                  <Grid item xs={12} sm={6}><div className={classes.entry}><Input
                    label="Female"
                    required={true}
                    reference={this.setRef}
                    id="female"
                    name="adminsex"
                    type="text"
                    inputType="radio"
                    value="female"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    errorMessage="Please this field is required"
                    error={errorAdminsex}/></div></Grid>
                </Grid>
                <div className={classes.entry}>
                  <Button
                    fullWidth={true}
                    disabled={this.props.authStart}
                    size="large"
                    type="submit"
                    variant="contained"
                    classes={{outlined:classes.button}}
                    color="secondary">Create Account{progress}</Button></div>
                  <div className={classes.entry} >
                    <Typography color="primary" variant="body1" align="center">Already have an account? <span onClick={this.switchAuthMode} className={classes.span}>Login</span></Typography></div>
                  </div>
                </form>
              </Paper>
            </Grid>

          )
    if(!this.state.isSignUp) {
      references=[this.email,this.password]
        formDisplay=(
          <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem} >
              <Paper elevation={4} square={true} className={classes.paper} >
                <div className={classes.gradient}></div>
                <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
                  <div className={classes.contain}>
                    <div className={classes.mobileLogoContainer} >
                      <div className={classes.logoContainer}>
                        <div className={classes.mobileLogo}></div>
                      </div>
                      <Typography color="primary" variant="h2" align="center">Welcome back.</Typography>
                    </div>
                    <div className={classes.entry} ><Input
                      label="Email"
                      required={true}
                      reference={this.setRef}
                      id="email"
                      name="email"
                      type="text"
                      inputType="input"
                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                      value={email}
                      pattern={emailPattern}
                      placeholder="Email"
                      errorMessage="Please use a valid email"
                      error={errorEmail} /></div>
                    <div className={classes.entry} ><Input
                      label="Password"
                      required={true}
                      reference={this.setRef}
                      id="admin-password"
                      name="password"
                      type="password"
                      inputType="input"
                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                      value={password}
                      placeholder="Password"
                      errorMessage="Please fill in your password"
                      error={errorPassword}/></div>
                    <div className={classes.entry}>
                      <Button
                        disabled={this.props.authStart}
                        fullWidth={true}
                        size="large"
                        type="submit"
                        variant="contained"
                        classes={{outlined:classes.button}}
                        color="secondary">Login {progress}</Button></div>
                      <div className={classes.entry} >
                        <Typography color="primary" variant="body1" align="center">Don't have an account? <span onClick={this.switchAuthMode}  className={classes.span}>Signup</span></Typography></div>
                      </div>
                    </form>
                  </Paper>
                </Grid>

              )
            }
    return(
    <React.Fragment>
      {this.props.isAuthenticated?<Redirect to="/"/>:null}
    <div className={classes.root}>

      {notification}
    <div className={classes.topGradient}></div>
    <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <div className={classes.logoContainer}>
                <div className={classes.logo}></div>
            </div>
          </div>
        </Toolbar>
    </AppBar>
    <div className={classes.overlay}></div>
    <Grid
    container
    justify="center"
    className={classes.container}
      >

                      {formDisplay}

      </Grid>
    </div>
  </React.Fragment>
    )
  }
}
const mapStateToProps = state =>({
  authStart:state.auth.authStart,
  authFail:state.auth.authFail,
  authSuccess:state.auth.authSuccess,
  isAuthenticated:state.auth.token!==null

})
const mapDispatchToProps= dispatch =>({
  onSubmitAuth: (isSignUp,authData)=> dispatch(authAsync(isSignUp, authData)),
  onUnmount:()=> dispatch(authSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Auth));
