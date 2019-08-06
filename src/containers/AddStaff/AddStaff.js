import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import baseUrl from '../../store/base_url';
import { handleChange,submitHandler} from '../../utils/Utility';
import { staffAsync, staffSync }  from '../../store/actions/staffActions';
import * as actionTypes  from '../../store/actions/actionTypes';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import formSerialize from 'form-serialize';
import Spinner from '../../components/UI/Spinner/Spinner';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
class AddStaff extends Component {
  state={
    firstName:'',
    lastName:'',
    sex:'',
    address:'',
    email:'',
    staffType:'',
    branch:'',
    updateChurch:false,
    updateBranch:false,
    updateStaff:false,
    updateReport:false,
    createStaff:false,
    createBranch:false,
    viewStaffs:false,
    viewReports:false,
    viewBranches:false,
    addReport:false,
    errorFirstName:false,
    errorLastName:false,
    errorEmail:false,
    errorSex:false,
    errorStaffType:false,
    errorAddress:false,
    errorBranch:false,
    fixValidityBug:null,
    branches:null,
    branchIds:null,
    types:null,
    typeIds:null,
  }

  componentDidMount(){
    this.setState({fixValidityBug:''})
    fetch(baseUrl+'/branches',{
      headers:{
        'Content-Type':"application/json",
        'Authorization':"Bearer"+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      let branchNames=[],branchIds=[]
      for (let obj of res.data){
        branchNames.push(obj.name)
        branchIds.push(obj.id)
      }
      this.setState({branches:branchNames,branchIds:branchIds})
    }).catch(err=>console.log(err))
    fetch(baseUrl+'/types',{
      headers:{
        'Content-Type':"application/json",
        'Authorization':"Bearer"+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      let types=[],typeIds=[]
      for (let obj of res.data){
        types.push(obj.name)
        typeIds.push(obj.id)
      }
      this.setState({types:types,typeIds:typeIds})
    }).catch(err=>console.log(err))
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
      let staffData=formSerialize(form,{hash:true})
      let permissions=[];
      if(this.state.updateChurch) permissions.push(1)
      if(this.state.updateBranch) permissions.push(2)
      if(this.state.updateStaff) permissions.push(3)
      if(this.state.updateReport) permissions.push(4)
      if(this.state.createStaff) permissions.push(5)
      if(this.state.createBranch) permissions.push(6)
      if(this.state.viewStaffs) permissions.push(7)
      if(this.state.viewBranches) permissions.push(8)
      if(this.state.viewReports) permissions.push(9)
      if(this.state.addReport) permissions.push(10)
      let data={firstname:staffData.firstName,lastname:staffData.lastName,email:staffData.email,sex:staffData.sex,permissions:permissions}
      let branchIndex=this.state.branches.indexOf(this.state.branch)
      let branchId=this.state.branchIds[branchIndex]
      let typeIndex=this.state.types.indexOf(this.state.staffType)
      let type=this.state.typeIds[typeIndex]
      data.branchid=branchId
      data.type=type
      this.props.onSubmitHandler(data)
      console.log(data)
    }
  }
  render(){
    const { errorStaffType,errorEmail,errorAddress,errorFirstName,errorLastName,errorSex,errorBranch}=this.state
    const references=[this.firstName,this.lastName,this.sex,this.address,this.email,this.staffType]
    const { classes }=this.props
    let view=(  <Paper square={true} elevation={4} className={classes.paper}>
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
                      </div>
                      <div className={classes.entries}>
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
                          options={this.state.types}
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          helperText="Choose the staff category"/>
                      </div>
                      <div className={classes.entry}>
                      <Input
                            id="staff-type"
                            inputType={'select'}
                            label="Branch"
                            reference={this.setRef}
                            name="branch"
                            required={true}
                            type="text"
                            error={errorBranch}
                            errorMessage="Please this filled is required"
                            value={this.state.branch}
                            options={this.state.branches}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            helperText="Choose the staff category"/>
                        </div>
                  </div>
              </div>
              <div className={classes.general}>
                  <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Staff Permissions</Typography></div>
                  <div className={classes.entries}>
                      <div className={classes.entry}>
                          <Input

                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder="Update church"
                            error={null}
                            id="update-church"
                            name="updateChurch"
                            type="checkbox"
                            value={this.state.updateChurch}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Update Church?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input

                          inputType="checkbox"
                          reference={this.setRef}
                          name="createBranch"
                          value={this.state.createBranch}
                          placeholder="Create Branch?"
                          id="create-branch"
                          type="checkbox"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Create Branch?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""
                            id="update-branch"
                            name="updateBranch"
                            type="checkbox"
                            value={this.state.updateBranch}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Update Branch?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""
                            id="create-staff"
                            name="createStaff"
                            type="checkbox"
                            value={this.state.createStaff}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Create staff?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input

                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""

                            id="update-staff"
                            name="updateStaff"
                            type="checkbox"
                            value={this.state.updateStaff}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Update Staff?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""
                            id="add-report"
                            name="addReport"
                            type="checkbox"
                            value={this.state.addReport}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Add Report?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""

                            id="update-report"
                            name="updateReport"
                            type="checkbox"
                            value={this.state.updateReport}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Update Report?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input

                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""

                            id="view-reports"
                            name="viewReports"
                            type="checkbox"
                            value={this.state.viewReports}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="View All reports?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input

                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""

                            id="view-branches"
                            name="viewBranches"
                            type="checkbox"
                            value={this.state.viewBranches}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="View All Branches?"/>
                      </div>
                      <div className={classes.entry}>
                          <Input

                            inputType="checkbox"
                            reference={this.setRef}
                            placeholder=""

                            id="view-staff"
                            name="viewStaffs"
                            type="checkbox"
                            value={this.state.viewStaffs}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="View All Staffs?"/>
                      </div>
                  </div>
              </div>
              <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
          </form>
      </Paper>

    )
    let notification=null;
    if (this.props.postStaffSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.postStaffSuccess} message={"Upload was successful"}/>
    }
    if (this.props.postStaffFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.postStaffFail} message={"There was an error please try again"}/>
    }
    if(this.props.postStaffStart) {
      view=<Spinner/>
    }
    return(
      <Grid
      item
      xs={12}
      md={12}>
      {notification}
          <Grid
          container
          spacing={0}
          justify="center">
            <Grid
            item
            xs={12}
            sm={8}>
              {view}
            </Grid>
          </Grid>
      </Grid>
    )
  }
}

const mapStateToProps= state=>({
  token:state.auth.token,
  postStaffStart:state.staff.postStaffStart,
  postStaffFail:state.staff.postStaffFail,
  postStaffSuccess:state.staff.postStaffSuccess
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(staffData)=> dispatch(staffAsync(staffData)),
  onUnmount:()=> dispatch(staffSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddStaff));
