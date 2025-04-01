import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  // Wrap the onClick if provided for debugging
  const handleClick = async () => {
    console.log("NavigationLink clicked");
    if (props.onClick) {
      try {
        await props.onClick();
      } catch (error) {
        console.error("Error in NavigationLink onClick:", error);
      }
    }
  };

  return (
    <Link
      onClick={props.onClick ? handleClick : undefined}
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;


/* import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
}
const NavigationLink = (props: Props) => {
    return <Link 
        onClick = {props.onClick}
        className = "nav-link"
        to = {props.to} 
        style = {{background: props.bg, color: props.textColor}}>
            {props.text}</Link>;
};

export default NavigationLink; */