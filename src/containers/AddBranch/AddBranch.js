import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { handleChange,submitHandler} from '../../utils/Utility';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux';
import { branchAsync, branchSync }  from '../../store/actions/branchActions';
import * as actionTypes  from '../../store/actions/actionTypes';
import Spinner from '../../components/UI/Spinner/Spinner';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
class AddBranch extends Component {
  state={
    states:null,
    lgs:null,
    state_index:null,
    branchName:'',
    branchPastor:'',
    established:'',
    branchState:'',
    lga:'',
    province:'',
    area:'',
    address:'',
    email:'',
    errorBranchName:false,
    errorBranchPastor:false,
    errorEstablished:false,
    errorBranchState:false,
    errorLga:false,
    errorProvince:false,
    errorArea:false,
    errorEmail:false,
    errorAddress:false
  }
  componentDidMount(){
    fetch('./assets/states.json').then(resp=>resp.json()).then(data=>{
      const states=[]
      const lgs=[]
      for(let obj of data){
        let name=obj.state.name
        let locals=obj.state.locals
        states.push(name)
        lgs.push(locals)
      }
      this.setState({
        states:states,
        lgs:lgs
      })
    }).catch(err=> console.log(err))
  }
  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidUpdate(prevProps,prevState){
    if(prevState.branchState!=this.state.branchState){
      let index=this.state.states.indexOf(this.state.branchState)
      this.setState({
        state_index:index>=0?index:null,
        lga:''
      })
    }
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let data=formSerialize(form,{hash:true})
      let branchData={}
      branchData.name=data.branchName
      branchData.state=data.branchState
      branchData.street=data.address
      console.log(branchData)
      this.props.onSubmitHandler(branchData)
    }
  }

  render(){
    const references=[this.branchName,this.lga,this.address,this.email]
    const { lga, branchState, state_index,errorLga,errorArea,errorEmail,
           errorBranchState,errorAddress,errorProvince,errorBranchName,errorBranchPastor,errorEstablished}=this.state
    const { classes }=this.props
    let states_list=null
    let lg_list=null
    if(this.state.states){
      states_list=[...this.state.states]
    }
    if(state_index!=null){
      lg_list=this.state.lgs[state_index].map((lga,index)=>{
        return lga.name
      })
    }
    let notification=null;
    if (this.props.postBranchSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.postBranchSuccess} message={"Upload was successful"}/>
    }
    if (this.props.postBranchFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.postBranchFail} message={"There was an error please try again"}/>
    }
    let view=(
    <Grid
    item
    xs={12}
    sm={8}>
        <Paper square={true} elevation={4} className={classes.paper}>
            <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
                <div className={classes.title} color="secondary">
                    <Typography variant="h2" color="secondary"  gutterBottom>Register a New Branch</Typography>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.general}>
                    <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>General Information</Typography></div>
                    <div className={classes.entries}>
                        <div className={classes.entry}>
                            <Input
                              inputType="input"
                              required={true}
                              error={errorBranchName}
                              reference={this.setRef}
                              type={"text"}
                              id={"branch-name"}
                              label="Branch Name"
                              placeholder="Branch Name"
                              name={"branchName"}
                              errorMessage="Please this filled is required"
                              value={this.state.branchName}
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              />
                        </div>
                        <div className={classes.entry}>
                            <Input
                              inputType="input"
                              required={true}
                              id="email"
                              name="email"
                              reference={this.setRef}
                              pattern={emailPattern}
                              value={this.state.email}
                              error={errorEmail}
                              type={"email"}
                              errorMessage="Please use a valid email"
                              label="Branch Email"
                              placeholder="Branch Email"
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              />
                        </div>
                        {/*<div className={classes.entry}>
                            <Input
                              inputType="input"
                              type="text"
                              required={true}
                              reference={this.setRef}
                              value={this.state.branchPastor}
                              name="branchPastor"
                              id="branch-pastor"
                              error={errorBranchPastor}
                              errorMessage="Please this filled is required"
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              label="Branch Pastor"
                              placeholder="Branch Pastor"/>
                        </div>
                        <div className={classes.entry}>
                            <Input
                              required={true}
                              inputType="input"
                              id="established-date"
                              reference={this.setRef}
                              error={errorEstablished}
                              value={this.state.established}
                              name="established"
                              type={"date"}
                              errorMessage="Please this filled is required"
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              label="Establishment date"
                              helperText="fill in the date this branch was established"
                              />
                        </div>*/}
                    </div>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.general}>
                    <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Location Details</Typography></div>
                    <div className={classes.entries}>
                      <div className={classes.entry}>
                      <Input
                            id="state-helper"
                            inputType='select'
                            type="text"
                            label="State"
                            reference={this.setRef}
                            name="branchState"
                            required={true}
                            error={errorBranchState}
                            value={branchState}
                            errorMessage="Please this filled is required"
                            options={states_list}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            helperText="Please select the desired state"/>
                        </div>
                        <div className={classes.entry}>
                          <Input
                                id="lga-helper"
                                inputType={'select'}
                                label="LGA"
                                name="lga"
                                reference={this.setRef}
                                required={true}
                                error={errorLga}
                                value={lga}
                                options={lg_list}
                                type="text"
                                errorMessage="Please this filled is required"
                                handleChange={(event)=>handleChange(event,this.hardSetState)}
                                helperText="Please select Local Government"
                              />
                        </div>
                        <div className={classes.entry}>
                            <Input
                              inputType="input"
                            required={true}
                            error={errorAddress}
                            value={this.state.address}
                            id="address"
                            reference={this.setRef}
                            name="address"
                            type="text"
                            errorMessage="Please this filled is required"
                            placeholder="Address"
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Address"/>
                        </div>
                        {/*<div className={classes.entry}>
                            <Input
                              inputType="input"
                              required={false}
                              name="province"
                              value={this.state.province}
                              id="province"
                              reference={this.setRef}
                              type="text"
                              errorMessage="Please this filled is required"
                              placeholder="Province"
                              error={errorProvince}
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              label="Province"/>
                        </div>
                        <div className={classes.entry}>
                            <Input
                            required={false}
                            id="area"
                            name="area"
                            value={this.state.area}
                            inputType="input"
                            reference={this.setRef}
                            error={errorArea}
                            placeholder="Area"
                            type="text"
                            errorMessage="Please this filled is required"
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            label="Area"/>
                        </div>*/}
                    </div>
                </div>
                <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
            </form>
        </Paper>
    </Grid>)
    if(this.props.postBranchStart) {
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
            {view}
          </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state=>({
  postBranchStart:state.branch.postBranchStart,
  postBranchFail:state.branch.postBranchFail,
  postBranchSuccess:state.branch.postBranchSuccess
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(branchData)=> dispatch(branchAsync(branchData)),
  onUnmount:()=> dispatch(branchSync(actionTypes.RESET))
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddBranch));
