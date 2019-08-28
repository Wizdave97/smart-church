import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Delete, Visibility } from '@material-ui/icons';
import * as actionTypes  from '../../store/actions/actionTypes';
import { staffSync, fetchStaffsAsync } from '../../store/actions/staffActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography, Button, Table, TableCell, TableRow, TableBody, TableHead,LinearProgress} from '@material-ui/core'


class Staffs extends Component {
  state={
    states:null,
    fixValidityBug:'',
    staffState:'',
    errorStaffState:false
  }

  hardSetState=this.setState.bind(this)
  setRef= element =>{
    if(element){
      this[element.name]=element;
    }
  }
  componentDidMount(){
    this.setState({fixValidityBug:''})
    fetch('./assets/states.json').then(resp=>resp.json()).then(data=>{
      const states=[]
      for(let obj of data){
        let name=obj.state.name
        states.push(name)
      }
      this.setState({
        states:states,
      })
    }).catch(err=> console.log(err))
    this.props.onFetchStaffs(this.props.branchId)
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      this.props.onFetchStaffs()
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchStaffs(url)
  }
  render(){
    const { classes }= this.props
    const references=[this.staffState]
    let notification=null;
    if (this.props.fetchStaffsSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.fetchStaffsSuccess} message={"Reports fetched successfully"}/>
    }
    if (this.props.fetchStaffsFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.fetchStaffsFail} message={"There was an error fetching click the filter button to try again"}/>
    }
    let view=null
    let progress=null
    if(this.props.fetchStaffsStart){
      progress=<LinearProgress color="secondary"/>
    }
    if(this.props.fetchStaffsSuccess || this.props.staffs){
      view=(
        this.props.staffs.map((data,index)=>{
          return(
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{data.firstname}</TableCell>
              <TableCell>{data.lastname}</TableCell>
              <TableCell>{data.address}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.sex}</TableCell>
              <TableCell><Button variant="contained" size="small" aria-label="inspect branch"><Visibility color="primary"/></Button></TableCell>
              <TableCell><Button variant="contained" size="small" aria-label="delete branch"><Delete color="error"/></Button></TableCell>
            </TableRow>
          )
        })
      )
    }
    if(this.props.fetchStaffsFail){
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
                  required={true}
                  options={this.state.states}
                  reference={this.setRef}
                  name="staffState"
                  value={this.state.staffState}
                  error={this.state.errorStaffState}
                  handleChange={(event)=>handleChange(event,this.hardSetState)}
                  label="Select State"
                /></div>
              <div className={classes.entry}><Button className={classes.button} type="submit" size="medium" color="secondary" variant="outlined">Apply Filters</Button></div>
              </form>
              <div className={classes.tableWrapper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Sex</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {view}
                  <TableRow>
                    <TableCell><Button onClick={()=>this.onChangePage(this.props.prev)} size="small" variant="contained" color="secondary" disabled={this.props.prev==null?true:false}>Previous</Button></TableCell>
                    <TableCell><Typography variant="body1" align="center">Page {this.props.current_page}, Number of Rows:{this.props.total}</Typography></TableCell>
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
  branchId:state.auth.branchId,
  fetchStaffsStart:state.staff.fetchStaffsStart,
  fetchStaffsSuccess:state.staff.fetchStaffsSuccess,
  fetchStaffsFail:state.staff.fetchStaffsFail,
  total:state.staff.total,
  staffs:state.staff.staffs,
  first:state.staff.first,
  current_page:state.staff.current_page,
  next:state.staff.next,
  prev:state.staff.prev
})
const mapDispatchToProps = dispatch =>({
  onFetchStaffs:()=> dispatch(fetchStaffsAsync()),
  onUnmount:()=> dispatch(staffSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Staffs))
