import React from 'react';
import { makeStyles } from '@mui/styles';
import { Height } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    // customButton: {
    //   backgroundColor: 'blue', // Set your desired background color here
    //   color: 'white', // Set the text color
    // },

    appbar: {
      backgroundColor: "#212121"
    },

    cardImage:{
      minWidth:"150px",
      minHeight: "150px",
      margin: "1rem",
      borderRadius: "50%"
    },

    card:{
      display:"flex",
      gap:".5rem",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor:"#F8F8F8",
      marginBlock:"1rem"
    },

    flex:{
      display:"flex",
      gap: "1rem",
      alignItems: "center"
    },

    smallcard:{
      border: "black solid .5px",
      borderRadius : "5px",
      padding: ".2rem",
      backgroundColor : "purple",
      color : "white"
    },


    drop : {
      fontSize: "3rem",
      cursor:"pointer"
    }

  }));

  export default useStyles;
