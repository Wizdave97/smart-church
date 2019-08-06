import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes  from '../../store/actions/actionTypes';
import { reportAsync, reportSync }  from '../../store/actions/reportActions';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';

class NewReport extends Component {
  state={
    serviceDate:'',
    serviceDay:true,
    serviceNumber:'',
    maleAttendance:'',
    femaleAttendance:'',
    childAttendance:'',
    topic:'',
    speaker:'',
    salvation:'',
    firstTimers:'',
    notes:'',
    errorServiceDate:false,
    errorServiceDay:false,
    errorMaleAttendance:false,
    errorFemaleAttendance:false,
    errorChildAttendance:false,
    errorTopic:false,
    errorNotes:false,
    errorSpeaker:false,
    errorSalvation:false,
    errorServiceNumber:false,
    errorFirstTimers:false,
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
      let data=formSerialize(form,{hash:true})
      data.branchid=this.props.branchId
      this.props.onSubmitHandler(data)

    }
  }
  render(){
    const { errorServiceDay,errorServiceDate,errorMaleAttendance,
            errorFemaleAttendance,errorChildAttendance,errorFirstTimers,errorSalvation,}=this.state
    const references=[this.serviceDate,this.serviceDay,this.maleAttendance,this.childAttendance,this.firstTimers,this.salvation]
    const { classes }=this.props
    let notification=null;
    if (this.props.postReportSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.postReportSuccess} message={"Upload was successful"}/>
    }
    if (this.props.postReportFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.postReportFail} message={"There was an error please try again"}/>
    }
    let view=(
      <Paper square={true} elevation={4} className={classes.paper}>
          <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
              <div className={classes.title} color="secondary">
                  <Typography variant="h2" color="secondary"  gutterBottom>New Report</Typography>
              </div>
              <Divider className={classes.divider}/>
              <div className={classes.general}>
                  <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>General Report Information</Typography></div>
                  <div className={classes.entries}>
                      <div className={classes.entry}>
                          <Input
                          id="service-day"
                          reference={this.setRef}
                          inputType="checkbox"
                          error={errorServiceDay}
                          placeholder="Service Day"
                          name="serviceDay"
                          type="checkbox"
                          value={this.state.serviceDay}
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Service Day"/>
                      </div>
                      {/*<div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            reference={this.setRef}
                            id="service-number"
                            error={errorServiceNumber}
                            type="text"
                            label="Service Number"
                            errorMessage="Please this filled is required"
                            min="0"
                            value={this.state.serviceNumber}
                            name="serviceNumber"
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>*/}
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            type="date"
                            required={true}
                            reference={this.setRef}
                          error={errorServiceDate}
                          id="date"
                          name="serviceDate"
                          errorMessage="Please this filled is required"
                          value={this.state.serviceDate}
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Service Date"
                          placeholder="Service Date"/>
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            reference={this.setRef}
                            id="male-attendance"
                            name="maleAttendance"
                            errorMessage="Please this filled is required"
                            value={this.state.maleAttendance}
                            error={errorMaleAttendance}
                            type={"number"}
                            label="Male Attendance"
                            min="0"
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            reference={this.setRef}
                            id="female-attendance"
                            error={errorFemaleAttendance}
                            errorMessage="Please this filled is required"
                            type={"number"}
                            name="femaleAttendance"
                            label="Female Attendance"
                            value={this.state.femaleAttendance}
                            min="0"
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            id="children-attendance"
                            reference={this.setRef}
                            error={errorChildAttendance}
                            errorMessage="Please this filled is required"
                            type={"number"}
                            name="childAttendance"
                            label="Children Attendance"
                            min="0"
                            value={this.state.childAttendance}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            reference={this.setRef}
                            id="fist-timers"
                            error={errorFirstTimers}
                            errorMessage="Please this filled is required"
                            type={"number"}
                            name="firstTimers"
                            label="First Timers"
                            min="0"
                            value={this.state.firstTimers}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>
                      <div className={classes.entry}>
                          <Input
                            inputType="input"
                            required={true}
                            reference={this.setRef}
                            id="salvation"
                            error={errorSalvation}
                            type={"number"}
                            errorMessage="Please this filled is required"
                            name="salvation"
                            label="Salvation"
                            min="0"
                            value={this.state.salvation}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                      </div>
                  </div>
              </div>
              <Divider className={classes.divider}/>

              {/*<div className={classes.general}>
                  <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Sermon Details</Typography></div>
                  <div className={classes.entries}>
                    <div className={classes.entry}>
                    <Input
                          id="speaker"
                          inputType='input'
                          reference={this.setRef}
                          label="Speaker"
                          type="text"
                          name="speaker"
                          errorMessage="Please this filled is required"
                          required={true}
                          error={errorSpeaker}
                          value={this.state.speaker}
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          />
                      </div>
                      <div className={classes.entry}>
                      <Input
                            id="topic"
                            inputType='input'
                            reference={this.setRef}
                            label="Topic"
                            type="text"
                            name="topic"
                            errorMessage="Please this filled is required"
                            required={true}
                            error={errorTopic}
                            value={this.state.topic}
                            handleChange={(event)=>handleChange(event,this.hardSetState)}
                            />
                        </div>
                        <div className={classes.entry}>
                        <Input
                              id="notes"
                              inputType='textarea'
                              reference={this.setRef}
                              label="Sermon Notes"
                              name="notes"
                              errorMessage="Please this filled is required"
                              type="text"
                              required={true}
                              error={errorNotes}
                              value={this.state.notes}
                              handleChange={(event)=>handleChange(event,this.hardSetState)}
                              />
                        </div>
                  </div>
              </div>*/}
              <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
          </form>
      </Paper>
    )
    if(this.props.postReportStart) {
      view=<Spinner/>
    }
    return(
      <React.Fragment>
      {notification}
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
                {view}
            </Grid>
          </Grid>
      </Grid>
    </React.Fragment>
    )
  }
}
const mapStateToProps= state=>({
  postReportStart:state.report.postReportStart,
  postReportFail:state.report.postReportFail,
  postReportSuccess:state.report.postReportSuccess,
  branchId:state.auth.branchId
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(reportData)=> dispatch(reportAsync(reportData)),
  onUnmount:()=> dispatch(reportSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewReport));
