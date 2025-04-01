
const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p
          style={{
            fontSize: "30px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Built with love by{" "}
          <span>
            <a
              href="https://youtube.com/@ajinkyagaikwad8698900404"
              style={{ color: "white", textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            >
              Aj95k
            </a>{" "}
            ❤️
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


/* import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer>
            <div
                style ={{
                    width: "100%",
                    padding: 20,
                    minHeight: "20vh",
                    maxHeight: "30vh",
                    marginTop: 60,
                }} >
                    <p style ={{ fontSize: "30px", textAlign: "center", padding: "20px"}}>
                        Built with love by <span>
                            <Link style = {{color:"white"}} className = "nav-link" 
                                to = {"https://youtube.com/@ajinkyagaikwad8698900404"}>Aj95k</Link> ❤️
                        </span>
                    </p>
                </div>
        </footer>
    );
};

export default Footer; */