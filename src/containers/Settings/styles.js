const styles = theme =>({
  paper:{
    display:'flex',
    flexWrap:'wrap',
    width:'100%',
    justifyContent:'flex-start',
    padding:'20px',
    boxSizing:'border-box'
  },
  category:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    marginBottom:'15px',
    boxSizing:'border-box',
    [theme.breakpoints.up('sm')]:{
      width:'45%',
      marginTop:'15px',
      marginLeft:'2.5%',
      marginRight:'2.5%',
    },
    [theme.breakpoints.up('md')]:{
      width:'30%',
      marginLeft:'1.666%',
      marginRight:'1.666%',
    }
  },
  title:{
    width:'100%'
  },
  submit:{
    width:'100%',
    display:'flex',
    justifyContent:'center'
  }
})

export default styles;
