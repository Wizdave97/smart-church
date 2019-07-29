import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Input from '../../components/UI/Input/Input';
import { Grid, Paper, Typography, Divider, Button} from '@material-ui/core';
import { handleChange,submitHandler} from '../../utils/Utility';
import formSerialize from 'form-serialize';

class FinanceReport extends Component {
  state={
    reportType:'',
    category:'',
    date:'',
    amount:'',
    description:'',
    errorReportType:false,
    errorCategory:false,
    errorDate:false,
    errorDescription:false,
    errorAmount:false,
    fixValidityBug:''
  }
  componentDidMount(){
    this.setState({fixValidityBug:''})
  }
  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidUpdate(prevProps,prevState){

  }

  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      let form= document.querySelector('form')
      let authData=formSerialize(form,{hash:true})
      console.log(authData)
    }
  }

  render(){
    const references=[this.reportType,this.category,this.amount,this.description,this.date]
    const {errorReportType,errorDate,errorCategory,errorDescription,errorAmount }=this.state
    const { classes }=this.props

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
            xs={12}
            sm={8}>
                <Paper square={true} elevation={4} className={classes.paper}>
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
                                      options={[]}
                                      value={this.state.category}
                                      error={errorCategory}
                                      type="select"
                                      errorMessage="Please select a category"
                                      label="Category"
                                      placeholder="Category"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      />
                                </div>
                                <div className={classes.entry}>
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
                                </div>
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
                                      inputType="textarea"
                                      id="description"
                                      reference={this.setRef}
                                      error={errorDescription}
                                      value={this.state.description}
                                      name="description"
                                      type="text"
                                      errorMessage="Please this field is required"
                                      handleChange={(event)=>handleChange(event,this.hardSetState)}
                                      label="Description"
                                      helperText="Brief description of the expense or income"
                                      />
                                </div>
                            </div>
                        </div>
                        <Divider className={classes.divider}/>
                        <div className={classes.button}><Button type="submit" color="secondary" variant="contained" fullWidth={true}>Submit</Button></div>
                    </form>
                </Paper>
            </Grid>
          </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(FinanceReport);
