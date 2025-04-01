import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return undefined;
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatItem = ({ content, role }: Message) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  // Helper to safely get initials from the user name
  const getUserInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    const firstInitial = parts[0][0] || "";
    const secondInitial = parts[1]?.[0] || "";
    return `${firstInitial}${secondInitial}`;
  };

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" width="30px" alt="OpenAI Logo" />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={"plaintext"}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {getUserInitials(auth?.user?.name)}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={"plaintext"}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;


/* import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
};

function isCodeBlock(str: string) {
    if (str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")) 
        {
            return true;
        }
        return false;
};

const ChatItem = ({
    content, role,
    } : {
    content: string, 
    role: "user" | "assistant";
    }) => {

    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    return role === "assistant"? <Box sx= {{
        display : 'flex',
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
        }}>
            <Avatar sx = {{ml: '0'}}>  
                <img src = 'openai.png' width = '30px'/>
            </Avatar>

            <Box>
                {!messageBlocks && (
                    <Typography sx = {{ fontSize: "20px" }}>{ content }</Typography>)}

                {messageBlocks && messageBlocks.length && 
                    messageBlocks.map((block) =>
                    isCodeBlock(block) ? (
                    <SyntaxHighlighter style = {coldarkDark} language = {"plaintext"}>
                        { block }
                    </SyntaxHighlighter>) : 
                    (<Typography sx = {{ fontSize: "20px" }}>{ block }</Typography>))}
            </Box>
        
        </Box> : 
        <Box sx= {{
        display : 'flex',
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius:2,
        }}>
            <Avatar sx = {{ml: '0', bgcolor: 'black', color: 'white'}}>
                {auth?.user?.name[0]}
                {auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx = {{ fontSize: "20px" }}>{ content }</Typography>)}

                {messageBlocks && messageBlocks.length && 
                    messageBlocks.map((block) =>
                    isCodeBlock(block) ? (
                    <SyntaxHighlighter style = {coldarkDark} language = {"plaintext"}>
                        { block }
                    </SyntaxHighlighter>) : 
                    (<Typography sx = {{ fontSize: "20px" }}>{ block }</Typography>))}
            </Box>
        </Box>

};

export default ChatItem; */