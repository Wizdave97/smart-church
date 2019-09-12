import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import { Grid,Paper,Typography, Fab,Divider, CircularProgress,Button} from '@material-ui/core';
import { ShowChart, Money, Payment} from '@material-ui/icons';
import { fetchAttendanceAsync,fetchFinanceAsync } from '../../store/actions/dashboardActions';
import * as actionTypes from '../../store/actions/actionTypes';
import styles from './styles';

class Dashboard extends Component{
  state={
    title:null,
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
  cycle= (dataIndex,labels,data,title,dataset,datalabels) =>{

    this.setState({
      [title]:labels[dataIndex],
      [dataset]:data[dataIndex][1],
      [datalabels]:data[dataIndex][0]
    })
  }
  cycleIncomeCategories= (incomeUngrouped,dataIndex,id,title,dataset,datalabels) =>{

    let income=[]
    for (let obj of incomeUngrouped){
      if(income[obj.category]){
        income[obj.category][0].push(obj.date)
        income[obj.category][1].push(obj.total)
      }
      else{
        income[obj.category]=[[],[]];
        income[obj.category][0].push(obj.date)
        income[obj.category][1].push(obj.total)
      }
    }
    let labels=[...Object.keys(income)]
    let data=[...Object.values(income)]
    console.log(labels)

    let intervalId=window.setInterval(()=>{
      if(dataIndex>=labels.length){
        dataIndex=0
      }
      this.cycle(dataIndex,labels,data,title,dataset,datalabels)
      dataIndex++
    },10000)
  this.setState({[id]:intervalId})
  }
  componentDidUpdate(prevProps,prevState){
    let dataIndex=0,expIndex=0;
    if(this.props.fetchIncomeSuccess && this.props.income){
      if(this.props.income.length!==0){
        if(prevState.intervalId==null){
          this.cycleIncomeCategories(this.props.income,dataIndex,'intervalId','title','incomeData','incomeLabels')
        }
      }
    }
    if(this.props.fetchExpenditureSuccess && this.props.expenditure){
      if(this.props.expenditure.length!==0){
        if(prevState.expenditureId==null){
          this.cycleIncomeCategories(this.props.expenditure,expIndex,'expenditureId','expenditureTitle','expenditureData','expenditureLabels')
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
    let attendance=[['Date','Male Attendance','Female Attendance','Children Attendance']]

    let attendanceChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchAttendanceSuccess && this.props.reports){
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
    if(this.props.fetchAttendanceFail){
      attendanceChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchAttendance(this.props.branchId)} size="small" color="secondary">Retry</Button></Typography>
    }
    let incomeChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchIncomeSuccess && this.props.income){
      incomeChart=(
        <Line data={{
      labels:this.state.incomeLabels,
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
          data: this.state.incomeData
        },
      ]
    }} options={{ responsive: true }} />
      )
    }
    if (this.props.fetchIncomeFail){
        incomeChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,'Income')} size="small" color="secondary">Retry</Button></Typography>
    }
    let expenditureChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.props.fetchExpenditureSuccess && this.props.expenditure){
      expenditureChart=(
        <Line data={{
      labels:this.state.expenditureLabels,
      datasets: [
        {
          label: this.state.expenditureTitle,
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
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.expenditureData
        },
      ]
    }} options={{ responsive: true }} />
      )
    }
    if (this.props.fetchExpenditureFail){
        expenditureChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,'Expenditure')} size="small" color="secondary">Retry</Button></Typography>
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
