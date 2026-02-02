const express = require('express');
const dotenv=require('dotenv');
const Dbconnection =require('./connectiondb');
const taskRoutes = require("./routes/taskRoutes")

const app = express();
dotenv.config();
Dbconnection();

app.use(express.json());
app.use("/api", taskRoutes);
app.get("/test", (req, res) => res.send("Server is running"));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});