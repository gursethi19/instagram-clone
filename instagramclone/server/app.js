const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./keys");
const cors = require("cors");

require("./models/user");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongo", err);
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
