import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { handleChange,submitHandler} from '../../utils/Utility';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux';
import { branchAsync, branchSync,updateBranchAsync }  from '../../store/actions/branchActions';
import * as actionTypes  from '../../store/actions/actionTypes';
import Spinner from '../../components/UI/Spinner/Spinner';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
const emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
class AddBranch extends Component {
  state={
    states:[],
    lgs:[],
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
    fetch('../assets/states.json').then(resp=>resp.json()).then(data=>{
      const states=[]
      const lgs=[]
      for(let obj of data.data){
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

    if(Number(this.props.match.params.id)>=0 && this.props.branches){
      for(let obj of this.props.branches ){
        if(obj.id==Number(this.props.match.params.id)){
          this.setState({
            branchName:obj.name,
            branchState:obj.state,
            address:obj.street,
            lga:obj.lga
          })
        }
      }
    }
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
      branchData.lga=data.lga
      if(Number(this.props.match.params.id)>=0){
        branchData.id=Number(this.props.match.params.id)
        this.props.onUpdateReport(branchData)
      }
      else {
        this.props.onSubmitHandler(branchData)
      }
    }
  }

  render(){
    const references=[this.branchName,this.lga,this.address,this.email]
    const { lga, branchState, state_index,errorLga,errorEmail,
           errorBranchState,errorAddress,errorBranchName}=this.state
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
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.postBranchSuccess} message={Number(this.props.match.params.id)>=0?'Update success':"Upload successful"}/>
    }
    if (this.props.postBranchFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.postBranchFail} message={"There was an error please try again"}/>
    }
    let view=(
    <Grid
    item
    xs={12}
    sm={8}
    md={6}
    lg={5}>
        <Paper square={true} elevation={4} className={classes.paper}>
            <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
                <div className={classes.title} color="secondary">
                    <Typography variant="h2" color="secondary"  gutterBottom>{Number(this.props.match.params.id)>=0?'Update Branch':'Register a New Branch'}</Typography>
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
  postBranchSuccess:state.branch.postBranchSuccess,
  branches:state.branch.branches,
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(branchData)=> dispatch(branchAsync(branchData)),
  onUnmount:()=> dispatch(branchSync(actionTypes.RESET)),
  onUpdateReport:(branchData)=> dispatch(updateBranchAsync(branchData))
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddBranch));
