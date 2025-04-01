import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/shared/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width="100%" height="100%">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: isBelowMd ? "80%" : "60%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 10,
            my: 10,
          }}
        >
          <Box
            component="img"
            src="robott.png"
            alt="Robot"
            sx={{ width: "200px", mx: "auto" }}
          />
          <Box
            component="img"
            className="image-inverted rotate"
            src="openai.png"
            alt="OpenAI Logo"
            sx={{ width: "200px", mx: "auto" }}
          />
        </Box>
        <Box>
          <Box
            component="img"
            src="chat.jpg"
            alt="Chatbot demonstration"
            sx={{
              display: "block",
              mx: "auto",
              width: "600px",
              height: "400px",
              borderRadius: 2,
              boxShadow: "-5px -5px 105px #64f3d5",
              mt: 2,
              mb: 2,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

/* import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/shared/typer/TypingAnim";
import Footer from "../components/footer/Footer";


const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return (
    <Box width = {"100%"} height = {"100%"}>
        <Box sx = {{display: "flex", 
            width: "auto", 
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
            mt: 3,
        }}>
            <Box>
                <TypingAnim />
            </Box>
            <Box sx = {{ width: isBelowMd ? "80%" : "60%", 
                display: "flex", 
                flexDirection: {md: "row", xs: "column", sm: "column"},
                gap: 10,
                my: 10,
                }}>
                <img src = "robott.png" alt = "robot" style = {{width : '200px', margin: 'auto'}} />
                <img className = "image-inverted rotate" src = "openai.png" alt = "openai" 
                    style = {{ width: "200px", margin: 'auto'}} />
            </Box>
            <Box>
            <img src = "chat.jpg" alt = "chatbot" 
                    style ={{display: "flex", 
                        margin: "auto", 
                        width: "600px",
                        height: "400px", 
                        borderRadius: 20,
                        boxShadow: "-5px -5px 105px #64f3d5",
                        marginTop: 20,
                        marginBottom: 20,
                }} />
            </Box>
        </Box>
        <Footer />
    </Box>
    );
};

export default Home; */