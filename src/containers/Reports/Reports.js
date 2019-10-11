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
import { Paper, Grid, Typography, Button, Card,CardHeader,Avatar, CardActions,CardContent,LinearProgress} from '@material-ui/core'

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class Reports extends Component {
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
            <Grid item xs={12} sm={4} lg={3} key={index}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {index+1}
                    </Avatar>
                  }
                  title={data.serviceDay}
                  subheader={new Date(data.date).toDateString()}
                  />
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Male: {data.maleAttendance}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Female : {data.femaleAttendance}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Children: {data.childrenAttendance}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    First Timers: {data.firstTimers}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Salvation: {data.salvation}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total: {data.totalAttendance}
                  </Typography>

                </CardContent>
                <CardActions style={{flexWrap:'wrap',display:'flex'}}>
                  {this.props.permissions.indexOf(7)>=0?
                    <React.Fragment>
                    <Button variant="contained" component={Link} to={`/newreport/${data.id}`} size="small" aria-label="edit"><Edit color="secondary"/></Button>
                    <Button onClick={()=>this.props.toggleModal(data,'report')} variant="contained" size="small" aria-label="delete"><Delete color="error"/></Button>
                    </React.Fragment>:null}
                </CardActions>
              </Card>
            </Grid>
          )
        })
      )
    }
    if(this.props.fetchReportFail){
      view=null
    }

    return(
      <div style={{padding:4,width:'100%',margin:0}}>
      <Grid
      container
      item
      xs={12}
      spacing={2}
      justify="flex-start">
        <Grid item xs={12}>
          {progress}
          {notification}
          <Paper>
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
          </Paper>
        </Grid>
          {view}
          <Grid
          container
          item
          spacing={0}
          justify="space-between"
          xs={12}>
          <Grid item><Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button></Grid>
          <Grid item><Typography variant="body1" align="center">Page {this.props.current_page} of {this.props.total}</Typography></Grid>
          <Grid item>  <Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button></Grid>
          </Grid>
      </Grid>
      </div>
    )
  }
}
const mapStateToProps= state=>({
  branchId:state.auth.branchId,
  permissions:state.auth.permissions,
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
