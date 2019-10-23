import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Label,ResponsiveContainer,BarChart,Legend, Bar } from 'recharts';
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import { Paper, Grid, Typography, Button, LinearProgress} from '@material-ui/core'
import SnackbarContent from '../../components/UI/SnackBarContentWrapper/SnackBarContentWrapper';

const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
const categories=['children','female','male','total'];
class AttendanceAnalytics extends Component {
  state={
    data:null,
    title:'',
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
    let data=[];
    let title=null
    switch(this.state.category){
      case 'total':
          title="Total Attendance"
          for (let obj of raw){
            let temp={}
            temp.name=new Date(obj.date).toDateString()
            temp.attendance=obj.totalAttendance
            data.push(temp)
          }
          break;
      case 'children':
          title="Children Attendance"
          for (let obj of raw){
            let temp={}
            temp.name=new Date(obj.date).toDateString()
            temp.attendance=obj.childrenAttendance
            data.push(temp)
          }
          break;
      case 'female':
          title="Female Attendance"
          for (let obj of raw){
            let temp={}
            temp.name=new Date(obj.date).toDateString()
            temp.attendance=obj.femaleAttendance
            data.push(temp)
          }
          break;
      case 'male':
          title="Male Attendance"
          for (let obj of raw){
            let temp={}
            temp.name=new Date(obj.date).toDateString()
            temp.attendance=obj.maleAttendance
            data.push(temp)
          }
          break;
      default: break

    }

    this.setState({
    data:data,
    title:title
    })
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.reports!==prevProps.reports && this.props.reports!==null){
      if(this.props.reports.length!==0){
        this.structureData(this.props.reports)
      }

      //this.props.onUnmount()
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
    let attendance=[]
    let progress=null
    let attendanceChart=<LinearProgress  color="primary"/>
    let attendanceBarChart=<LinearProgress  color="primary"/>

    if( this.props.reports){
      for(let obj of this.props.reports){
        let temp={};
        temp.name=new Date(obj.date).toDateString()
        temp['male attendance']=obj.maleAttendance
        temp['female attendance']=obj.femaleAttendance
        temp['children attendance']=obj.childrenAttendance
        attendance.push(temp)
      }
      attendanceChart=(
    <ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >

      <LineChart data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Legend verticalAlign="top" height={36}/>
        <Line name={this.state.category} type="monotone" dataKey="attendance" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
      )
      attendanceBarChart=(
      <ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >
      <BarChart  data={attendance}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Bar dataKey="male attendance" fill="#8884d8" />
        <Bar dataKey="female attendance" fill="#82ca9d" />
        <Bar dataKey="children attendance" fill="#85539d" />
      </BarChart>
      </ResponsiveContainer>


      )
    }

    if(this.props.fetchReportStart) {
      attendanceChart=<LinearProgress  color="primary"/>
      attendanceBarChart=<LinearProgress  color="primary"/>
      progress=<LinearProgress  color="primary"/>
    }
    if(this.props.reports){
      if(this.props.reports.length==0){
        attendanceChart=<SnackbarContent message="You have no records based on the selected filters, please select new filters and try again" variant="info"/>
        attendanceBarChart=<SnackbarContent message="You have no records based on the selected filters, please select new filters and try again" variant="info"/>
      }
    }
    if(this.props.fetchReportFail){
      attendanceChart=<React.Fragment><SnackbarContent message="An Error occured please reload" variant="error"/> <Button onClick={()=>this.props.onFetchReport(this.props.branchId)} size="small" variant="contained" color="secondary">Retry</Button></React.Fragment>
      attendanceBarChart=<React.Fragment><SnackbarContent message="An Error occured please reload" variant="error"/> <Button onClick={()=>this.props.onFetchReport(this.props.branchId)} size="small" variant="contained" color="secondary">Retry</Button></React.Fragment>
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
            <Paper className={classes.paper}>
              {progress}
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
