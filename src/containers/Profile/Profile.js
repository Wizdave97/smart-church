import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { handleChange} from '../../utils/Utility';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Button,Divider, CircularProgress } from '@material-ui/core';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';



class Profile extends Component {
  state={
    newPassword:'',
    oldPassword:'',
    errorOldPassword:false,
    errorNewPassword:false,
    passwordResetStart:false,
    passwordResetFail:false,
    passwordResetSuccess:false
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }
  onUnmount=()=>{
    this.setState({passwordResetFail:false,passwordResetSuccess:false})
  }
  hardSetState=this.setState.bind(this)
  changePassword=(e)=>{
    if((!this.state.newPassword  && this.state.newPassword.length<8) && (!this.state.oldPassword  && this.state.oldPassword.length<8)){
      this.setState({
        errorNewPassword:true,
        errorOldPassword:true,
      })
      return
    }
    else {
      this.setState({errorNewPassword:false,errorOldPassword:false,passwordResetStart:true,passwordResetFail:false,passwordResetSuccess:false})
      fetch('http://api.smartchurch.com.ng/api/staffs/chpassword',{
        method:'PATCH',
        headers:{
           'Content-Type':'application/json',
           'Authorization':'Bearer'+  this.props.token
        },
        body:JSON.stringify({old_pass:this.state.oldPassword,new_pass:this.state.newPassword,id:this.props.user.id})
      }).then(res=>{
        if(!res.ok) {
          throw new Error()
        }
        return res.json()
      }).then(res=>{
        this.setState({passwordResetStart:false,passwordResetFail:false,passwordResetSuccess:true})
      }).catch(err=>{
        this.setState({passwordResetStart:false,passwordResetFail:true,passwordResetSuccess:false})
      })
    }
  }
  render(){
    const { classes,user } = this.props
    let notification=null
    if(this.state.passwordResetFail){
      notification=<Snackbar color="error" handleClose={this.onUnmount} open={this.state.passwordResetFail} message={"Password reset failed, please try again"}/>
    }
    if(this.state.passwordResetSuccess){
      notification=<Snackbar color="primary" handleClose={this.onUnmount} open={this.state.passwordResetSuccess} message={"Password reset success"}/>
    }
    return(
      <Grid container item xs={12} spacing={0} style={{padding:0}}>
        {notification}
        <Grid item xs={12} sm={8} style={{padding:0}}>
          <Paper className={classes.root} style={{padding:12}}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}><Typography variant="h3" color="primary" align="left">Profile</Typography>
                <Divider className={classes.divider}/>
              </Grid>
              <Grid item xs={3}><Typography variant="h5">Name</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.firstname+' '+user.lastname}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Email</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.email}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Phone</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.phone}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Sex</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.sex}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Status</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.status}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Staff Type</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.type}</Typography></Grid>

              <Grid item xs={3}><Typography variant="h5">Address</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={7}><Typography variant="body1">{user.address}</Typography></Grid>
                <Grid item xs={12}><Typography variant="h4" color="primary" align="left">Change Password</Typography></Grid>
                <Grid item xs={12}><Typography variant="h4" color="primary" align="left">Old Password</Typography></Grid>
                <Grid item xs={12} sm={8}>
                  <Input
                    type="text"
                    name="oldPassword"
                    value={this.state.oldPassword}
                    inputType="input"
                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                    placeholder="Old password"
                    label="Type in the old password"
                    errorMessage="Please fill in this field with at least 8 characters"
                    id="old-password"
                    required={true}
                    error={this.state.errorOldPassword}/>
                </Grid>
              <Grid item xs={12}><Typography variant="h4" color="primary" align="left">New Password</Typography></Grid>
              <Grid item xs={12} sm={8}>
                <Input
                  type="text"
                  name="newPassword"
                  value={this.state.newPassword}
                  inputType="input"
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  placeholder="New password"
                  label="Type in the new password"
                  errorMessage="Please fill in this field with at least 8 characters"
                  id="new-password"
                  required={true}
                  error={this.state.errorNewPassword}/>
                <Button onClick={this.changePassword} disabled={this.state.passwordResetStart} variant="contained" size="medium" color="primary" style={{marginLeft:10}}>Submit{this.state.passwordResetStart?<CircularProgress color="primary"/>:null}</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state =>({
  user:state.auth.user,
  token:state.auth.token
})

const mapDispatchToProps = dispatch=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile))
