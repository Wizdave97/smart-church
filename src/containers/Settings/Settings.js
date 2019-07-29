import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper,Typography,Button } from '@material-ui/core';
import styles from './styles';
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
  render(){
    const { classes } = this.props
    return(
      <div className={classes.wrapper} style={{padding:32}}>
          <Grid
          container
          spacing={8}
          justify="flex-start">
              <Grid
              item
              xs={12}>
                  <Paper square={true} className={classes.paper}>
                        <div className={classes.category}>
                            <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Income Categories</Typography></div>
                            <EditableList label="Add Income type" removeItem={this.removeItemCategory} handleChange={this.handleChange} list={this.state.incomeStreams} identifier="income" value={this.state.new_income_type} addItem={this.addItemCategory}/>
                        </div>
                        <div className={classes.category}>
                            <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Expenditure Categories</Typography></div>
                            <EditableList label="Add Expenditure type" removeItem={this.removeItemCategory} handleChange={this.handleChange} list={this.state.expenditureStreams} identifier="expenditure" value={this.state.new_expenditure_type} addItem={this.addItemCategory}/>
                        </div>
                        <div className={classes.category}>
                            <div className={classes.title}><Typography variant="h2" color="secondary" align='left' gutterBottom>Staff Types</Typography></div>
                            <EditableList label="Add Staff type" removeItem={this.removeItemCategory} handleChange={this.handleChange} list={this.state.staffTypes} identifier="staffType" value={this.state.new_staff_type} addItem={this.addItemCategory}/>
                        </div>
                        <div className={classes.submit}><Button color="secondary" variant="contained" size="large">Submit</Button></div>
                  </Paper>
              </Grid>
          </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Settings);
