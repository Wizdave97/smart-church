import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { Line } from "react-chartjs-2";
import Chart from 'react-google-charts';
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import { Paper, Grid, Typography, Button, LinearProgress} from '@material-ui/core'

const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
const categories=['children','female','male','total'];
class AttendanceAnalytics extends Component {
  state={
    title:null,
    labels:null,
    dataset:null,
    day:'',
    month:months[new Date().getMonth()],
    category:'total',
    type:'Income',
    year:new Date().getFullYear(),
    errorType:false,
    errorCategory:false,
    fixValidityBug:'',

  }

  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidMount(){
    this.setState({fixValidityBug:''})
    this.props.onFetchReport(this.props.branchId,null,null,this.state.month,this.state.year)

  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      this.props.onFetchReport(this.props.branchId,this.props.first,this.state.day,this.state.month,this.state.year)
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchReport(this.props.branchId,url,this.state.day,this.state.month,this.state.year)
  }
  structureData= (raw) =>{
    let labels=[];
    let data=[];
    let title=null
    switch(this.state.category){
      case 'total':
          title="Total Attendance"
          for (let obj of raw){
            labels.push(obj.date)
            data.push(obj.totalAttendance)
          }
          break;
      case 'children':
          title="Children Attendance"
          for (let obj of raw){
            labels.push(obj.date)
            data.push(obj.childrenAttendance)
          }
          break;
      case 'female':
          title="Female Attendance"
          for (let obj of raw){
            labels.push(obj.date)
            data.push(obj.femaleAttendance)
          }
          break;
      case 'male':
          title="Male Attendance"
          for (let obj of raw){
            labels.push(obj.date)
            data.push(obj.maleAttendance)
          }
          break;
      default: break

    }

    this.setState({
      title:title,
      dataset:data,
      labels:labels
    })
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.fetchReportSuccess && this.props.reports!==null){
      if(this.props.reports.length!==0){
        this.structureData(this.props.reports)
      }

      this.props.onUnmount()
    }
    if(this.props.reports){
      if(this.props.reports.length!==0){
        if(prevState.category!==this.state.category){
          this.structureData(this.props.reports)
        }
      }
    }
  }
  render(){
    const { classes }= this.props
    const references=[this.day]
    let attendance=[['Date','Male Attendance','Female Attendance','Children Attendance']]

    let attendanceChart=<LinearProgress  color="primary"/>
    let attendanceBarChart=<LinearProgress  color="primary"/>

    if( this.props.reports){
      for(let obj of this.props.reports){
        let temp=[];
        temp.push(obj.date)
        temp.push(obj.maleAttendance)
        temp.push(obj.femaleAttendance)
        temp.push(obj.childrenAttendance)
        attendance.push(temp)
      }
      attendanceChart=( <Line data={{
    labels:this.state.labels,
    datasets: [
      {
        label: this.state.title,
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,240)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: this.state.dataset
      },
    ]
  }} options={{ responsive: true }} />

      )
      attendanceBarChart=( <Chart
                          width={'100%'}
                          height={340}
                          chartType="Bar"
                          loader={<div>Loading Chart</div>}
                          data={attendance}
                          options={{

                            backgroundColor:'inherit',
                            chart: {
                               title: 'Attendance Chart',
                            },
                            hAxis: {
                               title: 'Attendance Metrics',
                               minValue: 0,
                             },
                             vAxis: {
                               title: 'Date',
                             },
                             bars: 'vertical',
                             axes: {
                               y: {
                                 0: { side: 'right' },
                               },
                          }}}
                          legendToggle
                          />

      )
    }
    if(this.props.fetchReportFail){
      attendanceChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchReport(this.props.branchId)} size="small" color="secondary">Retry</Button></Typography>
      attendanceBarChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchReport(this.props.branchId)} size="small" color="secondary">Retry</Button></Typography>
    }
    if(this.props.fetchReportStart) {
      attendanceChart=<LinearProgress  color="primary"/>
      attendanceBarChart=<LinearProgress  color="primary"/>
    }
    if(this.props.reports){
      if(this.props.reports.length==0){
        attendanceChart=<Typography variant="body1" >You have no records based on the selected filters, please select new filters and try again</Typography>
        attendanceBarChart=<Typography variant="body1" >You have no records based on the selected filters, please select new filters and try again</Typography>
      }
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
          xs={12}>
            <Paper square={true}>
              <div className={classes.filters}>
                <Typography variant='h2' align="center" gutterBottom color="secondary">Church Attendance Analytics</Typography>
              </div>
              <div className={classes.filters}>
                <Typography variant='h4'>You are currently analysing reports for {this.state.day} <strong>{this.state.month}</strong> <strong>{this.state.year}</strong></Typography>
              </div>
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
                 required={false}
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
                <div className={classes.entry}>
                <Input
                  inputType="select"
                  required={false}
                  options={categories}
                  name="category"
                  value={this.state.category}
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  label="Select Demography"
                /></div>
                  <div className={classes.chart}>
                    {attendanceChart}
                  </div>
                  <div className={classes.chartNav}>
                    <Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button>
                    <Typography variant="body1" align="center">Page {this.props.current_page} of {this.props.total}</Typography>
                    <Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button>
                  </div>
              </div>
              <div className={classes.tableWrapper}>
                  <div className={classes.chart}>
                    {attendanceBarChart}
                  </div>
                  <div className={classes.chartNav}>
                    <Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button>
                    <Typography variant="body1" align="center">Page {this.props.current_page} of {this.props.total}</Typography>
                    <Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button>
                  </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(AttendanceAnalytics)
