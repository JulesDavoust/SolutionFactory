const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize init
const db = require("./models/index.cjs");
db.Sequelize.sync()

//serialize
app.get("/", (req, res) => {
  res.json({ message: "API connected." });
});

require("./routes/userRouter.cjs")(app);
require("./routes/tagRouter.cjs")(app);
require("./routes/rentedRouter.cjs")(app);
require("./routes/likeRouter.cjs")(app);
require("./routes/haveRouter.cjs")(app);
require("./routes/ebookRouter.cjs")(app);
require("./routes/authorRouter.cjs")(app);
require("./routes/paiementRouter.cjs")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});