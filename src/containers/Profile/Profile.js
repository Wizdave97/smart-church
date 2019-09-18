import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';



class Profile extends Component {
  state={

  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    const { classes } = this.props
    return(

    )
  }
}
const mapStateToProps= state =>({

})

const mapDispatchToProps = dispatch=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile))
