const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const doctorRoute = require("./routes/doctorsRoute.js");
const path = require("path");

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define your routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));

// Enable CORS for specific origins
const allowedOrigins = [
  "https://app.netlify.com/sites/book-myappointment/deploys/65e04c17b9827ee88482a0c1",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
