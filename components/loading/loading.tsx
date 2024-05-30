import React from 'react'
import {Spinner} from "@nextui-org/react";
import { Box } from '@mui/material';


const AppLoading = () => {
  return (
    <Box
        sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Spinner/>
    </Box>
  )
}

export default AppLoading;
