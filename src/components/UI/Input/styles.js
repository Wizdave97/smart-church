const styles = theme =>({
  formGroup:{
    width:'100%',
    position:'relative',
    display:'flex',
    flexWrap:'wrap',
    padding:'10px',
    boxSizing:'border-box',
  },
  checkbox:{
    maxWidth:'48px',
    order:1,
    borderRadius:' 4px',
    margin:' 8px 0',
    display:' inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding:' 12px 20px',
    '&:hover':{
      backgroundColor:'#f1f1f1',
      boxShadow:'4px 8px 10px rgba(0,0,0,0.3) -4px -8px 10px rgba(0,0,0,0.4)',
    },
    '&:focus':{
      outline:'none',
      backgroundColor:'#3CBC8D',
      color:'white'
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
    border: '1px solid #ccc',
    borderRadius:' 4px',
    boxSizing: 'border-box',
    '&:hover':{
      backgroundColor:'#f1f1f1',
      boxShadow:'4px 8px 10px rgba(0,0,0,0.3) -4px -8px 10px rgba(0,0,0,0.4)',
    },
    '&:focus':{
      outline:'none',
      backgroundColor:'#3CBC8D',
      color:'white'
    }
  },
  label:{
    width:'95%',
    marginBottom:theme.spacing(0.5),
    fontSize:'12px',
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
