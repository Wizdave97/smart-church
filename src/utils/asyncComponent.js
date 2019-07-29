import React, { Component } from 'react';
import Spinner from '../components/UI/Spinner/Spinner';

const asyncComponent = (importComponent) =>{

  return class extends Component {
    state={
      C:null
    }
    componentDidMount(){
      importComponent().then(cmp=>{
        this.setState({
          C:cmp.default
        })
      })
    }

    render(){
      const { C } = this.state
      return C ? <C {...this.props}/>:<Spinner/>
    }
  }
}

export default asyncComponent;
