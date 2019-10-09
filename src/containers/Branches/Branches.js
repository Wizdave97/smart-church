import React, { Component } from 'react';
import styles from  './styles';
import { withStyles } from '@material-ui/core/styles';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, Visibility, Edit } from '@material-ui/icons';
import * as actionTypes  from '../../store/actions/actionTypes';
import { branchSync, fetchBranchAsync } from '../../store/actions/branchActions';
import { changeBranchId } from '../../store/actions/authActions';
import { handleChange,submitHandler} from '../../utils/Utility';
import Snackbar from '../../components/NotificationSnackbar/NotificationSnackbar';
import { Paper, Grid, Typography, Button,LinearProgress,Card,CardHeader,Avatar, CardActions,CardContent} from '@material-ui/core';


class Branches extends Component {
  state={
    states:null,
    fixValidityBug:'',
    errorBranchState:false,
    branchState:''
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
      this.props.onFetchBranches()
  }
  componentWillUnmount(){
    this.props.onUnmount()
  }
  onSubmit = (references,hardSetState,e)=>{
    e.preventDefault();
    let valid= submitHandler(references, hardSetState)
    if (valid){
      this.props.onFetchBranches()
    }
  }
  onChangePage= (url)=>{
    if (url==null) return
    this.props.onFetchBranches(url)
  }
  render(){
    const { classes }= this.props
    const references=[this.branchState]
    let notification=null;
    if (this.props.fetchBranchesSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.fetchBranchesSuccess} message={"Branches fetched successfully"}/>
    }
    if (this.props.fetchBranchesFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.fetchBranchesFail} message={"There was an error fetching click the filter button to try again"}/>
    }
    if (this.props.deleteBranchSuccess){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.deleteBranchSuccess} message={"Branch successfully deleted, reload to see changes"}/>
    }
    if (this.props.deleteBranchFail) {
      notification=<Snackbar color="error" handleClose={this.props.onUnmount} open={this.props.deleteBranchFail} message={"There was an error deleting, Please try again"}/>
    }
    let view=null
    let progress=null
    if(this.props.fetchBranchesStart){
      progress=<LinearProgress color="secondary"/>
    }
    if (this.props.changeBranchId){
      notification=<Snackbar color="primary" handleClose={this.props.onUnmount} open={this.props.changeBranchId} message={"Now viewing selected branch"}/>
    }
    if(this.props.fetchBranchesSuccess || this.props.branches){
      view=(
        this.props.branches.map((data,index)=>{
          if(data.status.toLowerCase()==='active'){
            return(
              <Grid item xs={12} sm={4} lg={3} key={index}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {index+1}
                      </Avatar>
                    }
                    title={data.name}
                    subheader={data.state}
                    />
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Email: {data.email}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      LGA : {data.lga}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Street: {data.street}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Province: {data.province?data.province.name:null}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Area: {data.area?data.area.name:null}
                    </Typography>
                  </CardContent>
                  <CardActions style={{flexWrap:'wrap',display:'flex'}}>
                    {this.props.permissions.indexOf(8)>=0?
                      <Button component={Link} to={`/analytics`} onClick={()=>this.props.onChangeBranch(data.id,data.name)} variant="contained" size="small" aria-label="inspect branch"><Visibility color="primary"/></Button>
                      :null}
                    {this.props.permissions.indexOf(3)>=0?
                      <React.Fragment>
                      <Button variant="contained" component={Link} to={`/addbranch/${data.id}`}  size="small" aria-label="edit branch"><Edit color="secondary"/></Button>
                      <Button onClick={()=>this.props.toggleModal(data.id,'branch')} variant="contained" size="small" aria-label="delete branch"><Delete color="error"/></Button>
                      </React.Fragment>:null}
                  </CardActions>
                </Card>
              </Grid>
            )
          }
        })
      )
    }
    if(this.props.fetchBranchesFail){
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
          <Paper>
            <form className={classes.filters} noValidate={true} onSubmit={(event)=>this.onSubmit(references,this.hardSetState,event)} >
              <div className={classes.entry}>
              <Input
                inputType="select"
                required={true}
                options={this.state.states}
                reference={this.setRef}
                name="branchState"
                value={this.state.branchState}
                error={this.state.errorBranchState}
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
          <Grid item><Typography variant="body1" align="center">Page {this.props.current_page} of {this.props.total}</Typography></Grid>
          <Grid item>  <Button onClick={()=>this.onChangePage(this.props.next)} size="small" variant="contained" color="secondary" disabled={this.props.next==null?true:false}>Next</Button></Grid>
          </Grid>
      </Grid>
      </div>
    )
  }
}
const mapStateToProps= state=>({
  branchId:state.auth.branchId,
  permissions:state.auth.permissions,
  fetchBranchesStart:state.branch.fetchBranchesStart,
  fetchBranchesSuccess:state.branch.fetchBranchesSuccess,
  fetchBranchesFail:state.branch.fetchBranchesFail,
  deleteBranchStart:state.branch.deleteBranchStart,
  deleteBranchSuccess:state.branch.deleteBranchSuccess,
  deleteBranchFail:state.branch.deleteBranchFail,
  total:state.branch.total,
  branches:state.branch.branches,
  first:state.branch.first,
  current_page:state.branch.current_page,
  next:state.branch.next,
  prev:state.branch.prev,
  changeBranchId:state.auth.changeBranchId
})
const mapDispatchToProps = dispatch =>({
  onFetchBranches:(url)=> dispatch(fetchBranchAsync(url)),
  onUnmount:()=> dispatch(branchSync(actionTypes.RESET)),
  onChangeBranch:(id,name)=>dispatch(changeBranchId(id,name))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Branches))
