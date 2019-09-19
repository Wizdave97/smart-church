import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,BarChart,Bar, Legend } from "recharts";
import { Link } from 'react-router-dom';
import { Grid,Paper,Typography, Fab,Divider, CircularProgress,Button} from '@material-ui/core';
import { ShowChart, Money, Payment} from '@material-ui/icons';
import { fetchAttendanceAsync,fetchFinanceAsync } from '../../store/actions/dashboardActions';
import * as actionTypes from '../../store/actions/actionTypes';
import styles from './styles';
import SnackbarContent from '../../components/UI/SnackBarContentWrapper/SnackBarContentWrapper';

class Dashboard extends Component{
  state={
    title:null,
    expMax:null,
    label:null,
    incomeMax:null,
    incomeLabels:null,
    incomeData:null,
    intervalId:null,
    expenditureTitle:null,
    expenditureLabels:null,
    expenditureData:null,
    expenditureId:null,
    totalAttendance:0,
    totalIncome:0,
    totalExpenditure:0
  }
  componentDidMount(){
    this.props.onFetchAttendance(this.props.branchId);
    this.props.onFetchFinance(this.props.branchId,null,'Income');
    this.props.onFetchFinance(this.props.branchId,null,'Expenditure')
  }
  cycle= (dataIndex,labels,dataset,data,label) =>{

    this.setState({
      [dataset]:data[labels[dataIndex]],
      [label]:labels[dataIndex]
    })
  }
  cycleIncomeCategories= (incomeUngrouped,dataIndex,id,dataset,maxVal,label) =>{
    let amounts=[]
    let data=[]
    for (let obj of incomeUngrouped){
      if(data[obj.category]){
        let temp={}
        temp.name=new Date(obj.date).toDateString()
        temp.amount=obj.total
        data[obj.category].push(temp)
        amounts.push(obj.total)
      }
      else{
        data[obj.category]=[];
        let temp={}
        temp.name=new Date(obj.date).toDateString()
        temp.amount=obj.total
        data[obj.category].push(temp)
        amounts.push(obj.total)
      }
    }
    let labels=[...Object.keys(data)]
    //let data=[...Object.values(income)]
    console.log(labels)

    let intervalId=window.setInterval(()=>{
      if(dataIndex>=labels.length){
        dataIndex=0
      }
      this.cycle(dataIndex,labels,dataset,data,label)
      dataIndex++
    },10000)
  this.setState({[id]:intervalId,[maxVal]:Math.max(...amounts)})
  }
  componentDidUpdate(prevProps,prevState){
    let dataIndex=0,expIndex=0;
    if(this.props.fetchIncomeSuccess && this.props.income){
      if(this.props.income.length!==0){
        if(prevState.intervalId==null){
          this.cycleIncomeCategories(this.props.income,dataIndex,'intervalId','incomeData','incomeMax','incomeLabel')
        }
      }
    }
    if(this.props.fetchExpenditureSuccess && this.props.expenditure){
      if(this.props.expenditure.length!==0){
        if(prevState.expenditureId==null){
          this.cycleIncomeCategories(this.props.expenditure,expIndex,'expenditureId','expenditureData','expMax','expLabel')
        }
      }
    }
    if(prevProps.income!==this.props.income){
      if(this.props.income){
        if(this.props.income.length!==0){
          let total=0;
          for(let obj of this.props.income){
            total+=Number(obj.total)
          }
          total=Math.round(total/this.props.income.length)
          this.setState({totalIncome:total})
        }
      }
    }
    if(prevProps.reports!==this.props.reports){
      if(this.props.reports){
        if(this.props.reports.length!==0){
          let total=0;
          for(let obj of this.props.reports){
            total+=Number(obj.totalAttendance)
          }
          total=Math.round(total/this.props.reports.length)
          this.setState({totalAttendance:total})
        }
      }
    }
    if(prevProps.expenditure!==this.props.expenditure){
      if(this.props.expenditure){
        if(this.props.expenditure.length!==0){
          let total=0;
          for(let obj of this.props.expenditure){
            total+=Number(obj.total)
          }
          total=Math.round(total/this.props.expenditure.length)
          this.setState({totalExpenditure:total})
        }
      }
    }
  }
  componentWillUnmount(){
    window.clearInterval(this.state.intervalId)
    window.clearInterval(this.state.expenditureId)
  }
  render(){
    const { classes } = this.props
    let attendance=[]

    let attendanceChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchAttendanceSuccess && this.props.reports){
      for(let obj of this.props.reports){
        let temp={};
        temp.name=new Date(obj.date).toDateString()
        temp['male attendance']=obj.maleAttendance
        temp['female attendance']=obj.femaleAttendance
        temp['children attendance']=obj.childrenAttendance
        attendance.push(temp)
      }
      attendanceChart=(<ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >
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
    if(this.props.fetchAttendanceFail){
      attendanceChart=<React.Fragment><SnackbarContent message="An Error occured please reload"  variant="error"/><Button onClick={()=>this.props.onFetchAttendance(this.props.branchId)} size="small" variant="contained" color="secondary">Retry</Button></React.Fragment>
    }
    let incomeChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchIncomeSuccess && this.props.income){
      incomeChart=(
        <ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >

          <LineChart data={this.state.incomeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend verticalAlign="top" height={36}/>
            <Line name={this.state.incomeLabel} type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis allowDataOverflow={false} domain={[0, this.state.incomeMax+1000]}/>
            <Tooltip />
          </LineChart>
          </ResponsiveContainer>
      )
    }
    if (this.props.fetchIncomeFail){
        incomeChart=<React.Fragment><SnackbarContent message="An Error occured please reload" variant="error"/><Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,'Income')} size="small" variant="contained" color="secondary">Retry</Button></React.Fragment>
    }
    let expenditureChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchExpenditureSuccess && this.props.expenditure){
      expenditureChart=(
        <ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >

          <LineChart data={this.state.expenditureData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend verticalAlign="top" height={36}/>
            <Line name={this.state.expLabel} type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis allowDataOverflow={false} domain={[0, this.state.expMax+1000]}/>
            <Tooltip />
          </LineChart>
          </ResponsiveContainer>
      )
    }
    if (this.props.fetchExpenditureFail){
        expenditureChart=<React.Fragment><SnackbarContent message="An Error occured please reload" variant="error"/><Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,'Expenditure')} size="small" variant="contained" color="secondary">Retry</Button></React.Fragment>
    }

    return (

          <Grid container spacing={4}>

          <Grid
           item
           xs={12}>
              <Paper square={true} elevation={4} className={classes.cards}>
                  <Typography className={classes.chartTitle}  variant="h3" gutterBottom>Recents</Typography>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper  elevation={4} className={[classes.card,classes.card1].join(' ')}>
                          <Typography className={classes.text} variant="h4" align="right">Attendance</Typography>
                          <Typography className={classes.text} variant="body1" align="right">{this.state.totalAttendance}</Typography>
                        </Paper>
                  </Grid>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper elevation={6} className={[classes.card,classes.card2].join(' ')}>
                          <Typography className={classes.text} variant="h4" align="right">Income</Typography>
                          <Typography className={classes.text} variant="body1" align="right">{this.state.totalIncome}</Typography>
                        </Paper>
                  </Grid>
                  <Grid item
                        xs={12}
                        sm={3}>
                        <Paper elevation={6} className={[classes.card,classes.card3].join(' ')}>
                          <Typography className={classes.text} variant="h4" align="right">Expenditure</Typography>
                          <Typography className={classes.text} variant="body1" align="right">{this.state.totalExpenditure}</Typography>
                        </Paper>
                  </Grid>
              </Paper>
           </Grid>
          <Grid
          item
          xs={12}
          md={12}
          xl={6}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Attendance</Typography>
                    <Fab variant="extended" size="small" color="secondary" component={Link} to="/analytics"><Typography variant="body1">Explore</Typography></Fab>
                </div>
                <div className={classes.chartContainer} id='attendance'>
                  {attendanceChart}
                </div>
            </Paper>
          </Grid>
          <Grid
          item
          xs={12}
          md={12}
          xl={6}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Income</Typography>
                    <Fab variant="extended" size="small" color="secondary" component={Link} to="/analytics"><Typography variant="body1">Explore</Typography></Fab>
                </div>
                <div className={classes.chartContainer}>
                  {incomeChart}
                </div>
            </Paper>
          </Grid>
          <Grid
          item
          xs={12}
          md={12}
          xl={6}>
            <Paper square={true} elevation={3} className={classes.chart}>
                <div className={classes.chartTitle}>
                    <Typography variant='h3' style={{flex:1}} >Expenditure</Typography>
                    <Fab variant="extended" size="small" color="secondary" component={Link} to="/analytics"><Typography variant="body1">Explore</Typography></Fab>
                </div>
                <div className={classes.chartContainer}>
                    {expenditureChart}
                </div>
            </Paper>
          </Grid>
          </Grid>

    )
  }
}
const mapStateToProps = state =>({
  fetchAttendanceStart:state.dashboard.fetchAttendanceStart,
  fetchAttendanceSuccess:state.dashboard.fetchAttendanceSuccess,
  fetchAttendanceFail:state.dashboard.fetchAttendanceFail,
  fetchIncomeStart:state.dashboard.fetchIncomeStart,
  fetchIncomeSuccess:state.dashboard.fetchIncomeSuccess,
  fetchIncomeFail:state.dashboard.fetchIncomeFail,
  fetchExpenditureStart:state.dashboard.fetchExpenditureStart,
  fetchExpenditureSuccess:state.dashboard.fetchExpenditureSuccess,
  fetchExpenditureFail:state.dashboard.fetchExpenditureFail,
  reports:state.dashboard.reports,
  income:state.dashboard.income,
  expenditure:state.dashboard.expenditure,
  branchId:state.auth.branchId
})
const mapDispatchToProps= dispatch =>({
  onFetchAttendance:(branchId)=> dispatch(fetchAttendanceAsync(branchId)),
  onFetchFinance:(branchId,url,type)=>dispatch(fetchFinanceAsync(branchId,url,type))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Dashboard));
