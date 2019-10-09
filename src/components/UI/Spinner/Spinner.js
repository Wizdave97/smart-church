import React from 'react';
import classes from './spinner.module.css'
import { Paper } from '@material-ui/core'
const spinner = props =>{

  return (
    <div className={classes.container}>
        <Paper className={classes['lds-facebook']}>
          <div></div>
          <div></div>
          <div></div>
        </Paper>
    </div>

  )
}

export default spinner
