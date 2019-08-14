import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import * as actionTypes  from '../../store/actions/actionTypes';
import { financeSync, fetchFinanceAsync } from '../../store/actions/financeActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import baseUrl from '../../store/base_url';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography, Button, Table, TableCell, TableRow, TableBody, TableHead,LinearProgress} from '@material-ui/core'


const months=['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October','November', 'December']
class ViewFinances extends Component {
  state={
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
            <TableRow key={index}>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>{data.description.join(',')}</TableCell>
              <TableCell>{data.total}</TableCell>
              <TableCell>{data.percentage}</TableCell>
              <TableCell><Button variant="contained" size="small" aria-label="delete"><Delete color="error"/></Button></TableCell>
            </TableRow>
          )
        })
      )
    }
    if(this.props.fetchFinanceFail){
      view=null
    }

    return(
      <Grid
      item
      xs={12}
      md={12}>
      {progress}
      {notification}
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
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>{'Date'}</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {view}
                  <TableRow>
                    <TableCell><Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button></TableCell>
                    <TableCell><Typography variant="body1" align="center">Page {this.props.current_page}, No of Rows:{this.props.total}</Typography></TableCell>
                    <TableCell><Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state=>({
  token:state.auth.token,
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
