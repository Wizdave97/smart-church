import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { CSSTransitionGroup } from 'react-transition-group';
class AddBranch extends Component {
  state={
    states:null,
    lgs:null,
    state_index:null,
    branchName:'',
    branchPastor:'',
    established:'',
    state:'',
    lga:'',
    province:'',
    area:'',
    address:'',
    email:'',
    errorBranchName:false,
    errorBranchPastor:false,
    errorEstablished:false,
    errorState:false,
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
  componentDidUpdate(prevProps,prevState){
    if(prevState.state!=this.state.state){
      let index=this.state.states.indexOf(this.state.state)
      this.setState(state=>({
        state_index:index>=0?index:null,
        lga:''
      }))
    }
  }

  handleChange= input => e=>{
    this.setState({[input]:e.target.value})
  }
  render(){
    const { lga, state, state_index,errorLga,errorArea,errorEmail,
           errorState,errorAddress,errorProvince,errorBranchName,errorBranchPastor,errorEstablished}=this.state
    const { classes }=this.props
    let states_list=null
    let lg_list=null
    if(this.state.states){
      states_list=this.state.states
    }
    if(state_index!=null){
      lg_list=this.state.lgs[state_index].map((lga,index)=>{
        return lga.name
      })
    }
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
                            <Typography variant="h2" color="secondary"  gutterBottom>Add Branch</Typography>
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
                                      type={"text"}
                                      id={"branch-name"}
                                      label="Branch Name"
                                      placeholder="Branch Name"
                                      name={"branchName"}
                                      handleChange={this.handleChange}
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      required={true}
                                      error={errorEmail}
                                      type={"email"}
                                      label="Branch Email"
                                      placeholder="Branch Email"
                                      handleChange={this.handleChange}
                                      />
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                    error={errorBranchPastor}
                                    handleChange={this.handleChange}
                                    label="Branch Pastor"
                                    placeholder="Branch Pastor"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                      required
                                      inputType="input"
                                      error={errorEstablished}
                                      type={"date"}
                                      handleChange={this.handleChange}
                                      label="Establishment date"
                                      helperText="fill in the date this branch was established"
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
                                    inputType={'select'}
                                    label="State"
                                    name="state"
                                    required={true}
                                    error={errorState}
                                    value={state}
                                    options={states_list}
                                    handleChange={this.handleChange}
                                    helperText="Please select the desired state"/>
                                </div>
                                <div className={classes.entry}>
                                  <Input
                                        id="lga-helper"
                                        inputType={'select'}
                                        label="LGA"
                                        name="lga"
                                        required={true}
                                        error={errorLga}
                                        value={lga}
                                        options={lg_list}
                                        handleChange={this.handleChange}
                                        helperText="Please select Local Government"
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
                                <div className={classes.entry}>
                                    <Input
                                      inputType="input"
                                      placeholder="Province"
                                    error={errorProvince}
                                    handleChange={this.handleChange}
                                    label="Province"/>
                                </div>
                                <div className={classes.entry}>
                                    <Input
                                    inputType="input"
                                    error={errorArea}
                                    placeholder="Area"
                                    handleChange={this.handleChange}
                                    label="Area"/>
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

export default withStyles(styles)(AddBranch);
