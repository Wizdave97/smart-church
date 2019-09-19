import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import * as actionTypes  from '../../store/actions/actionTypes';
import { staffSync, fetchStaffsAsync } from '../../store/actions/staffActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography, Button,Card,CardHeader,Avatar, CardActions,CardContent, TableHead,LinearProgress} from '@material-ui/core'


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
      for(let obj of data.data){
        let name=obj.state.name
        states.push(name)
      }
      this.setState({
        states:states,
      })
    }).catch(err=> console.log(err))
    this.props.onFetchStaffs()
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
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.fetchStaffsSuccess} message={"Staff Data fetched successfully"}/>
    }
    if (this.props.fetchStaffsFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.fetchStaffsFail} message={"There was an error fetching click the filter button to try again"}/>
    }
    if (this.props.deleteStaffSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.deleteStaffSuccess} message={"Staff successfully deleted, reload to see changes"}/>
    }
    if (this.props.deleteStaffFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.deleteStaffFail} message={"There was an error deleting, Please try again"}/>
    }
    let view=null
    let progress=null
    if(this.props.fetchStaffsStart){
      progress=<LinearProgress color="secondary"/>
    }
    if(this.props.fetchStaffsSuccess || this.props.staffs){
      view=(
        this.props.staffs.map((data,index)=>{
          if(data.status.toLowerCase()==='active') {
            return(
              <Grid item xs={12} sm={4} lg={3} key={index}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {index+1}
                      </Avatar>
                    }
                    title={data.firstname}
                    subheader={data.lastname}
                    />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Address:{data.address}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Email: {data.email}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Sex: {data.sex}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" component={Link} to={`/addstaff/${data.id}`}  size="small" aria-label="Edit Staff"><Edit color="primary"/></Button>
                    <Button onClick={()=>this.props.toggleModal(data.id,'staff')} variant="contained" size="small" aria-label="delete branch"><Delete color="error"/></Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          }
        })
      )
    }
    if(this.props.fetchStaffsFail){
      view=null
    }

    return(
      <div style={{padding:4,width:'100%',margin:0}}>
      <Grid
      container
      item
      xs={12}
      spacing={2}
      justify="flex-start">
        <Grid item xs={12}>
          {progress}
          {notification}
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
          <Grid item><Typography variant="body1" align="center">Page {this.props.current_page}, total entries:{this.props.total}</Typography></Grid>
          <Grid item><Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button></Grid>
          </Grid>
      </Grid>
      </div>
    )
  }
}
const mapStateToProps= state=>({
  branchId:state.auth.branchId,
  fetchStaffsStart:state.staff.fetchStaffsStart,
  fetchStaffsSuccess:state.staff.fetchStaffsSuccess,
  fetchStaffsFail:state.staff.fetchStaffsFail,
  deleteStaffStart:state.staff.deleteStaffStart,
  deleteStaffSuccess:state.staff.deleteStaffSuccess,
  deleteStaffFail:state.staff.deleteStaffFail,
  total:state.staff.total,
  staffs:state.staff.staffs,
  first:state.staff.first,
  current_page:state.staff.current_page,
  next:state.staff.next,
  prev:state.staff.prev
})
const mapDispatchToProps = dispatch =>({
  onFetchStaffs:(url)=> dispatch(fetchStaffsAsync(url)),
  onUnmount:()=> dispatch(staffSync(actionTypes.RESET))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Staffs))
