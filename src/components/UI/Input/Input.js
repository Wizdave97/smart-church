import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes  from 'prop-types';

const Input = props =>{
  /*
  props:
  min
  max
  pattern
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
              required={props.required}
              name={props.name}
              ref={props.reference?props.reference:null}
              pattern={props.pattern?props.pattern:null}
              max={props.max?props.max:''}
              aria-describedby="helperText"
              value={props.value}
              placeholder={props.placeholder}
              className={[classes.formInput,props.error?classes.error:''].join(' ')}
              type={props.type}
              id={props.id}
              min={props.min?props.min:''}
              onChange={props.handleChange}/>)
          break;
      case 'select':
          inputType=(
            <select
            required={props.required}
            name={props.name}
            ref={props.reference?props.reference:null}
            aria-describedby="helperText"
            value={props.value}
            placeholder={props.placeholder}
            className={[classes.formInput,props.error?classes.error:''].join(' ')}
            type={props.type}
            id={props.id}
            onChange={props.handleChange}>
              <option value="">select</option>
              {props.options?props.options.map((option,index)=>{
                return(
                  <option key={index} value={option}>{option}</option>
                )
              }):null}
            </select>)
            break;
        case 'checkbox':
            inputType=(<input
                ref={props.reference?props.reference:null}
                required={props.required}
                name={props.name}
                aria-describedby="helperText"
                value={props.value}
                placeholder={props.placeholder}
                className={[classes.checkbox,props.error?classes.error:''].join(' ')}
                type="checkbox"
                id={props.id}
                onChange={props.handleChange}/>)
                break;
         case 'radio':
             inputType=(<input
                 ref={props.reference?props.reference:null}
                 required={props.required}
                 name={props.name}
                 aria-describedby="helperText"
                 value={props.value}
                 placeholder={props.placeholder}
                 className={[classes.checkbox,props.error?classes.error:''].join(' ')}
                 type="radio"
                 id={props.id}
                 onChange={props.handleChange}/>)
                 break;
          case 'textarea':
                inputType=(
                  <textarea
                    rows="3"
                    ref={props.reference?props.reference:null}
                    className={[classes.textarea,props.error?classes.error:''].join(' ')}
                    required={props.required}
                    name={props.name}
                    aria-describedby={props.name+"helperText"}
                    value={props.value}
                    placeholder={props.placeholder}
                    type={props.type}
                    id={props.id}
                    onChange={props.handleChange}></textarea>
                )
                break;
            default:
                break;
        }

  return (
    <div className={classes.formGroup}>
        <label className={classes.label} htmlFor={props.id}>{props.label}</label>
          {inputType}
        {props.helperText||props.error?<span id={props.name+"helperText"} className={props.error?classes.errorText:classes.helperText}>{props.error?props.errorMessage:props.helperText}</span>:null}
    </div>
  )
}

Input.propTypes={
  min:PropTypes.string,
  max:PropTypes.string,
  pattern:PropTypes.string,
  required:PropTypes.bool.isRequired,
  name:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired||PropTypes.bool.isRequired,
  placeholder:PropTypes.string,
  type:PropTypes.string.isRequired,
  inputType:PropTypes.string.isRequired,
  handleChange:PropTypes.func.isRequired,
  id:PropTypes.string.isRequired,
  error:PropTypes.bool.isRequired,
  helperText:PropTypes.string,
  label:PropTypes.string.isRequired
}

export default withStyles(styles)(Input)
