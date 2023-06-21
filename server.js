const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
connectDb()
const app = express();
const port = process.env.PORT || 5000;
// app.get("/api/contacts",require("./routes/contactRoutes"));
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, () => {
  console.log(`server is on port ${port}`);
 
});
