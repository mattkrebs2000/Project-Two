$(document).ready(function () {
  var monthNamesRy = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var daysOfTheWeekRy = ["S", "M", "T", "W", "T", "F", "S"];

  var d = new Date();
  var year = d.getFullYear(); // 2016
  document.querySelector("#year").innerHTML = year;
  var thisMonth = d.getMonth(); // 0 - 11
  var today = d.getDate(); // 1 -31

  for (var month = 0; month < 12; month++) {
    createCalendar(month);
  }

  function createCalendar(month) {
    var monthDiv = createMonthHeader(month);

    var firstDayOfTheMonth = getFirstDayOfTheMonth(year, month);
    var daysinmonth = daysInMonth(year, month);
    var counter = 0,
      order = 6;

    for (var i = 0; i < firstDayOfTheMonth + 7; i++) {
      order++;
      createDay(month, "&nbsp;", order, monthDiv);
    }
    for (
      var i = firstDayOfTheMonth;
      i < daysInMonth(year, month) + firstDayOfTheMonth;
      i++
    ) {
      counter++;
      order++;
      createDay(month, counter, order, monthDiv);
    }

    for (var i = firstDayOfTheMonth + daysinmonth; i < 6 * 7; i++) {
      order++;
      createDay(month, "&nbsp;", order, monthDiv);
    }
  }

  function createDay(month, counter, order, monthDiv) {
    //if(order == 8){order = -1}
    var day = document.createElement("div"); //changed to button
    if (month === thisMonth && counter === today) {
      day.setAttribute("class", "to day");
    } else {
      day.setAttribute("class", "day");
    }
    day.setAttribute("style", "order:" + order);
    var newDay = counter;
    var newMonth = month;
    newMonth++;
    if (counter < 10) {
      newDay = "0" + counter;
    }
    if (month < 10) {
      newMonth = "0" + (month + 1);
    }
    day.setAttribute("id", "2020" + "-" + newMonth + "-" + newDay);
    // day.setAttribute("value", "2020" + "-" + newMonth + "-" + newDay);
    day.innerHTML = counter;
    monthDiv.appendChild(day);

  }

  function createMonthHeader(month) {
    var calendar = document.querySelector(".calendar");

    var monthDiv = document.createElement("div");
    monthDiv.setAttribute("class", "month");
    calendar.appendChild(monthDiv);

    var h4 = document.createElement("h4");
    h4.innerHTML = monthNamesRy[month];
    monthDiv.appendChild(h4);

    for (var i = 0; i < 7; i++) {
      //var order = (i == 0) ? order = 7 : order = i;
      var hday = document.createElement("div");
      hday.setAttribute("class", "day OfWeek");
      hday.setAttribute("style", "order:" + i);
      hday.innerHTML = daysOfTheWeekRy[i].toUpperCase();
      monthDiv.appendChild(hday);
    }

    return monthDiv;		

  }

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate(); //29/03/2016 (month + 1)
  }

  function getFirstDayOfTheMonth(y, m) {
    var firstDay = new Date(y, m, 1);
    return firstDay.getDay();
  }

  let userLogged = localStorage.getItem("User");
  $("#userLogged").text(userLogged);

  $.post("/api/coach", {}, function (data) {
    var coach;
    console.log(data);

    coach = data;

    $.get("/api/games", function (data) {
      console.log(coach);
      if (coach) {
        data.forEach((element) => {
          if (element.in_progress) {
            $(`#${element.date}`).attr("class", "inProgress");
            let dateNum = $(`#${element.date}`).text();
            $(`#${element.date}`).empty();
            var tag = $("<a>");
            tag.attr("href", `game-score-coach.html?id=${element.game_id}`);
            tag.attr("class", "inProgress");
            tag.text(dateNum);
            $(`#${element.date}`).append(tag);
          } else if (element.completed) {
            $(`#${element.date}`).attr("class", "gameDay");
            let dateNum = $(`#${element.date}`).text();
            $(`#${element.date}`).empty();
            var tag = $("<a>");
            tag.attr("href", `game-score-coach.html?id=${element.game_id}`);
            tag.attr("class", "gameDay");
            tag.text(dateNum);
            $(`#${element.date}`).append(tag);
          } else {
            $(`#${element.date}`).attr("class", "incomplete");
          }
        });
      } else {
        data.forEach((element) => {
          if (element.in_progress) {
            $(`#${element.date}`).attr("class", "inProgress");
            let dateNum = $(`#${element.date}`).text();
            $(`#${element.date}`).empty();
            var tag = $("<a>");
            tag.attr("href", `game-score.html?id=${element.game_id}`);
            tag.attr("class", "inProgress");
            tag.text(dateNum);
            $(`#${element.date}`).append(tag);
          } else if (element.completed) {
            $(`#${element.date}`).attr("class", "gameDay");
            let dateNum = $(`#${element.date}`).text();
            $(`#${element.date}`).empty();
            var tag = $("<a>");
            tag.attr("href", `game-score.html?id=${element.game_id}`);
            tag.attr("class", "gameDay");
            tag.text(dateNum);
            $(`#${element.date}`).append(tag);
          } else {
            $(`#${element.date}`).attr("class", "incomplete");
          }
        });
      }
    });
  });

  //Logout Button
  $("#logout").on("click", function () {
    $.post("/logout", {}, (data) => {
      console.log(data);
      if (!data) {
        window.location.href = "/calendar";
      } else {
        localStorage.clear();
        location.reload();
        window.location.href = "/";
      }
    });
  });
  
  // Modal Code //
  // Add Game shows modal
  $("#add").on("click", function () {
    $("#myModal2").css("display", function(){
      return "block"
    });
  });

  // closes modal
  $(".close").on("click", function(){
    $("#myModal2").css("display", function(){
      return "none"
    });
  });

  // function to add a game when clicked
  $("#addGame").on("click", function (event){
    event.preventDefault();

    console.log("create game button");

    // grabs user input from modal
    var homeInput = $("#homeTeam").val().trim();
    var awayInput = $("#awayTeam").val().trim();
    var location = $("#location").val().trim();
    var date = $("#date").val();

    // initializes var with user input
    var newGame ={
      home_team: homeInput,
      away_team: awayInput, 
      location: location,
      date: date
    }

    console.log(newGame);

    // post request to apiRoutes
    $.post("/api/newGame", newGame).then(function(data) {
      console.log(data);
      // if game doesnt exist, then create the game
      if (!data){
        alert("New game added!");
      } 
      alert("Game already exists!");
      
    }); 
    // reloads the window with new info from server
    window.location.reload(true);
  });

  // function to delete a game when clicked
  $("#deleteGame").on("click", function (event){
    event.preventDefault();

    console.log("delete game button");

    // grabs user input from modal
    var homeInput = $("#homeTeam").val().trim();
    var awayInput = $("#awayTeam").val().trim();
    var location = $("#location").val().trim();
    var date = $("#date").val();

    // initializes a var with user input
    var deleteGame ={
      home_team: homeInput,
      away_team: awayInput, 
      location: location,
      date: date
    }

    console.log(deleteGame);

    // post request to apiRoutes
    $.post("/api/deleteGame", deleteGame).then(function (data) {
      console.log(data);
      // if no data returned, then no game to delete
      if (!data){
        alert("Game does not exist... please try again.")
      } else { 
        $("#myModal2").css("display",function(){
          return "none"
        });
        setTimeOut(function(){alert("Game deleted!");}, 5000);
      }
    }); 
    // reloads the page with new info from server
    window.location.reload(true);
  });
});
