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
  checkbox:{
    maxWidth:'48px',
    borderRadius:' 4px',
    margin:' 8px 0',
    alignSelf:'center',
    display:' inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding:' 12px 20px',
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
