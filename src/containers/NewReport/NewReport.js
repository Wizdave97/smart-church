import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { handleChange,submitHandler} from '../../utils/Utility';
import formSerialize from 'form-serialize';
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes  from '../../store/actions/actionTypes';
import { reportAsync, reportSync, updateReportAsync }  from '../../store/actions/reportActions';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';

class NewReport extends Component {
  state={
    date:'',
    serviceDay:'',
    serviceNumber:'',
    maleAttendance:'',
    femaleAttendance:'',
    childrenAttendance:'',
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
    if(Number(this.props.match.params.id)>=0 && this.props.reports){
      for(let obj of this.props.reports ){
        if(obj.id==Number(this.props.match.params.id) && this.props.reports){
          this.setState({
            date:obj.date,
            serviceDay:obj.serviceDay,
            maleAttendance:obj.maleAttendance,
            femaleAttendance:obj.femaleAttendance,
            childrenAttendance:obj.childrenAttendance,
            salvation:obj.salvation,
            firstTimers:obj.firstTimers
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

  }

  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let data=formSerialize(form,{hash:true})
      data.branchid=this.props.branchId
      if(Number(this.props.match.params.id)>=0){
        data.id=Number(this.props.match.params.id)
        this.props.onUpdateReport(data)
      }
      else {
        this.props.onSubmitHandler(data)
      }


    }
  }
  render(){
    const { errorServiceDay,errorDate,errorMaleAttendance,
            errorFemaleAttendance,errorChildrenAttendance,errorFirstTimers,errorSalvation,}=this.state
    const references=[this.date,this.serviceDay,this.maleAttendance,this.childrenAttendance,this.firstTimers,this.salvation]
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
                          required={true}
                          reference={this.setRef}
                          inputType="input"
                          error={errorServiceDay}
                          placeholder="e.g monday"
                          name="serviceDay"
                          type="text"
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
                          error={errorDate}
                          id="date"
                          name="date"
                          errorMessage="Please this filled is required"
                          value={this.state.date}
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
                            error={errorChildrenAttendance}
                            errorMessage="Please this filled is required"
                            type={"number"}
                            name="childrenAttendance"
                            label="Children Attendance"
                            min="0"
                            value={this.state.childrenAttendance}
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
            sm={8}
            md={6}
            lg={5}>
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
  branchId:state.auth.branchId,
  reports:state.report.reports
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(reportData)=> dispatch(reportAsync(reportData)),
  onUnmount:()=> dispatch(reportSync(actionTypes.RESET)),
  onUpdateReport:(reportData)=> dispatch(updateReportAsync(reportData))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NewReport));
