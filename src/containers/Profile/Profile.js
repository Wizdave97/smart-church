import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { handleChange} from '../../utils/Utility';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Button,Divider } from '@material-ui/core';




class Profile extends Component {
  state={
    newPassword:'',
    errorNewPassword:false
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }
  hardSetState=this.setState.bind(this)
  changePassword=(e)=>{
    if(!this.state.newPassword  && this.state.newPassword.length<8){
      this.setState({
        errorNewPassword:true
      })
      return
    }
    else this.setState({errorNewPassword:false})
  }
  render(){
    const { classes,user } = this.props
    return(
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.root} style={{padding:4}}>
            <Grid container item xs={12} spacing={2} style={{padding:32}}>
              <Grid item xs={12}><Typography variant="h3" color="primary" align="left">Profile</Typography>
                <Divider className={classes.divider}/>
              </Grid>


              <Grid item xs={4}><Typography variant="h5">Name</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.firstname+' '+user.lastname}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Email</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.email}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Phone</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.phone}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Sex</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.sex}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Status</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.status}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Staff Type</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.type}</Typography></Grid>

              <Grid item xs={4}><Typography variant="h5">Address</Typography></Grid>
              <Grid item><Divider className={classes.verticalDivider}/></Grid>
              <Grid item xs={6}><Typography variant="body1">{user.address}</Typography></Grid>

              <Grid item xs={12}><Typography variant="h4" color="primary" align="left">Change Password</Typography></Grid>
              <Grid item xs={8}>
                <Input
                  type="text"
                  name="newPassword"
                  value={this.state.newPassword}
                  inputType="input"
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  placeholder="New password"
                  label="Type in the new password"
                  errorMessage="Please fill in this field with at least 8 characters"
                  id="password"
                  required={true}
                  error={this.state.errorNewPassword}/>
                <Button onClick={this.changePassword} variant="contained" size="medium" color="primary" style={{marginLeft:10}}>Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state =>({
  user:state.auth.user
})

const mapDispatchToProps = dispatch=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile))
