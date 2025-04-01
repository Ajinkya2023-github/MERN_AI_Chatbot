/* import React from "react"

const NotFound = () => {
    return <div>NotFound</div>;
};

export default NotFound;
 */

import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#05101c",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "#00fffc",
          color: "black",
          "&:hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
