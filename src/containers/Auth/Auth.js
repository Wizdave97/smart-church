import React, { Component } from 'react';
import { AppBar, Toolbar, Grid, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './auth.css';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"

class Auth extends Component {
  state={
    isSignUp:true,
    name:'',
    email:'',
    address:'',
    telephone:'',
    adminFName:'',
    adminLName:'',
    adminEmail:'',
    adminTelephone:'',
    adminPassword:'',
    errorName:false,
    errorEmail:false,
    errorAddress:false,
    errorTelephone:false,
    errorAdminFName:false,
    errorAdminLName:false,
    errorAdminEmail:false,
    errorAdminTelephone:false,
    errorAdminPassword:false,
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
  render() {
    const { classes } = this.props
    const { name, email,address,telephone,adminEmail,adminFName,adminLName,adminPassword,adminTelephone,
            errorName,errorEmail,errorAddress,errorTelephone,errorAdminEmail,errorAdminFName,errorAdminLName,errorAdminTelephone,errorAdminPassword}=this.state
    let references=[this.name,this.email,this.telephone,this.address,this.adminFName,this.adminLName,this.adminEmail,this.adminTelephone]
    let formDisplay=(
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
            name="telephone"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={telephone}
            placeholder="Enter the church telephone no."
            errorMessage="Please this field is required"
            error={errorTelephone}/></div>
          <div className={classes.entry} ><Input
            label="Admin FirstName"
            required={true}
            reference={this.setRef}
            id="admin-firstname"
            name="adminFName"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminFName}
            placeholder="Enter the Admin's Firstname"
            errorMessage="Please this field is required"
            error={errorAdminFName}/></div>
          <div className={classes.entry} ><Input
            label="Admin LastName"
            required={true}
            reference={this.setRef}
            id="admin-lastname"
            name="adminLName"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminLName}
            placeholder="Enter the Admin's Lastname"
            errorMessage="Please this field is required"
            error={errorAdminLName}/></div>
          <div className={classes.entry} ><Input
            label="Admin Email"
            required={true}
            id="admin-email"
            reference={this.setRef}
            name="adminEmail"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminEmail}
            pattern={emailPattern}
            placeholder="example@gmail.com"
            errorMessage="Please use a valid email"
            error={errorAdminEmail}/></div>
          <div className={classes.entry} ><Input
            label="Admin Telephone Number"
            required={true}
            reference={this.setRef}
            id="admin-telephone"
            name="adminTelephone"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminTelephone}
            placeholder="Enter the Admin's Phone No."
            errorMessage="Please this field is required"
            error={errorAdminTelephone}/></div>
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
    )
    if(!this.state.isSignUp) {
      references=[this.adminEmail]
        formDisplay=(
          <div className={classes.contain}>
          <div className={classes.entry} ><Typography color="primary" variant="h2" align="center">The next generation church management tool.<br></br>Welcome</Typography></div>
          <div className={classes.entry} ><Input
            label="Admin Email"
            required={true}
            reference={this.setRef}
            id="admin-email"
            name="adminEmail"
            type="text"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminEmail}
            pattern={emailPattern}
            placeholder="Email"
            errorMessage="Please use a valid email"
            error={errorAdminEmail} /></div>
          <div className={classes.entry} ><Input
            label="Password"
            required={true}
            id="admin-password"
            name="adminPassword"
            type="password"
            inputType="input"
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            value={adminPassword}
            placeholder="Password"
            errorMessage="Please fill in the correct password"
            error={errorAdminPassword}/></div>
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
    )
    }
    return(
    <div className={classes.root}>
    <AppBar position="fixed" color="secondary">
        <Toolbar>
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
          <Grid item xs={12} sm={8} className={classes.gridItem} >
              <Paper square={true} className={classes.paper} >
                <div className={classes.gradient}></div>
                <form className={classes.form} noValidate={true} onSubmit={submitHandler(references,this.hardSetState)}>
                  <CSSTransitionGroup
                    transitionName="auth"
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                      {formDisplay}
                  </CSSTransitionGroup>
                </form>
              </Paper>
          </Grid>
      </Grid>
    </div>
    )
  }
}

export default withStyles(styles)(Auth);
