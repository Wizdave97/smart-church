import React, { Component } from 'react';
import { AppBar, Toolbar, Grid, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './auth.css';
import { authAsync }  from '../../store/actions/authActions';
import Spinner from '../../components/UI/Spinner/Spinner';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"

class Auth extends Component {
  state={
    isSignUp:true,
    name:'',
    email:'',
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
    errorSex:false,
    errorAdminfname:false,
    errorAdminlname:false,
    errorAdminemail:false,
    errorAdminsex:'',
    errorPassword:false,
    fixValidityBug:''
  }
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
      console.log(authData)
      this.props.onSubmitAuth(this.state.isSignUp,authData)
    }
  }
  render() {
    const { classes } = this.props
    const { name, email,address,phone,adminemail,adminfname,adminlname,password,adminsex,
            errorName,errorEmail,errorAddress,errorPhone,errorAdminemail,errorAdminfname,errorAdminlname,errorAdminsex,errorPassword}=this.state
    let references=[this.name,this.email,this.phone,this.address,this.adminfname,this.adminlname,this.adminemail,this.adminsex]
    let formDisplay=(
      <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
      <div className={classes.contain}>
          <div className={classes.entry} ><Typography color="primary" variant="h2" align="center">The next generation church management tool<br></br>Sign up in seconds</Typography></div>
          <div className={classes.entry} ><Input
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
            error={errorName} /></div>
          <div className={classes.entry} ><Input
            label="Church Email"
            required={true}
            reference={this.setRef}
            id="church-email"
            name="email"
            type="email"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={email}
            pattern={emailPattern}
            placeholder="Enter the church email"
            errorMessage="Please fill in a valid email"
            error={errorEmail}/></div>
          <div className={classes.entry} ><Input
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
            error={errorAddress}/></div>
          <div className={classes.entry} ><Input
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
            error={errorPhone}/></div>
          <div className={classes.entry} ><Input
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
            error={errorAdminfname}/></div>
          <div className={classes.entry} ><Input
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
            error={errorAdminlname}/></div>
          <div className={classes.entry} ><Input
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
            error={errorAdminemail}/></div>
          <div className={classes.entry} ><Input
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
            error={errorAdminsex}/></div>
            <div className={classes.entry} ><Input
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
              error={errorAdminsex}/></div>
          <div className={classes.entry}>
            <Button
            fullWidth={true}
            size="large"
            type="submit"
            variant="contained"
            classes={{outlined:classes.button}}
            color="secondary">Create Account</Button></div>
          <div className={classes.entry} >
            <Typography color="primary" variant="body1" align="center">Already have an account? <span onClick={this.switchAuthMode} className={classes.span}>Login</span></Typography></div>
      </div>
    </form>
    )
    if(!this.state.isSignUp && !this.props.authStart) {
      references=[this.email]
        formDisplay=(
          <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
          <div className={classes.contain}>
          <div className={classes.entry} ><Typography color="primary" variant="h2" align="center">The next generation church management tool.<br></br>Welcome</Typography></div>
          <div className={classes.entry} ><Input
            label="Admin Email"
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
            id="admin-password"
            name="password"
            type="password"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={password}
            placeholder="Password"
            errorMessage="Please fill in the correct password"
            error={errorPassword}/></div>
            <div className={classes.entry}>
              <Button
              fullWidth={true}
              size="large"
              type="submit"
              variant="contained"
              classes={{outlined:classes.button}}
              color="secondary">Login</Button></div>
            <div className={classes.entry} >
              <Typography color="primary" variant="body1" align="center">Don't have an account? <span onClick={this.switchAuthMode}  className={classes.span}>Signup</span></Typography></div>
        </div>
      </form>
    )
    }
    if(this.props.authStart){
      formDisplay=<Spinner/>
    }
    return(
    <React.Fragment>
      {this.props.isAuthenticated?<Redirect to="/"/>:null}
    <div className={classes.root}>
    <div className={classes.topGradient}></div>
    <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h1" align="center">Smart Church</Typography>
          </div>
        </Toolbar>
    </AppBar>
    <Grid
    container
    justify="center"
    className={classes.container}
      >
          <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem} >
              <Paper elevation={4} square={true} className={classes.paper} >
                <div className={classes.gradient}></div>
                  <CSSTransitionGroup
                    transitionName="auth"
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                      {formDisplay}
                  </CSSTransitionGroup>
              </Paper>
          </Grid>
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
  onSubmitAuth: (isSignUp,authData)=> dispatch(authAsync(isSignUp, authData))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Auth));
