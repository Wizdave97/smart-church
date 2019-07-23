import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Input = props =>{
  /*
  props:
  inputType
  required
  name
  value
  placeholder
  type
  id
  error
  helperText
  */
  const { classes } = props
  let inputType=null
    switch(props.inputType){
      case 'input':
          inputType=(<input
              noValidate={true}
              required={props.required}
              name={props.name}
              aria-describedby="helperText"
              value={props.value}
              placeholder={props.placeholder}
              className={classes.formInput}
              type={props.type}
              id={props.id}
              onChange={props.handleChange(props.name)}/>)
          break;
      case 'select':
          inputType=(
            <select
            noValidate={true}
            required={props.required}
            name={props.name}
            aria-describedby="helperText"
            value={props.value}
            placeholder={props.placeholder}
            className={classes.formInput}
            type={props.type}
            id={props.id}
            onChange={props.handleChange(props.name)}>
              <option value="">select</option>
              {props.options?props.options.map((option,index)=>{
                return(
                  <option key={index} value={option}>{option}</option>
                )
              }):null}
            </select>)
            break;
        }

  return (
    <div className={classes.formGroup}>
        <label className={classes.label} htmlFor={props.id}>{props.label}</label>
          {inputType}
        {props.helperText||props.error?<span id="helperText" className={props.error?classes.errorText:classes.helperText}>{props.error?props.errorMessage:props.helperText}</span>:null}
    </div>
  )
}

export default withStyles(styles)(Input)
