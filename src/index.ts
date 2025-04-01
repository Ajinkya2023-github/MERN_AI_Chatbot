import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server open on port ${PORT} & connected to database!`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Optionally exit if the database connection fails
  });

// Optional: Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  // You can add logic to close your database connection here if desired
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  // Add cleanup code if needed
  process.exit(0);
});


/* import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// connection
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log("Server Open & Connected To Database!"));
})
.catch((err) => console.log(err)); */