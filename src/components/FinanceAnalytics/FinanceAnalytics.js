import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { Line } from "react-chartjs-2";
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import { Paper, Grid, Typography, Button, CircularProgress} from '@material-ui/core'


const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class FinanceAnalytics extends Component {
  state={
    title:null,
    labels:null,
    dataset:null,
    month:'',
    category:null,
    type:'',
    year:'',
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
      this.props.onFetchFinance(this.props.branchId,this.props.first,this.state.type,this.state.category,this.state.month?this.state.month:null,this.state.year?this.state.year:null)
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchFinance(this.props.branchId,url,this.state.type,this.state.category,this.state.month?this.state.month:null,this.state.year?this.state.year:null)
  }

  structureData= (raw) =>{
    let dictionary=[]
    for (let obj of raw){
      if(dictionary[obj.category]){
        dictionary[obj.category][0].push(obj.date)
        dictionary[obj.category][1].push(obj.total)
      }
      else{
        dictionary[obj.category]=[[],[]];
        dictionary[obj.category][0].push(obj.date)
        dictionary[obj.category][1].push(obj.total)
      }
    }
    let labels=[...Object.keys(dictionary)]
    let data=[...Object.values(dictionary)]
    //console.log(labels)
    this.setState({
      title:labels[0],
      dataset:data[0][1],
      labels:data[0][0]
    })
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.fetchFinanceSuccess && this.props.data!==null){
        this.structureData(this.props.data)
        this.props.onUnmount()
    }
  }
  render(){
    const { classes }= this.props
    const references=[this.type]
    let financeChart=<CircularProgress style={{alignSelf:"center"}} color="primary"/>
    if(this.state.dataset && this.state.labels){
      financeChart=(
        <Line data={{
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
    }
    if(this.props.fetchFinanceFail){
      financeChart=<Typography variant="body1">An Error occured please reload <Button onClick={()=>this.props.onFetchFinance(this.props.branchId,null,this.state.type?this.state.type:'Income')} size="small" color="secondary">Retry</Button></Typography>
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
                  options={['Income','Expenses']}
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
