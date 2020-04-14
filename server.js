var express = require("express");
var session = require("express-session");
var bcrypt = require("bcrypt");

// Sets up the Express App
var app = express();
const { PORT = 3000, NODE_ENV = "development" } = process.env;

const IN_PROD = NODE_ENV === "production";

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", 1);

//Session
app.use(
  session({
    name: "project2",
    resave: false,
    saveUninitialized: false,
    secret: "bootcamp",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/scores-api-routes")(app);
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
