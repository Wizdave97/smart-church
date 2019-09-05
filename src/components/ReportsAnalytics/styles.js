const styles = theme =>({
  filters:{
    display:'flex',
    width:'100%',
    flexWrap:'wrap',
    boxSizing:'border-box',
    padding:'15px'
  },
  entry:{
    width:'90%',
    boxSizing:'inherit',
    display:'flex',
    [theme.breakpoints.up('sm')]:{
      width:'45%'
    },
    [theme.breakpoints.up('md')]:{
      width:'23%'
    }
  },
  button:{
    alignSelf:'center'
  },
  tableWrapper:{
    width:'100%',
    display:'flex',
    flexWrap:'wrap',
    boxSizing:'border-box'
  },
  chart:{
    width:'100%',
    padding:'8px',
    boxSizing:'border-box',
    height:'340px',
    [theme.breakpoints.up('sm')]:{
      height:'450px'
    },
  },
  chartNav:{
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    padding:'10px',
    boxSizing:'border-box'
  }
})

export default styles
