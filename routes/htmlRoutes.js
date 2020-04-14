var path = require("path");

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

  // Load login page
  app.get("/", redirectCalendar, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Load calendar page
  app.get("/calendar", redirectLogin, (req, res) => {
    if (!req.session.coach) {
      res.sendFile(path.join(__dirname, "../public/calendar.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/calendar-coach.html"));
    }
  });

  //Load game score page
  app.get("/game-score", redirectLogin, (req, res) => {
    if (!req.session.coach) {
      res.sendFile(path.join(__dirname, "../public/game-score.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/game-score-coach.html"));
    }
  });

  //Post request to logout and end session
  app.post("/logout", redirectLogin, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send(false);
      }

      res.clearCookie("project2");
      res.send(true);
    });
  });

  //Catches everything else and redirects to login
  // app.get("*", function (req, res) {
  //   res.redirect("/");
  // });
};
