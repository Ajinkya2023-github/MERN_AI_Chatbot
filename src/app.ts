import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables from .env file
config();

// Optional: Debugging environment variables
// console.log("COOKIE_SECRET:", process.env.COOKIE_SECRET);

const app = express();

// Enable CORS for the frontend domain with credentials support
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Parse cookies using the secret for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Morgan for logging HTTP requests (disable in production)
app.use(morgan("dev"));

// Mount your API routes at /api/v1
app.use("/api/v1", appRouter);

export default app;


/* import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

// middlewares
// localhost:5173 is frontend server, so explicit definition
app.use(cors({ origin: "http://localhost:5173", 
    credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);
export default app; */