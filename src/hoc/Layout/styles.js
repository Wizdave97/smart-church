
const styles = theme =>({
    root:{
      minHeight:'calc(100% - 90px)',
      width:'100%',
      display:'flex',
      flexWrap:'wrap',
      paddingTop:'90px',
      position:'absolute',
      left:0,
      [theme.breakpoints.up('md')]:{
        width:'80%',
        left:'20%'
      }
    },
    branchBackground:{
      backgroundColor:''
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
    pageInfo:{
      display:'inline-block',
      width:'100%',
    },
    title:{
      width:'100%',
      display:'block',
      padding:'2px 8px',
      boxSizing:'border-box',
    },
    titleText:{
      fontSize:'1rem',
      [theme.breakpoints.down('sm')]:{
        fontSize:'0.8rem'
      }
    },
    breadcrumb:{
      width:'100%',
      padding:'2px 8px',
      boxSizing:'border-box'
    }

})

export default styles
