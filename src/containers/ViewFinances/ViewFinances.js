import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { Delete, Edit} from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography,Button,Card,CardHeader,Avatar, CardActions,CardContent,LinearProgress} from '@material-ui/core';
import SnackbarContent from '../../components/UI/SnackBarContentWrapper/SnackBarContentWrapper';


const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class ViewFinances extends Component {
  state={
    month:months[new Date().getMonth()],
    category:null,
    type:'',
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
      this.props.onFetchFinance(this.props.branchId,this.props.first,this.state.type,this.state.category,this.state.month?this.state.month:null,this.state.year?this.state.year:null)
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchFinance(this.props.branchId,url,this.state.type,this.state.category,this.state.month?this.state.month:null,this.state.year?this.state.year:null)
  }
  render(){
    const { classes }= this.props
    const references=[this.type]
    let notification=null;
    if (this.props.fetchFinanceSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.fetchFinanceSuccess} message={"Reports fetched successfully"}/>
    }
    if (this.props.fetchFinanceFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.fetchFinanceFail} message={"There was an error fetching click the filter button to try again"}/>
    }
    let view=null
    let progress=null
    if(this.props.fetchFinanceStart){
      progress=<LinearProgress color="secondary" />
    }
    if(this.props.fetchFinanceSuccess|| this.props.reports){
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
                  title={data.category}
                  subheader={new Date(data.date).toDateString()}
                  />
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total: {data.total}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                   Percentage: {data.percentage}
                  </Typography>
                </CardContent>
                <CardActions>
                  {this.props.permissions.indexOf(7)>=0?
                    <React.Fragment>
                    <Button variant="contained" component={Link} to={`/finance/${data.id}`}  size="small" aria-label="delete"><Edit color="secondary"/></Button>
                    <Button onClick={()=>this.props.toggleModal(data,'finance')} variant="contained" size="small" aria-label="delete"><Delete color="error"/></Button>
                    </React.Fragment>:null}
                </CardActions>
              </Card>
            </Grid>
          )
        })
      )
    }
    if(this.props.reports){
      if(this.props.reports.length==0){
        view=<Grid item xs={12}><SnackbarContent message={`You have no records in ${this.state.month+" "+this.state.year}`} variant="info"/></Grid>
      }
    }
    if(this.props.fetchFinanceFail){
      view=<Grid item xs={12}><SnackbarContent message={`An error ocured Please try again`} variant="error"/></Grid>
    }

    return(
      <div style={{padding:4,width:'100%',margin:0}}>
      <Grid
      container
      item
      xs={12}
      spacing={2}
      justify="flex-start">
        <Grid item xs={12} >

          {notification}
          <Paper style={{overflowX:'hidden'}}>
            {progress}
            <div className={classes.filters}>
              <Typography variant='h4'>You are currently analysing reports for <strong>{this.state.month}</strong> <strong>{this.state.year}</strong></Typography>
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
  token:state.auth.token,
  permissions:state.auth.permissions,
  branchId:state.auth.branchId,
  fetchFinanceStart:state.finance.fetchFinanceStart,
  fetchFinanceSuccess:state.finance.fetchFinanceSuccess,
  fetchFinanceFail:state.finance.fetchFinanceFail,
  total:state.finance.total,
  reports:state.finance.reports,
  first:state.finance.first,
  next:state.finance.next,
  prev:state.finance.prev,
  current_page:state.finance.current_page
})
const mapDispatchToProps = dispatch =>({
  onFetchFinance:(branchId,url=null,type='income',category=null,month=null,year='2019')=> dispatch(fetchFinanceAsync(branchId,url,type,category,month,year)),
  onUnmount:()=> dispatch(financeSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ViewFinances))
