export const customStyles = {
    container: {
        style: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth:'500px',
               }
    },
    header: {
        style: {
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 10,
                textAlign:'center',
                textTransform:'uppercase',
                '@media(max-width:767px)':{fontSize:'1rem'},
                '@media(max-width:740px)':{fontSize:'0.8rem'},
             }
    },
    rows: {
        style:{
            minHeight:'42px',
            fontStyle:'sans-serif'
        }
    },
    cells: {
        style: {
            backgroundColor: "#1c1b1b",
            color:"#fff"
        }
    },
    headCells:{
        style: {
            color:"#4caf50",
            textTransform:'uppercase',
            fontSize:"12px",
            fontWeight:'bold'
        }
    },

}