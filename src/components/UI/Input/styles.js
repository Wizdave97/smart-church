const styles = theme =>({
  formGroup:{
    width:'100%',
    position:'relative',
    display:'flex',
    flexWrap:'wrap',
    padding:'10px',
    boxSizing:'border-box',
  },
  error:{
    border: '1px solid red !important',
    boxShadow:'2px 2px 8px rgba(255,0,0,0.3), -2px -2px 8px rgba(255,0,0,0.4) !important'
  },
  container:{
      display: 'block',
      position: 'relative',
      cursor: 'pointer',
      fontSize: '22px',
      userSelect: 'none',
      '& input[type="checkbox"]':{
        position: 'absolute',
        opacity: 0,
        top:0,
        left:0,
        zIndex:100,
        cursor: 'pointer',
        height: 25,
        width: 25,
      },
      '& .checkmark':{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 25,
        width: 25,
        borderRadius:4,
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow:'2px 2px 8px rgba(0,0,0,0.1), -2px -2px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(0,0,0,0.1)',
        '&:after':{
          content:'\'\'',
          position:'absolute',
          display:'none',
        },
      },
      '&:hover input[type="checkbox"] ~ .checkmark':{
        backgroundColor:'rgba(0,0,0,0)'
      },
      '& input[type="checkbox"]:checked ~ .checkmark':{
        backgroundColor:theme.palette.primary.light
      },
      '& input[type="checkbox"]:checked ~ .checkmark:after':{
        display:'block'
      },
      '& .checkmark:after':{
        left: 6,
        top: 4,
        width: 8,
        height: 10,
        border: 'solid white',
        borderWidth: '0 2px 2px 0',
        transform: 'rotate(45deg)'
      },
      '& input[type="radio"]':{
        position: 'absolute',
        opacity: 0,
        top:0,
        left:0,
        zIndex:100,
        cursor: 'pointer',
        height: 25,
        width: 25,
      },
      '& .radiodot':{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 25,
        width: 25,
        borderRadius:'50%',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow:'2px 2px 8px rgba(0,0,0,0.1), -2px -2px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(0,0,0,0.1)',
        '&:after':{
          content:'\'\'',
          position:'absolute',
          display:'none',
        },
      },
      '&:hover input[type="radio"] ~ .radiodot':{
        backgroundColor:'rgba(0,0,0,0)'
      },
      '& input[type="radio"]:checked ~ .radiodot':{
        backgroundColor:theme.palette.primary.light
      },
      '& input[type="radio"]:checked ~ .radiodot:after':{
        display:'block'
      },
      '& .radiodot:after':{
        left: 7,
        top: 8,
        width: 8,
        height: 8,
        borderRadius:'50%',
        border: '4px solid white'
      }
  },

  formInput:{
    width:'100%',
    marginTop:theme.spacing(0.5),
    marginBottom:theme.spacing(0.5),
    backgroundColor:'#fff',
    fontSize:'12px',
    color:'rgba(0,0,0,0.6)',
    padding:' 12px 20px',
    margin:' 8px 0',
    display:' inline-block',
    border: '4px solid rgba(0,0,0,0.1)',
    borderRadius:' 8px',
    boxSizing: 'border-box',
    boxShadow:'2px 2px 8px rgba(0,0,0,0.1), -2px -2px 8px rgba(0,0,0,0.1)',
    '&:hover':{
      backgroundColor:'#f1f1f1',
      boxShadow:'2px 2px 8px rgba(0,0,0,0.2), -2px -2px 8px rgba(0,0,0,0.2)',
    },
    '&:focus':{
      outline:'none',
      boxShadow:`2px 2px 8px rgba(0,0,0,0.2), -2px -2px 8px rgba(0,0,0,0.2)`,
      color:'black'
    }
  },
  textarea:{
    width:'100%',
    marginTop:theme.spacing(0.5),
    marginBottom:theme.spacing(0.5),
    backgroundColor:'#fff',
    fontSize:'12px',
    color:'rgba(0,0,0,0.6)',
    padding:' 12px 20px',
    margin:' 8px 0',
    display:' inline-block',
    border: '4px solid rgba(0,0,0,0.1)',
    borderRadius:' 8px',
    boxSizing: 'border-box',
    boxShadow:'2px 2px 8px rgba(0,0,0,0.1), -2px -2px 8px rgba(0,0,0,0.1)',
    resize:'none',
    '&:hover':{
      backgroundColor:'#f1f1f1',
      boxShadow:'2px 2px 8px rgba(0,0,0,0.2), -2px -2px 8px rgba(0,0,0,0.2)',
    },
    '&:focus':{
      outline:'none',
      boxShadow:'2px 2px 8px rgba(0,0,0,0.2), -2px -2px 8px rgba(0,0,0,0.2)',
      color:'black'
    }
  },
  label:{
    width:'90%',
    marginBottom:theme.spacing(0.5),
    fontSize:'12px',
    alignSelf:'center',
    top:0,
    left:0
  },
  helperText:{
    width:'100%',
    textAlign:'left',
    fontSize:'9.5px',
    display:'block',
    marginTop:theme.spacing(0.5),
    color:'rgba(0,0,0,0.5)'
  },
  errorText:{
    width:'100%',
    textAlign:'left',
    fontSize:'9.5px',
    display:'block',
    marginTop:theme.spacing(0.5),
    color:theme.palette.error.main
  }
})
export default styles
