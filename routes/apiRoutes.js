var db = require("../models");
var bcrypt = require("bcrypt");
var saltRounds = 10;

module.exports = function (app) {
  // Function that redirects to the login page if a
  // session isn't stored yet (no one logged in).
  const redirectLogin = (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/");
    } else {
      next();
    }
  };

  // Function that redirects to the calendar page if a
  // session is stored (someone logged in).
  const redirectCalendar = (req, res, next) => {
    if (req.session.user) {
      res.redirect("/calendar");
    } else {
      next();
    }
  };

  //Log in post request
  app.post("/api/user", redirectCalendar, (req, res) => {
    db.User.findOne({
      where: {
        name: req.body.name,
      },
    }).then(function (User) {
      if (!User) {
        res.send(false);
      } else {
        bcrypt.compare(req.body.password, User.password, function (
          err,
          result
        ) {
          if (result) {
            req.session.user = User.name;
            req.session.coach = User.coach;

            console.log(req.session.user);
            console.log(req.session.coach);

            res.json(User);

            // res.redirect("/calendar");
          } else {
            console.log("incorrecct");
            res.send(false);
            // res.redirect("/");
          }
        });
      }
    });
  });

  app.post("/api/coach", (req, res) => {
    db.User.findAll({}).then(function (User) {
      console.log(req.session.coach);
      res.send(req.session.coach);
    });
  });

  // Register new user post request
  app.post("/api/newUser", (req, res, next) => {
    // db.User.create(req.body);
    // console.log("newUser: " + req.body.name);
    db.User.findOne({
      where: {
        name: req.body.name,
      },
    }).then((data) => {
      if (data) {
        res.send(false);
      } else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          db.User.create({
            name: req.body.name,
            password: hash,
            coach: req.body.coach,
            team: "Jaguars",
          }).then(function (data) {
            if (data) {
              res.redirect("/");
            }
          });
        });
      }
    });
  });

  //Create new comment
  app.post("/api/newComment", function (req, res) {
    db.Comment.create(req.body);
    res.end();
  });

  //Display all users
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (data) {
      for (i = 0; i < data.length; i++) {
        console.log(data[i].date);
      }
      res.json(data);
    });
  });

  //Display all comments
  app.get("/api/comments", function (req, res) {
    db.Comment.findAll({}).then(function (data) {
      for (i = 0; i < data.length; i++) {
        console.log(data[i].comment);
      }
      res.json(data);
    });
  });

  // Get route for retrieving a single user
  app.get("/api/users/:name", function (req, res) {
    db.User.findOne({
      where: {
        name: req.params.name,
      },
    }).then(function (dbUser) {
      res.json(dbUser);
      console.log("Find team name" + dbUser.team);
    });
  });

  // Get request for all games in db
  app.get("/api/games", (req, res) => {
    db.Game.findAll({}).then(function (data) {
      // for (i = 0; i < data.length; i++) {
      //   console.log(data[i].date);
      // }

      res.json(data);
    });
  });

  app.post("/api/newGame", function(req, res) {
    console.log(req.body);
    db.Game.findOne({
      where: {
        home_team: req.body.home_team,
        away_team: req.body.away_team,
        location: req.body.location,
        date: req.body.date
      }
    }).then(function(Game){
      if(Game){
        res.send(false);
      } else {
        db.Game.create({
          home_team: req.body.home_team,
          away_team: req.body.away_team,
          location: req.body.location,
          date: req.body.date
        }).then(function(data) {
          // if (data) {
          //   res.redirect("/calendar");
          // }
        });
      }
    });
  });

  app.post("/api/deleteGame", function(req, res) {
    console.log(req.body);
    db.Game.findOne({
      where: {
        date: req.body.date
      } 
    }).then(function(Game){
      console.log(Game);
      if(!Game){
        res.send(false);
      } else {
        db.Game.destroy({ 
          where: {
            date: req.body.date
          } 
        }).then(function(data) {
          // if (data) {
          //   res.redirect("/calendar");
          // }
        });
      }
    })
  });
  
  ///////////////////////////////////////////////
  //EXAMPLES/////////////////////////////////////
  ///////////////////////////////////////////////

  // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Find all example
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
