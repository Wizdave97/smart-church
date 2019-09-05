import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes  from '../../store/actions/actionTypes';
import { reportSync, fetchReportAsync } from '../../store/actions/reportActions';
import { Delete, Edit } from '@material-ui/icons';
import { handleChange,submitHandler} from '../../utils/Utility';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography, Button, Table, TableCell, TableRow, TableBody, TableHead,LinearProgress} from '@material-ui/core'

const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class Reports extends Component {
  state={
    month:'',
    day:'',
    year:'',
    errorMonth:false,
    errorDay:false,
    fixValidityBug:''
  }

  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidMount(){
    this.setState({fixValidityBug:''})
    this.props.onFetchReport(this.props.branchId)

  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      this.props.onFetchReport(this.props.branchId,this.props.first,this.state.day,this.state.month?this.state.month:null,this.state.year?this.state.year:null)
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchReport(this.props.branchId,url,this.state.day?this.state.day:'sunday',this.state.month?this.state.month:null,this.state.year?this.state.year:null)
  }
  render(){
    const { classes }= this.props
    const references=[this.day]
    let notification=null;
    if (this.props.fetchReportSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.fetchReportSuccess} message={"Reports fetched successfully"}/>
    }
    if (this.props.fetchReportFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.fetchReportFail} message={"There was an error fetching click the filter button to try again"}/>
    }
    let view=null,progress=null
    if(this.props.fetchReportStart){
      progress=<LinearProgress color="secondary" />
    }
    if(this.props.fetchReportSuccess|| this.props.reports){
      view=(
        this.props.reports.map((data,index)=>{
          return(
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell><Button variant="contained" component={Link} to={`/newreport/${data.id}`} size="small" aria-label="edit"><Edit color="secondary"/></Button></TableCell>
              <TableCell><Button variant="contained" size="small" aria-label="delete"><Delete color="error"/></Button></TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.serviceDay}</TableCell>
              <TableCell>{data.maleAttendance}</TableCell>
              <TableCell>{data.femaleAttendance}</TableCell>
              <TableCell>{data.childrenAttendance}</TableCell>
              <TableCell>{data.totalAttendance}</TableCell>
              <TableCell>{data.firstTimers}</TableCell>
              <TableCell>{data.salvation}</TableCell>
            </TableRow>
          )
        })
      )
    }
    if(this.props.fetchReportFail){
      view=null
    }

    return(
      <Grid
      item
      xs={12}
      md={12}>
      {progress}
      {notification}
        <Grid
        container
        spacing={0}
        justify="center">
          <Grid
          item
          xs={12}>
            <Paper square={true}>
              <form className={classes.filters} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)} >
                <div className={classes.entry}>
                <Input
                  inputType="select"
                  required={false}
                  options={months}
                  name="month"
                  value={this.state.month}
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  label="Select Month"
                /></div>
                <div className={classes.entry}>
                <Input
                  inputType="input"
                  required={false}
                  name="year"
                  value={this.state.year}
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  label="Type in the year"
                  placeholder="e.g 2019"
                /></div>
                <div className={classes.entry}>
                <Input
                 inputType="select"
                 required={true}
                 name="day"
                 value={this.state.day}
                 reference={this.setRef}
                 options={days}
                 error={this.state.errorDay}
                 errorMessage="Please this filled is required"
                 handleChange={(event)=>handleChange(event,this.hardSetState)}
                 label="Select Day"
                /></div>
              <div className={classes.entry}><Button className={classes.button} type="submit" size="medium" color="secondary" variant="outlined">Apply Filters</Button></div>
              </form>
              <div className={classes.tableWrapper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Day</TableCell>
                    <TableCell>Male Attendance</TableCell>
                    <TableCell>Female Attendance</TableCell>
                    <TableCell>Children Attendance</TableCell>
                    <TableCell>Sum Total</TableCell>
                    <TableCell>First Timers</TableCell>
                    <TableCell>Newly Saved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {view}
                  <TableRow>
                    <TableCell><Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button></TableCell>
                    <TableCell><Typography variant="body1" align="center">Page {this.props.current_page} of {this.props.total}</Typography></TableCell>
                    <TableCell><Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state=>({
  branchId:state.auth.branchId,
  fetchReportStart:state.report.fetchReportStart,
  fetchReportSuccess:state.report.fetchReportSuccess,
  fetchReportFail:state.report.fetchReportFail,
  total:state.report.total,
  reports:state.report.reports,
  first:state.report.first,
  current_page:state.report.current_page,
  next:state.report.next,
  prev:state.report.prev
})
const mapDispatchToProps = dispatch =>({
  onFetchReport:(branchId,url=null,day='sunday',month=null,year='2019')=> dispatch(fetchReportAsync(branchId,url,day,month,year)),
  onUnmount:()=> dispatch(reportSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Reports))
