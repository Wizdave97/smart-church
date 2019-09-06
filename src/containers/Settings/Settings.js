import React, { Component, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper,Typography,Button,CircularProgress } from '@material-ui/core';
import styles from './styles';
import { connect } from 'react-redux';
import * as actionTypes  from '../../store/actions/actionTypes';
import { settingsAsync, settingsSync }  from '../../store/actions/settingsActions';


import EditableList from '../../components/EditableList/EditableList';

class Settings extends Component {
  state={
    incomeStreams:[],
    expenditureStreams:[],
    staffTypes:[],
    new_income_type:'',
    new_expenditure_type:'',
    new_staff_type:''
  }
  addItemCategory= (identifier) =>{

    switch(identifier) {
      case 'income':
          if(!this.state.new_income_type) return
          this.setState(state=>{
            let tempState=[...state.incomeStreams]
            tempState.push(state.new_income_type)
            return{incomeStreams:tempState}
          })
          break;
      case 'expenditure':
          if(!this.state.new_expenditure_type) return
          this.setState(state=>{
            let tempState=[...state.expenditureStreams]
            tempState.push(state.new_expenditure_type)
            return {expenditureStreams:tempState}
          })
          break;
      case 'staffType':
          if(!this.state.new_staff_type) return
          this.setState(state=>{
            let tempState=[...state.staffTypes]
            tempState.push(state.new_staff_type)
            return {staffTypes:tempState}
          })
          break;
      default:
         break;
    }
  }
  removeItemCategory= (identifier,item) =>{

    switch(identifier) {
      case 'income':
          this.setState(state=>{
            let tempState=[...state.incomeStreams]
            let index=tempState.indexOf(item)
            tempState.splice(index,1)
            return{incomeStreams:tempState}
          })
          break;
      case 'expenditure':
          this.setState(state=>{
            let tempState=[...state.expenditureStreams]
            let index=tempState.indexOf(item)
            tempState.splice(index,1)
            return{expenditureStreams:tempState}
          })
          break;
      case 'staffType':
          this.setState(state=>{
            let tempState=[...state.staffTypes]
            let index=tempState.indexOf(item)
            tempState.splice(index,1)
            return{staffTypes:tempState}
          })
          break;
      default:
         break;
    }
  }
  handleChange = identifier=> event=>{
    switch(identifier) {
      case 'income':
          this.setState({new_income_type:event.target.value})
          break;
      case 'expenditure':
          this.setState({new_expenditure_type:event.target.value})
          break;
      case 'staffType':
          this.setState({new_staff_type:event.target.value})
          break;
      default:
          break;
    }
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  render(){
    const { classes } = this.props
    const { incomeStreams,expenditureStreams,staffTypes }=this.state
    let viewExpenditureProgress,viewIncomeProgress,viewTypesProgress
    if(this.props.postSettingsIncomeStart) viewIncomeProgress=<CircularProgress color="primary"/>
    if(this.props.postSettingsTypesStart) viewTypesProgress=<CircularProgress color="primary"/>
    if(this.props.postSettingsExpenditureStart) viewExpenditureProgress=<CircularProgress color="primary"/>
    let viewIncome=(
      <Fragment>
      <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Income Categories</Typography></div>
      <EditableList
        label="Add Income type" removeItem={this.removeItemCategory}
        handleChange={this.handleChange} list={this.state.incomeStreams}
        identifier="income"
        value={this.state.new_income_type}
        addItem={this.addItemCategory}
        success={this.props.postSettingsIncomeSuccess}
        fail={this.props.postSettingsIncomeFail}
        handleClose={this.props.onUnmount}/>
      <div className={classes.submit}><Button disabled={this.props.postSettingsIncomeStart} onClick={()=>this.props.onSubmitHandler('income',incomeStreams)} color="secondary" variant="contained" size="large">Submit{viewIncomeProgress}</Button></div>
      </Fragment>
  )
    let viewExpenditure=(
      <Fragment>
      <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Expenditure Categories</Typography></div>
      <EditableList
        label="Add Expenditure type"
        removeItem={this.removeItemCategory}
        handleChange={this.handleChange}
        list={this.state.expenditureStreams}
        identifier="expenditure"
        value={this.state.new_expenditure_type}
        addItem={this.addItemCategory}
        success={this.props.postSettingsExpenditureSuccess}
        fail={this.props.postSettingsExpenditureFail}
        handleClose={this.props.onUnmount}/>
      <div className={classes.submit}><Button disabled={this.props.postSettingsExpenditureStart} onClick={()=>this.props.onSubmitHandler('expenditure',expenditureStreams)} color="secondary" variant="contained" size="large">Submit{viewExpenditureProgress}</Button></div>
      </Fragment>
  )
    let viewTypes=(
      <Fragment>
      <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Staff Types</Typography></div>
      <EditableList
        label="Add Staff type"
        removeItem={this.removeItemCategory}
        handleChange={this.handleChange}
        list={this.state.staffTypes}
        identifier="staffType"
        value={this.state.new_staff_type}
        addItem={this.addItemCategory}
        success={this.props.postSettingsTypesSuccess}
        fail={this.props.postSettingsTypesFail}
        handleClose={this.props.onUnmount}/>
      <div className={classes.submit}><Button disabled={this.props.postSettingsTypesStart} onClick={()=>this.props.onSubmitHandler('types',staffTypes)} color="secondary" variant="contained" size="large">Submit{viewTypesProgress}</Button></div>
      </Fragment>
  )

    return(
      <div className={classes.wrapper} style={{padding:16}}>
          <Grid
          container
          spacing={4}
          justify="flex-start">
              <Grid
              item
              xs={12}>
              <Paper square={true} className={classes.paper}>
                    <div className={classes.category}>
                        {viewIncome}
                    </div>
                    <div className={classes.category}>
                        {viewExpenditure}
                    </div>
                    <div className={classes.category}>
                        {viewTypes}
                    </div>

              </Paper>
              </Grid>
          </Grid>
      </div>
    )
  }
}
const mapStateToProps= state=>({
  postSettingsIncomeStart:state.settings.postSettingsIncomeStart,
  postSettingsIncomeSuccess:state.settings.postSettingsIncomeSuccess,
  postSettingsIncomeFail:state.settings.postSettingsIncomeFail,
  postSettingsExpenditureStart:state.settings.postSettingsExpenditureStart,
  postSettingsExpenditureSuccess:state.settings.postSettingsExpenditureSuccess,
  postSettingsExpenditureFail:state.settings.postSettingsExpenditureFail,
  postSettingsTypesStart:state.settings.postSettingsTypesStart,
  postSettingsTypesSuccess:state.settings.postSettingsTypesSuccess,
  postSettingsTypesFail:state.settings.postSettingsTypesFail
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(types,data)=> dispatch(settingsAsync(types,data)),
  onUnmount:()=> dispatch(settingsSync(actionTypes.RESET))
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Settings));
