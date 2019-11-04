import React, { Component, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper,Typography,Button,CircularProgress,Slide,Dialog,DialogContent, DialogContentText,DialogTitle,DialogActions} from '@material-ui/core';
import styles from './styles';
import { connect } from 'react-redux';
import baseUrl from '../../store/base_url';
import * as actionTypes  from '../../store/actions/actionTypes';
import SettingsList from '../../components/SettingsList/SettingsList';
import { settingsAsync, settingsSync }  from '../../store/actions/settingsActions';
import EditableList from '../../components/EditableList/EditableList';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



class Settings extends Component {
  state={
    incomeStreams:[],
    expenditureStreams:[],
    staffTypes:[],
    new_income_type:'',
    new_expenditure_type:'',
    new_staff_type:'',
    fetchedStaffTypes:null,
    fetchedIncomeTypes:null,
    fetchedExpenditureTypes:null,
    fetchStaffTypesSuccess:false,
    fetchExpenditureTypesSuccess:false,
    fetchIncomeTypesSuccess:false,
    openModal:false,
    identifier:null,
    id:null
  }
  componentDidMount(){
    this.fetchSettings()
  }
  fetchSettings=()=>{
    fetch(baseUrl+'/types',{
      headers:{
        'Content-Type':"application/json",
        'Authorization':"Bearer"+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      this.setState({fetchedStaffTypes:res.data,fetchStaffTypesSuccess:true})
    }).catch(err=>console.log(err))
    fetch(baseUrl+'/inmedium',{
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer'+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      this.setState({fetchedIncomeTypes:res.data,fetchIncomeTypesSuccess:true})
    }).catch(err=> console.log(err))
    fetch(baseUrl+'/expenses',{
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer'+this.props.token
      }
    }).then(res=>res.json()).then(res=>{
      this.setState({fetchedExpenditureTypes:res.data,fetchExpenditureTypesSuccess:true})
    }).catch(err=> console.log(err))
  }
  toggleModal=async (id=null,identifier=null,confirm=null)=>{
    await this.setState(state=>({
      openModal:!state.openModal,
      identifier:identifier,
      id:id
    }))
    if(identifier && confirm) return this.deleteItem(this.state.identifier,this.state.id)
    else return new Promise((resolve,reject)=>reject(false))
  }
  deleteItem= (identifier,id) =>{
    switch(identifier) {
      case 'income':
          return new Promise((resolve,reject)=>{
            fetch(baseUrl+'/inmedium/'+id,{
              method:'DELETE',
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+this.props.token
              },
            }).then(res=>res.json()).then(res=>{
              this.fetchSettings()
              resolve(true)

            }).catch(err=>{
              reject(false)
            })
          })
      case 'expenditure':
          return new Promise((resolve,reject)=>{
            fetch(baseUrl+'/expenses/'+id,{
              method:'DELETE',
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer'+this.props.token
              },
            }).then(res=>res.json()).then(res=>{
              this.fetchSettings()
              resolve(true)
            }).catch(err=>reject(false))
          })
      case 'stafftype':
          return new Promise((resolve,reject)=>{
            fetch(baseUrl+'/types/'+id,{
              method:'DELETE',
              headers:{
                'Content-Type':"application/json",
                'Authorization':"Bearer"+this.props.token
              },
            }).then(res=>res.json()).then(res=>{
              this.fetchSettings()
              resolve(true)
            }).catch(err=>reject(false))
          })
      default: return new Promise(resolve=>resolve(false))
         break;
    }
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
    let modal=(
      <Dialog
        open={this.state.openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.toggleModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirmation?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toggleModal} color="primary">
            No
          </Button>
          <Button onClick={()=>this.toggleModal(this.state.id,this.state.identifier,true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
    if(this.props.postSettingsIncomeStart) viewIncomeProgress=<CircularProgress color="primary"/>
    if(this.props.postSettingsTypesStart) viewTypesProgress=<CircularProgress color="primary"/>
    if(this.props.postSettingsExpenditureStart) viewExpenditureProgress=<CircularProgress color="primary"/>
    let viewIncome=(
      <Fragment>
      <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Income Types</Typography></div>
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
      <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Expenditure Types</Typography></div>
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
      <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Staff Types</Typography></div>
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
      <div className={classes.submit}><Button disabled={this.props.postSettingsTypesStart} onClick={()=>this.props.onSubmitHandler('type',staffTypes)} color="secondary" variant="contained" size="large">Submit{viewTypesProgress}</Button></div>
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
              <Grid
              item
              xs={12}>
              <Paper square={true} className={classes.paper}>
                <div className={classes.category}>
                    <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Income Types</Typography></div>
                    {this.state.fetchIncomeTypesSuccess?<SettingsList deleteItem={this.toggleModal} success={this.state.fetchIncomeTypesSuccess} data={this.state.fetchedIncomeTypes} identifier="income"/>:<CircularProgress color="secondary"/>}
                </div>
                <div className={classes.category}>
                    <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Expenditure Types</Typography></div>
                    {this.state.fetchExpenditureTypesSuccess?<SettingsList deleteItem={this.toggleModal}  success={this.state.fetchExpenditureTypesSuccess} data={this.state.fetchedExpenditureTypes} identifier="expenditure"/>:<CircularProgress color="secondary"/>}
                </div>
                <div className={classes.category}>
                    <div className={classes.title}><Typography variant="h4" color="secondary" align='left' gutterBottom>Staff Types</Typography></div>
                    {this.state.fetchStaffTypesSuccess?<SettingsList deleteItem={this.toggleModal} success={this.state.fetchStaffTypesSuccess} data={this.state.fetchedStaffTypes} identifier="stafftype"/>:<CircularProgress color="secondary"/>}
                </div>
              </Paper>
              </Grid>
          </Grid>
          {modal}
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
  postSettingsTypesFail:state.settings.postSettingsTypesFail,
  token:state.auth.token
})

const mapDispatchToProps= dispatch=>({
  onSubmitHandler:(types,data)=> dispatch(settingsAsync(types,data)),
  onUnmount:()=> dispatch(settingsSync(actionTypes.RESET))
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Settings));
