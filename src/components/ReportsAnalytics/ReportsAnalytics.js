import React, { Component, Fragment } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import Chart from 'react-google-charts';
import { connect } from 'react-redux';
import { handleChange,submitHandler} from '../../utils/Utility';
import { Paper, Grid, Typography, Button, LinearProgress} from '@material-ui/core'

const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class ReportsAnalytics extends Component {
  state={
    month:months[new Date().getMonth()],
    day:'',
    year:new Date().getFullYear(),
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
  render(){
    const { classes }= this.props
    const references=[this.day]
    let progress=null;
    let attendance=[['Date','Male Attendance','Female Attendance','Children Attendance']]

    let attendanceChart=<LinearProgress  color="primary"/>

    if( this.props.reports){
      for(let obj of this.props.reports){
        let temp=[];
        temp.push(obj.date)
        temp.push(obj.maleAttendance)
        temp.push(obj.femaleAttendance)
        temp.push(obj.childrenAttendance)
        attendance.push(temp)
      }
      attendanceChart=( <Chart
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
    }
    if(this.props.fetchReportStart){
       attendanceChart=<LinearProgress  color="primary"/>
       progress=<LinearProgress  color="primary"/>
       }
    if(this.props.reports){
      if(this.props.reports.length==0){
        attendanceChart=<Typography variant="body1" >You have no records based on the selected filters, please select new filters and try again</Typography>
      }
    }
    return(
      <Grid
      item
      xs={12}
      md={12}>
      {progress}
        <Grid
        container
        spacing={0}
        justify="center">
          <Grid
          item
          xs={12}>
            <Paper square={true}>
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
                  <div className={classes.chart}>
                    {attendanceChart}
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

export default withStyles(styles)(ReportsAnalytics);
