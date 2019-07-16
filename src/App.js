import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';


class App  extends Component{
  render(){
    const theme=createMuiTheme(this.props.theme)
    return (
        <MuiThemeProvider theme={theme}>
            <Layout></Layout>
        </MuiThemeProvider>
    )
  }
}
const mapStateToProps= state =>({
  theme:state.theme
})
export default connect(mapStateToProps)(App);
