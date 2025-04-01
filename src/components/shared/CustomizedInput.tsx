import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      sx={{
        "& .MuiInputLabel-root": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { 
            borderColor: "white", 
            borderRadius: 10, // Set desired border radius for the fieldset
          },
          "&:hover fieldset": { borderColor: "lightgray" },
          "&.Mui-focused fieldset": { borderColor: "blue" },
          width: "400px",
          // If the overall component needs a specific borderRadius, you could include it here, 
          // but typically the fieldset's border radius is what matters.
        },
        input: { color: "white", fontSize: "20px" },
      }}
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
};

export default CustomizedInput;


/* import TextField from "@mui/material/TextField";

type Props = {
    name: string;
    type: string;
    label: string;
};


const CustomizedInput = (props: Props) => {
        return (
            <TextField
                sx={{
                    "& .MuiInputLabel-root": { color: "white" }, // Label color
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" }, // Border color
                        "&:hover fieldset": { borderColor: "lightgray" }, // Hover effect
                        "&.Mui-focused fieldset": { borderColor: "blue" }, // Focus effect

                        width: "400px", 
                        borderRadius: 2, // MUI uses `borderRadius` inside `sx`
                        fontSize: 20,
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderRadius: 10 }, // Correct way to style border radius
                },
                    },
                    input: { color: "white" }, // Text color
                }}
                name={props.name}
                label={props.label}
                type={props.type}
                
            />
        );
    };
    
export default CustomizedInput; */