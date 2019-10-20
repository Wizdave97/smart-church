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
    marginTop:'15px',
  },
  chart:{
    width:'100%',
    padding:'8px',
    boxSizing:'border-box',
    overflowX:'auto'
  },
  chartNav:{
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    padding:'10px',
    boxSizing:'border-box'
  },
  paper:{
    boxShadow:'4px 4px 15px rgba(0,0,0,0.1),-4px -4px 15px rgba(0,0,0,0.1)',
    borderRadius:'15px',
    border:'6px solid rgba(0,0,0,0.1)',
  }
})

export default styles
