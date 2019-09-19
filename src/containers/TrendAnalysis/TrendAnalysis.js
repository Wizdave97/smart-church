import React, { Component, Fragment } from 'react';
import {Paper, Grid, Typography,LinearProgress,Button }  from '@material-ui/core';
import baseUrl from '../../store/base_url';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { handleChange,submitHandler} from '../../utils/Utility';
import * as actionTypes  from '../../store/actions/actionTypes';
import Input from '../../components/UI/Input/Input';
import { trendSync, fetchTrendReportAsync, fetchTrendFinanceAsync } from '../../store/actions/trendActions';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import SnackbarContent from '../../components/UI/SnackBarContentWrapper/SnackBarContentWrapper';
import styles from './styles';

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
const categories=['children','female','male','total'];
class TrendAnalysis extends Component {
    state={
      reports:null,
      finances:null,
      dataMax:null,
      reportTo:'',
      reportFrom:'',
      reportDay:'',
      financeDay:'',
      financeTo:'',
      financeFrom:'',
      errorReportTo:false,
      errorFinanceTo:false,
      errorReportFrom:false,
      errorFinanceFrom:false,
      reportYear:new Date().getFullYear(),
      financeYear:new Date().getFullYear(),
      fixValidityBug:null,
      category:'total',
      incomeCategories:null,
      expenseCategories:null,
      financeCategory:'',
      type:'',
      errorFinanceCategory:false,
      errorType:false,
    }
    hardSetState=this.setState.bind(this)
    setRef= element =>{
      if(element){
        this[element.name]=element;
      }
    }
    componentDidMount(){
      this.setState({fixValidityBug:null})
      this.fetchIncomeCategories(this.props.token)
      this.fetchExpenseCategories(this.props.token)
    }
    structureData= (raw) =>{
      let data=[];
      switch(this.state.category){
        case 'total':

            for (let obj of raw){
              let temp={}
              temp.name=new Date(obj.date).toDateString()
              temp.attendance=obj.totalAttendance
              data.push(temp)
            }
            break;
        case 'children':

            for (let obj of raw){
              let temp={}
              temp.name=new Date(obj.date).toDateString()
              temp.attendance=obj.childrenAttendance
              data.push(temp)
            }
            break;
        case 'female':

            for (let obj of raw){
              let temp={}
              temp.name=new Date(obj.date).toDateString()
              temp.attendance=obj.femaleAttendance
              data.push(temp)
            }
            break;
        case 'male':

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
      reports:data,
      })
    }
    structureFinanceData= (raw) =>{
      let data=[]
      let amounts=[]
      for (let obj of raw){
          let temp={}
          temp.name=new Date(obj.date).toDateString()
          temp.amount=obj.total
          amounts.push(obj.total)
          data.push(temp)
        }
      this.setState({finances:data,dataMax:Math.max(...amounts)})

    }
    fetchIncomeCategories=(token)=>{
      fetch(baseUrl+'/inmedium',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer'+token
        }
      }).then(res=>res.json()).then(res=>{
        let categories=[];
        for(let obj of res.data){
          categories.push(obj.category)
        }
        this.setState({incomeCategories:categories})
      }).catch(err=>setTimeout(()=>this.fetchIncomeCategories(token),1000))
    }
    fetchExpenseCategories=(token)=>{
      fetch(baseUrl+'/expenses',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer'+token
        }
      }).then(res=>res.json()).then(res=>{
        let categories=[];
        for(let obj of res.data){
          categories.push(obj.category)
        }
        this.setState({expenseCategories:categories})
      }).catch(err=>setTimeout(()=>this.fetchExpenseCategories(token),1000))
    }
    onSubmit = (references,hardSetState,e)=>{
      e.preventDefault();
      let valid= submitHandler(references, hardSetState)
      if (valid){
        this.props.onFetchTrendReports(this.props.branchId,this.state.reportFrom,this.state.reportTo,this.state.year)
      }
    }
    onSubmitFinance = (references,hardSetState,e)=>{
      e.preventDefault();
      let valid= submitHandler(references, hardSetState)
      if (valid){
        this.props.onFetchTrendFinance(this.props.branchId,this.state.type,this.state.financeCategory,this.state.financeFrom,this.state.financeTo,this.state.financeYear)
      }
    }
    componentDidUpdate(prevProps,prevState){
      if(this.props.fetchTrendReportsSuccess && this.props.reports!==null){
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
      if(this.props.fetchTrendFinanceSuccess && this.props.financeSync!==null){
        if(this.props.finances.length!==0){
          this.structureFinanceData(this.props.finances)

        }
        this.props.onUnmount()
      }
      if((prevProps.fetchTrendFinanceSuccess!=this.props.fetchTrendFinanceSuccess && prevProps.fetchTrendReportsSuccess != this.props.fetchTrendReportsSuccess) && (this.props.fetchTrendFinanceSuccess && this.props.fetchTrendReportsSuccess)){
        this.props.onUnmount()
      }
      if((this.state.reportDay && (prevState.reportDay !==this.state.reportDay))||(this.state.reportDay && (prevState.category!==this.state.category))) {
        let data=[];
        if(this.props.reports){
          if(this.props.reports.length!==0){
            for(let obj of this.props.reports){
              if(new Date(obj.date).getDay()==days.indexOf(this.state.reportDay)){
                data.push(obj)
              }
            }
            this.structureData(data)
          }
        }
      }
      if(prevState.reportDay && !this.state.reportDay) {
        if(this.props.reports){
          if(this.props.reports.length!==0){
            this.structureData(this.props.reports)
          }
        }
      }
      if(this.state.financeDay && (prevState.financeDay !==this.state.financeDay)) {
        let data=[];
        if(this.props.finances){
          if(this.props.finances.length!==0){
            for(let obj of this.props.finances){
              if(new Date(obj.date).getDay()==days.indexOf(this.state.financeDay)){
                data.push(obj)
              }
            }
            this.structureFinanceData(data)
          }
        }
      }
      if(prevState.financeDay && !this.state.financeDay) {
        if(this.props.finances){
          if(this.props.finances.length!==0){
            this.structureFinanceData(this.props.finances)
          }
        }
      }
    }
    render(){
      const { classes }= this.props
      const references_1=[this.reportFrom,this.reportTo]
      const references_2=[this.financeFrom,this.financeTo,this.financeCategory,this.type]
      let reportChart=<SnackbarContent message="Select and apply filters to see trend graphs" variant="info"/>
      let financeChart=<SnackbarContent message="Select and apply filters to see trend graphs" variant="info"/>
      if(this.state.reports){
          if(this.state.reports.length!==0){
            reportChart=(<ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >
              <AreaChart data={this.state.reports} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Legend verticalAlign="top" height={36}/>
                <Area name={this.state.category} type="monotone" dataKey="attendance" stroke="#8884d8" fill="#8884d8"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </AreaChart>
              </ResponsiveContainer>)
          }
        }

      if(this.props.fetchTrendReportsStart) reportChart=<LinearProgress color="secondary"/>
      if(this.props.fetchTrendReportsFail){
        reportChart=<SnackbarContent message="An Error occurred, apply filters to see trend graphs" variant="error"/>
      }
      if(this.props.reports){
        if(this.props.reports.length==0){
          reportChart=<SnackbarContent message="You have no records within that range" variant="info"/>
        }
      }
      if(this.state.finances){
          if(this.state.finances.length!==0){
            financeChart=(<ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >
              <AreaChart data={this.state.finances} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Legend verticalAlign="top" height={36}/>
                <Area name={this.state.financeCategory} type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis allowDataOverflow={false} domain={[0, this.state.dataMax+1000]}/>
                <Tooltip />
              </AreaChart>
              </ResponsiveContainer>)
          }
        }

      if(this.props.fetchTrendFinanceStart) financeChart=<LinearProgress color="secondary"/>
      if(this.props.fetchTrendFinanceFail){
        financeChart=<SnackbarContent message="An Error occurred, apply filters to see trend graphs" variant="error"/>
      }
      if(this.props.finances){
        if(this.props.finances.length==0){
          financeChart=<SnackbarContent message="You have no records within that range" variant="info"/>
        }
      }
      return(
       <Fragment>
         <Grid item xs={12}>
          <Paper>
          <div className={classes.filters}>
            <Typography variant='h2' align="center" color="secondary" gutterBottom>Report Trend Analytics</Typography>
          </div>
          <div className={classes.filters}>
            <Typography variant='h4'>
              You are currently inspecting reports from <strong>{this.state.reportFrom}</strong> to <strong>{this.state.reportTo}</strong> <strong>{this.state.reportYear}</strong>
            </Typography>
          </div>
          <form className={classes.filters} noValidate={true} onSubmit={(event)=>this.onSubmit(references_1,this.hardSetState,event)} >
            <div className={classes.entry}>
            <Input
              inputType="select"
              required={true}
              options={months}
              name="reportFrom"
              value={this.state.reportFrom}
              reference={this.setRef}
              error={this.state.errorReportFrom}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="From"
            /></div>
            <div className={classes.entry}>
            <Input
              inputType="select"
              required={true}
              options={months}
              name="reportTo"
              reference={this.setRef}
              value={this.state.reportTo}
              error={this.state.errorReportTo}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="To"
            /></div>
            <div className={classes.entry}>
            <Input
              inputType="input"
              required={false}
              name="reportYear"
              value={this.state.reportYear}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="Type in the year"
              placeholder="e.g 2019"
            /></div>
          <div className={classes.entry}><Button className={classes.button} type="submit" size="medium" color="secondary" variant="outlined">Apply Filters</Button></div>
          </form>
          <div className={classes.tableWrapper}>
          <div className={classes.filters}>
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
          <div className={classes.entry}>
          <Input
            inputType="select"
            required={false}
            options={days}
            name="reportDay"
            value={this.state.reportDay}
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            label="Select Day"
          /></div>
          </div>
          <div className={classes.chart}>
            {reportChart}
          </div>
          </div>
          </Paper>
         </Grid>
          <Grid item xs={12}>
          <Paper>
          <div className={classes.filters}>
            <Typography variant='h2' align="center" color="secondary" gutterBottom>Finance Trend Analytics</Typography>
          </div>
          <div className={classes.filters}>
            <Typography variant='h4'>
              You are currently inspecting reports from <strong>{this.state.financeFrom}</strong> to <strong>{this.state.financeTo}</strong> <strong>{this.state.financeYear}</strong>
            </Typography>
          </div>
          <form className={classes.filters} noValidate={true} onSubmit={(event)=>this.onSubmitFinance(references_2,this.hardSetState,event)} >
            <div className={classes.entry}>
            <Input
              inputType="select"
              required={true}
              options={months}
              name="financeFrom"
              value={this.state.financeFrom}
              reference={this.setRef}
              error={this.state.errorFinanceFrom}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="From"
            /></div>
            <div className={classes.entry}>
            <Input
              inputType="select"
              required={true}
              options={months}
              name="financeTo"
              reference={this.setRef}
              value={this.state.financeTo}
              error={this.state.errorFinanceTo}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="To"
            /></div>
            <div className={classes.entry}>
            <Input
              inputType="input"
              required={false}
              name="financeYear"
              value={this.state.financeYear}
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="Type in the year"
              placeholder="e.g 2019"
            /></div>
            <div className={classes.entry}>
            <Input
              inputType="select"
              required={true}
              options={['Income','Expenditure']}
              name="type"
              reference={this.setRef}
              value={this.state.type}
              error={this.state.errorType}
              errorMessage="Please this filled is required"
              handleChange={(event)=>handleChange(event,this.hardSetState)}
              label="Select type"
            /></div>
            <div className={classes.entry}>
            <Input
             inputType="select"
             required={true}
             name="financeCategory"
             value={this.state.financeCategory}
             reference={this.setRef}
             options={this.state.type=='Income'?this.state.incomeCategories:this.state.expenseCategories}
             error={this.state.errorFinanceCategory}
             errorMessage="Please this filled is required"
             handleChange={(event)=>handleChange(event,this.hardSetState)}
             label="Select Category"
            /></div>
          <div className={classes.entry}><Button className={classes.button} type="submit" size="medium" color="secondary" variant="outlined">Apply Filters</Button></div>
          </form>
          <div className={classes.filters}>
          <div className={classes.entry}>
          <Input
            inputType="select"
            required={false}
            options={days}
            name="financeDay"
            value={this.state.financeDay}
            handleChange={(event)=>handleChange(event,this.hardSetState)}
            label="Select Day"
          /></div>
          </div>
          <div className={classes.tableWrapper}>
          <div className={classes.chart}>
            {financeChart}
          </div>
          </div>
          </Paper>
          </Grid>
        </Fragment>
      )
    }
}
const mapStateToProps= state=>({
  token:state.auth.token,
  branhId:state.auth.branchId,
  reports:state.trends.reports,
  finances:state.trends.finances,
  fetchTrendReportsStart:state.trends.fetchTrendReportsStart,
  fetchTrendReportsSuccess:state.trends.fetchTrendReportsSuccess,
  fetchTrendReportsFail:state.trends.fetchTrendReportsFail,
  fetchTrendFinanceStart:state.trends.fetchTrendFinanceStart,
  fetchTrendFinanceSuccess:state.trends.fetchTrendFinanceSuccess,
  fetchTrendFinanceFail:state.trends.fetchTrendFinanceFail,
})

const mapDispatchToProps= dispatch=>({
  onFetchTrendReports:(branchId,from,to,year)=> dispatch(fetchTrendReportAsync(branchId,from,to,year)),
  onFetchTrendFinance:(branchId,type,category,from,to,year)=> dispatch(fetchTrendFinanceAsync(branchId,type,category,from,to,year)),
  onUnmount:()=> dispatch(trendSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TrendAnalysis));
