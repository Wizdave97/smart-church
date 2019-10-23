import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { handleChange,submitHandler} from '../../utils/Utility';
import { financeAsync, financeSync, updateFinanceAsync }  from '../../store/actions/financeActions';
import formSerialize from 'form-serialize';
import * as actionTypes  from '../../store/actions/actionTypes';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import baseUrl from '../../store/base_url';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';

class FinanceReport extends Component {
  state={
    reportType:'',
    category:'',
    date:'',
    amount:'',
    description:'',
    incomeCategories:[],
    expenseCategories:[],
    errorReportType:false,
    errorCategory:false,
    errorDate:false,
    errorDescription:false,
    errorAmount:false,
    fixValidityBug:''
  }
  componentDidMount(){
    this.setState({fixValidityBug:''})
    this.fetchIncomeCategories(this.props.token)
    this.fetchExpenseCategories(this.props.token)
    if(Number(this.props.match.params.id)>=0 && this.props.reports){
      for(let obj of this.props.reports ){
        if(obj.id==Number(this.props.match.params.id)){
          this.setState({
            date:obj.date,
            description:obj.total,
            category:obj.category
          })
        }
      }
    }
  }

  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
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
  componentDidUpdate(prevProps,prevState){
     if(prevState.incomeCategories.length!=this.state.incomeCategories.length || prevState.expenseCategories.length!=this.state.expenseCategories.length ){
         if(Number(this.props.match.params.id)>=0 && this.props.reports){
           this.setState({
             reportType:this.state.incomeCategories.indexOf(this.state.category)>-1?'Income':'Expenditure'
           })
         }
     }
  }

  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let data=formSerialize(form,{hash:true})
      delete data.reportType
      data.description=data.description.split(',')
      data.branchid=this.props.branchId
      if(Number(this.props.match.params.id)>=0){
        data.id=Number(this.props.match.params.id)
        this.props.onUpdateReport(this.state.reportType,data)
      }
      else {
        this.props.onSubmitHandler(this.state.reportType,data)
      }
    }
  }

  render(){
    const references=[this.reportType,this.category,this.description,this.date]
    const {errorReportType,errorDate,errorCategory,errorDescription }=this.state
    const { classes }=this.props
    let notification=null;
    if (this.props.postFinanceSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.postFinanceSuccess} message={"Upload was successful"}/>
    }
    if (this.props.postFinanceFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.postFinanceFail} message={"There was an error please try again"}/>
    }
    let view=(<Paper square={true} elevation={4} className={classes.paper}>
        <form className={classes.form} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)}>
            <div className={classes.title} color="secondary">
                <Typography variant="h2" color="secondary"  gutterBottom>Create a New Finance Report</Typography>
            </div>
            <Divider className={classes.divider}/>
            <div className={classes.general}>
                <div className={classes.title}><Typography variant="h3" color="secondary" gutterBottom>Finance Report</Typography></div>
                <div className={classes.entries}>
                    <div className={classes.entry}>
                        <Input
                          inputType="radio"
                          required={true}
                          error={errorReportType}
                          reference={this.setRef}
                          type="radio"
                          id="income-report"
                          checked={this.state.reportType=='Income'?true:false}
                          label="Income Report"
                          placeholder="Income Report"
                          name="reportType"
                          errorMessage="Please this field is required"
                          value="Income"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          />
                    </div>
                    <div className={classes.entry}>
                        <Input
                          inputType="radio"
                          required={true}
                          error={errorReportType}
                          reference={this.setRef}
                          type="radio"
                          id="expenditure"
                          label="Expenditure Report"
                          checked={this.state.reportType=='Expenditure'?true:false}
                          placeholder="Expenditure Report"
                          name="reportType"
                          errorMessage="Please this field is required"
                          value="Expenditure"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          />
                    </div>
                    <div className={classes.entry}>
                        <Input
                          inputType="select"
                          required={true}
                          id="category"
                          name="category"
                          reference={this.setRef}
                          options={this.state.reportType==='Income'?this.state.incomeCategories:this.state.expenseCategories}
                          value={this.state.category}
                          error={errorCategory}
                          type="select"
                          errorMessage="Please select a category"
                          label="Category"
                          placeholder="Category"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          />
                    </div>
                    {/*<div className={classes.entry}>
                        <Input
                          inputType="input"
                          type="number"
                          required={true}
                          reference={this.setRef}
                          value={this.state.amount}
                          name="amount"
                          id="amount"
                          error={errorAmount}
                          min="0"
                          errorMessage="Please this field is required"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Amount"
                          placeholder="Amount"/>
                    </div>*/}
                    <div className={classes.entry}>
                        <Input
                          inputType="input"
                          type="date"
                          required={true}
                          reference={this.setRef}
                          value={this.state.date}
                          name="date"
                          id="date"
                          error={errorDate}
                          errorMessage="Please this field is required"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Date"/>
                    </div>
                    <div className={classes.entry}>
                        <Input
                          required={true}
                          inputType="input"
                          id="description"
                          reference={this.setRef}
                          error={errorDescription}
                          value={this.state.description}
                          name="description"
                          type="text"
                          errorMessage="Please this field is required"
                          handleChange={(event)=>handleChange(event,this.hardSetState)}
                          label="Amount"
                          helperText="Type in the amount"
                          />
                    </div>
                </div>
            </div>
            <Divider className={classes.divider}/>
            <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
        </form>
    </Paper>)
    if(this.props.postFinanceStart) {
      view=<Spinner/>
    }
    return(
      <Grid
      item
      xs={12}
      md={12}>
      {notification}
          <Grid
          container
          spacing={0}
          justify="center">
            <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={5}>
                {view}
            </Grid>
          </Grid>
      </Grid>
    )
  }
}
const mapStateToProps= state=>({
  postFinanceStart:state.finance.postFinanceStart,
  postFinanceSuccess:state.finance.postFinanceSuccess,
  postFinanceFail:state.finance.postFinanceFail,
  branchId:state.auth.branchId,
  token:state.auth.token,
  reports:state.finance.reports
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(type,financeData)=> dispatch(financeAsync(type,financeData)),
  onUnmount:()=> dispatch(financeSync(actionTypes.RESET)),
  onUpdateReport:(type,financeData)=>dispatch(updateFinanceAsync(type,financeData))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FinanceReport));
