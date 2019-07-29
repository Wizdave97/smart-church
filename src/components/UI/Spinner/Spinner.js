import React from 'react';
import classes from './spinner.module.css'

const spinner = props =>{

  return (
    <div className={classes.container}>
        <div className={classes['lds-facebook']}>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>

  )
}

export default spinner
