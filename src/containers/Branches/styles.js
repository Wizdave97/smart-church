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
  card: {
    width: '100%',
  },
  title: {
  fontSize: 14,
},
  button:{
    alignSelf:'center'
  },
  tableWrapper:{
    overflowX:'auto',
  }
})

export default styles
