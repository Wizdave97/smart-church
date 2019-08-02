import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import formSerialize from 'form-serialize';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
class AddStaff extends Component {
  state={
    firstName:'',
    lastName:'',
    sex:'',
    address:'',
    email:'',
    telephone:'',
    staffType:'',
    areaHead:'',
    provinceHead:'',
    errorFirstName:false,
    errorLastName:false,
    errorEmail:false,
    errorTelephone:false,
    errorSex:false,
    errorStaffType:false,
    errorAreaHead:false,
    errorProvinceHead:false,
    errorAddress:false,
    fixValidityBug:null
  }

  componentDidMount(){
    this.setState({fixValidityBug:''})
  }
  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidUpdate(prevProps,prevState){

  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let authData=formSerialize(form,{hash:true})
      console.log(authData)
    }
  }
  render(){
    const { errorTelephone,errorStaffType,errorAreaHead,errorEmail,errorAddress,errorProvinceHead,errorFirstName,errorLastName,errorSex}=this.state
    const references=[this.firstName,this.lastName,this.sex,this.address,this.email,this.telephone,this.staffType,this.areaHead,this.provinceHead]
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
                    <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
                        <div className={classes.title} color="secondary">
                            <Typography variant="h2" color="secondary"  gutterBottom>Register a New Staff</Typography>
                        </div>
                        <Divider className={classes.divider}/>
                        <div className={classes.general}>
                            <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>General Information</Typography></div>
                            <div className={classes.entries}>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      reference={this.setRef}
                                      error={errorFirstName}
                                      type="text"
                                      id="first-name"
                                      label="First Name"
                                      value={this.state.firstName}
                                      placeholder="First Name"
                                      errorMessage="Please this filled is required"
                                      name="firstName"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      reference={this.setRef}
                                      type="text"
                                      id="last-name"
                                      name="lastName"
                                    error={errorLastName}
                                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                                    label="Last Name"
                                    errorMessage="Please this filled is required"
                                    value={this.state.lastName}
                                    placeholder="Last Name"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      reference={this.setRef}
                                      error={errorEmail}
                                      name="email"
                                      type="email"
                                      label="Email"
                                      pattern={emailPattern}
                                      errorMessage="Please enter a valid email"
                                      value={this.state.email}
                                      id="email"
                                      placeholder="Email"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      />
                                </div>

                                <div className={classes.entry}>
                                    <Input
                                      required={true}
                                      inputType="input"
                                      reference={this.setRef}
                                      name="telephone"
                                      id="telephone"
                                      placeholder="Telephone No"
                                      error={errorTelephone}
                                      type="tel"
                                      errorMessage="Please this filled is required"
                                      value={this.state.telephone}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Telephone Number"
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType='radio'
                                      required={true}
                                      reference={this.setRef}
                                      name="sex"
                                      id="male"
                                      type="radio"
                                      errorMessage="Please this filled is required"
                                      error={errorSex}
                                      value="male"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Male"
                                      />
                                      <Input
                                        inputType='radio'
                                        required={true}
                                        reference={this.setRef}
                                        value="female"
                                        name="sex"
                                        id="female"
                                        errorMessage="Please this filled is required"
                                        type="radio"
                                        error={errorSex}
                                        handleChange={(event)=>handleChange(event,this.hardSetState)}
                                        label="Female"
                                        />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      reference={this.setRef}
                                      name="address"
                                      type="text"
                                      id="address"
                                      value={this.state.address}
                                      error={errorAddress}
                                      placeholder="Address"
                                      errorMessage="Please this filled is required"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Address"/>
                                </div>
                            </div>
                        </div>
                        <Divider className={classes.divider}/>
                        <div className={classes.general}>
                            <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Staff Details</Typography></div>
                            <div className={classes.entries}>
                              <div className={classes.entry}>
                              <Input
                                    id="staff-type"
                                    inputType={'select'}
                                    label="Staff Type"
                                    reference={this.setRef}
                                    name="staffType"
                                    required={true}
                                    type="text"
                                    error={errorStaffType}
                                    errorMessage="Please this filled is required"
                                    value={this.state.staffType}
                                    options={['Pastor','Assistant']}
                                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                                    helperText="Choose the staff category"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head ?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                    required={false}
                                    inputType="checkbox"
                                    reference={this.setRef}
                                    name="areaHead"
                                    value={this.state.areaHead}
                                    error={errorAreaHead}
                                    placeholder="Area Head?"
                                    id="area-head"
                                    type="checkbox"
                                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                                    label="Area Head ?"/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.general}>
                            <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Staff Permissions</Typography></div>
                            <div className={classes.entries}>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="All Branches"
                                      error={null}
                                      id="all-branches"
                                      name="allBranches"
                                      type="checkbox"
                                      value={this.state.allBranches}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="All Branches?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                    required={false}
                                    inputType="checkbox"
                                    reference={this.setRef}
                                    name="areaHead"
                                    value={this.state.areaHead}
                                    error={errorAreaHead}
                                    placeholder="Area Head?"
                                    id="area-head"
                                    type="checkbox"
                                    handleChange={(event)=>handleChange(event,this.hardSetState)}
                                    label="Area Head"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required={false}
                                      inputType="checkbox"
                                      reference={this.setRef}
                                      placeholder="Province Head?"
                                      error={errorProvinceHead}
                                      id="province-head"
                                      name="provinceHead"
                                      type="checkbox"
                                      value={this.state.provinceHead}
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Province Head?"/>
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
