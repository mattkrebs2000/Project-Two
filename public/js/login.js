$(document).ready(function () {
  // Login submission
  $("form").on("submit", function (event) {
    event.preventDefault();
    $.post(
      "/api/user",
      {
        name: $("#email").val().trim(),
        password: $("#password").val().trim(),
      },
      function (data) {
        if (typeof data === "object") {
          alert("Login successful!");
          // console.log(data);
          localStorage.setItem("User", data.name);

          window.location.href = "/calendar";
        } else {
          alert("Incorrect email/password");
        }
      }
    );
  });

  // Function that unchecks the coach checkbox
  function uncheck() {
    return (document.getElementById("checkBox").checked = false);
  }

  //Create Account button that pops up the model
  $("#create").on("click", function () {
    $("#myModal").modal("show");
    uncheck();
  });

  // The create button that submits the form data
  $("#createUserAccount").on("click", function (event) {
    event.preventDefault();

    let emailInput = $("#createEmail").val().trim();
    let passwordInput = $("#createPassword").val().trim();
    let coachVal = document.getElementById("checkBox").checked;
    //
    var newUser = {
      name: emailInput,
      password: passwordInput,
      coach: coachVal,
      team: "Jaguars",
    };

    // console.log(newUser);
    $.post("/api/newUser", newUser).then(function (data) {
      console.log(data);
      if (!data) {
        // $("#myModal").modal("hide");
        alert("Account already exists");
      } else {
        $("#myModal").modal("hide");
        alert("New user account created!");
      }
    });
  });

  // Coach checkbox validation
  $("#checkBox").on("click", function (event) {
    let password = "coach";
    let input = prompt("Enter Coach Password...");

    if (input === password && input != null) {
      return;
    } else {
      event.preventDefault();
      alert("Incorrect Coach Password");
    }
  });
});
