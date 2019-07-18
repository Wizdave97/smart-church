const styles= theme =>({
  container:{
    position:'relative'
  },
  searchBar:{
    width:'100%',
    minHeight:'84px',
    position:'absolute',
    top:0,
    left:0,
    padding:'16px',
    boxSizing:'border-box',
    display:'flex',
    zIndex:1500,
    backgroundColor:'inherit'
  },
  backIcon:{
    position:'absolute',
    left:0,
    padding:'10px',
    zIndex:'1500',
    alignSelf:'center',
    '& svg':{
      cursor:'pointer'
    }

  },
  searchIcon:{
    position:'absolute',
    right:0,
    padding:'10px',
    alignSelf:'center',
    zIndex:'1500',
    '& svg':{
      cursor:'pointer'
    }
  },
  inputRoot: {
      color: 'inherit',
      fontSize:'0.9rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.7rem'
      },

  },
  inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
  },
})
export default styles
