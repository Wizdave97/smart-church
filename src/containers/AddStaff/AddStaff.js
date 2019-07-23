import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { CSSTransitionGroup } from 'react-transition-group';
class AddStaff extends Component {
  state={
    firstName:'',
    lastName:'',
    sex:'',
    province:'',
    area:'',
    address:'',
    email:'',
    errorFirstName:false,
    errorLastName:false,
    errorEmail:false,
    errorProvince:false,
    errorTelephone:false,
    errorSex:false,
    errorArea:false,
    errorType:false,
    errorAddress:false
  }
  componentDidMount(){

  }
  componentDidUpdate(prevProps,prevState){

  }

  handleChange= input => e=>{
    this.setState({[input]:e.target.value})
  }
  render(){
    const { errorTelephone,errorType,errorArea,errorEmail,errorAddress,errorProvince,errorFirstName,errorLastName,errorSex}=this.state
    const { classes }=this.props
    return(
      <Grid
      item
      xs={12}
      md={12}>
          <Grid
          container
          spacing={0}
          justify="center">
            <Grid
            item
            xs={12}
            sm={8}>
                <Paper square={true} elevation={4} className={classes.paper}>
                    <form className={classes.form} noValidate={true}>
                        <div className={classes.title} color="secondary">
                            <Typography variant="h2" color="secondary"  gutterBottom>Add Staff</Typography>
                        </div>
                        <Divider className={classes.divider}/>
                        <div className={classes.general}>
                            <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>General Information</Typography></div>
                            <div className={classes.entries}>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      error={errorFirstName}
                                      type={"text"}
                                      id={"first-name"}
                                      label="First Name"
                                      placeholder="First Name"
                                      name={"fname"}
                                      handleChange={this.handleChange}
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                    error={errorLastName}
                                    handleChange={this.handleChange}
                                    label="Last Name"
                                    placeholder="Last Name"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      error={errorEmail}
                                      type={"email"}
                                      label="Email"
                                      placeholder="Email"
                                      handleChange={this.handleChange}
                                      />
                                </div>

                                <div className={classes.entry}>
                                    <Input
                                      required
                                      inputType="input"
                                      error={errorTelephone}
                                      type={"tel"}
                                      handleChange={this.handleChange}
                                      label="Telephone Number"
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType='radio'
                                      required={true}
                                      name="sex"
                                      
                                      error={errorSex}
                                      handleChange={this.handleChange}
                                      label="Male"
                                      />
                                      <Input
                                        inputType='radio'
                                        required={true}

                                        name="sex"
                                        error={errorSex}
                                        handleChange={this.handleChange}
                                        label="Female"
                                        />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                    required={true}
                                    error={errorAddress}
                                    placeholder="Address"
                                    handleChange={this.handleChange}
                                    label="Address"/>
                                </div>
                            </div>
                        </div>
                        <Divider className={classes.divider}/>
                        <div className={classes.general}>
                            <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Branch Details</Typography></div>
                            <div className={classes.entries}>
                              <div className={classes.entry}>
                              <Input
                                    id="type"
                                    inputType={'select'}
                                    label="Staff Type"
                                    name="stafftype"
                                    required={true}
                                    error={errorType}
                                    options={['Pastor','Assistant']}
                                    handleChange={this.handleChange}
                                    helperText="Choose the staff category"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="checkbox"
                                      placeholder="Province Head?"
                                    error={errorProvince}
                                    value=""
                                    handleChange={this.handleChange}
                                    label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                    inputType="checkbox"
                                    error={errorArea}
                                    placeholder="Area Head?"
                                    value=""
                                    handleChange={this.handleChange}
                                    label="Area Head"/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
                    </form>
                </Paper>
            </Grid>
          </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AddStaff);
