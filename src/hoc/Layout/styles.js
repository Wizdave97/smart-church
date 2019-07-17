
const styles = theme =>({
    root:{
      minHeight:'calc(100% - 90px)',
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      marginTop:'90px',
      position:'absolute',
      left:0,
      [theme.breakpoints.up('md')]:{
        width:'80%',
        left:'20%'
      }
    },
    rootElement:{
      padding:'0'
    },
    main:{
        width:'100%',
        minHeight:'100%',
        display:'flex',
        flexWrap:'wrap'
    },

})

export default styles
