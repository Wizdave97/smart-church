const styles= theme =>({
  paper:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    padding:'10px',
    boxSizing:'border-box',
    minHeight:'200px',
    marginTop:'8px'
  },
  list:{
    width:'100%',

  },
  inputBox:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    alignSelf:'flex-end'
  },
  formGroup:{
    width:'100%',
    position:'relative',
    display:'flex',
    flexWrap:'wrap',
    padding:'10px',
    boxSizing:'border-box',
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
      boxShadow:'2px 2px 10px rgba(0,0,0,0.3), -2px -2px 10px rgba(0,0,0,0.4)',
    },
    '&:focus':{
      outline:'none',
      boxShadow:'2px 2px 10px rgba(150,157,204,0.7), -2px -2px 10px rgba(150,157,204,0.7)',
      color:'black'
    }
  },
  label:{
    width:'95%',
    marginBottom:theme.spacing(0.5),
    fontSize:'12px',
    top:0,
    left:0
  },
  item:{
    width:'100%',
    display:'flex',
    flexWrap:'nowrap',
  },
  text:{
    flex:1
  }
})

export default styles
