import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import { Paper, Grid, Typography, Button, LinearProgress} from '@material-ui/core'


const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class FinanceAnalytics extends Component {
  state={
    data:null,
    dataMax:null,
    month:months[new Date().getMonth()],
    category:'offering',
    type:'Income',
    year:new Date().getFullYear(),
    incomeCategories:null,
    expenseCategories:null,
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
    this.props.onFetchFinance(this.props.branchId)
    fetch(baseUrl+'/inmedium',{
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer'+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      let categories=[];
      for(let obj of res.data){
        categories.push(obj.category)
      }
      this.setState({incomeCategories:categories})
    }).catch(err=> console.log(err))
    fetch(baseUrl+'/expenses',{
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer'+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      let categories=[];
      for(let obj of res.data){
        categories.push(obj.category)
      }
      this.setState({expenseCategories:categories})
    }).catch(err=> console.log(err))
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      this.props.onFetchFinance(this.props.branchId,this.props.first,this.state.type,this.state.category,this.state.month,this.state.year)
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchFinance(this.props.branchId,url,this.state.type,this.state.category,this.state.month,this.state.year)
  }

  structureData= (raw) =>{
    let data=[]
    let amounts=[]
    for (let obj of raw){
        let temp={}
        temp.name=new Date(obj.date).toDateString()
        temp.amount=obj.total
        amounts.push(obj.total)
        data.push(temp)
      }
    this.setState({data:data,dataMax:Math.max(...amounts)})

  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.fetchFinanceSuccess && this.props.data!==null){
      if(this.props.data.length!==0){
        this.structureData(this.props.data)
      }
      this.props.onUnmount()
    }
  }
  render(){
    const { classes }= this.props
    const references=[this.type]
    let progress=null
    let financeChart=<LinearProgress  color="primary"/>

    if(this.state.data){
      //console.log(this.state.dataMax)
      financeChart=(
        <ResponsiveContainer width={'100%'} height={"100%"} minHeight={400} minWidth={600} >

          <LineChart data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Legend verticalAlign="top" height={36}/>
            <Line name={this.state.category} type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis allowDataOverflow={false} domain={[0, this.state.dataMax+1000]}/>
            <Tooltip />
          </LineChart>
          </ResponsiveContainer>
      )
    }
    if(this.props.fetchFinanceFail){
      financeChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,this.state.type?this.state.type:'Income')} size="small" color="secondary">Retry</Button></Typography>
    }
    if (this.props.fetchFinanceStart) {
      financeChart=<LinearProgress  color="primary"/>
      progress=<LinearProgress  color="primary"/>
    }
    if(this.props.data){
      if(this.props.data.length==0){
        financeChart=<Typography variant="body1" >You have no records based on the selected filters, please select new filters and try again</Typography>
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
                <Typography variant='h2' align="center" color="secondary" gutterBottom>Church Finance Analytics</Typography>
              </div>
              <div className={classes.filters}>
                <Typography variant='h4'>You are currently inspecting reports for <strong>{this.state.month}</strong> <strong>{this.state.year}</strong> </Typography>
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
                 required={false}
                 name="category"
                 value={this.state.category}
                 reference={this.setRef}
                 options={this.state.type=='Income'?this.state.incomeCategories:this.state.expenseCategories}
                 error={this.state.errorCategory}
                 errorMessage="Please this filled is required"
                 handleChange={(event)=>handleChange(event,this.hardSetState)}
                 label="Select Category"
                /></div>
              <div className={classes.entry}><Button className={classes.button} type="submit" size="medium" color="secondary" variant="outlined">Apply Filters</Button></div>
              </form>
              <div className={classes.tableWrapper}>
              <div className={classes.chart}>
                {financeChart}
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
export default withStyles(styles)(FinanceAnalytics)
