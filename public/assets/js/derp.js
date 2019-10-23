// do something when wish button is clicked
$(document).on("click", "a.wish", function (event) {
    event.preventDefault();
    console.log("wish button clicked")
    // open wish window
    var gossip = "div.wishcard[data-id='" + $(this).data("id") + "']";
    $(gossip).removeClass("d-none")
    $(gossip).animate({
        height: 466,
        width: 355
    })
})

// do something when update link is clicked
$(document).on("click", "#scrape", function (event) {
    event.preventDefault();

    // ajax get scrape route
    $.ajax({
        url: "/scrape",
        type: "GET"
    }).then(function (data) {
        location.reload();
    })
})
// do something with x button in wish window is clicked
$(document).on("click", "button.x", function (event) {
    event.preventDefault();

    // define wish window
    var gossip = "div.wishcard[data-id='" + $(this).data("id") + "']";

    // make it disappear
    $(gossip).animate({
        height: 0,
        width: 0
    }, function () {
        $(gossip).addClass("d-none")
    })
})

// do something when signin link is clicked
$(document).on("click", "a#signin", function (event) {
    event.preventDefault();

    // show signin window
    $("div#signin").removeClass("d-none")
    $("div#signin").animate({
        height: 200,
        width: 300,
    })
})

// do something when signin button is clicked
$(document).on("click", "button#signin", function (event) {
    event.preventDefault();

    // sign in process
    var user = $("#user-signin").val().trim();
    var pass = $("#pw-signin").val();

    // if username and password inputs aren't empty
    if (user || pass) {
        console.log(user);
        // initiate sign in
        $.ajax({
            url: "user/signin",
            type: "PUT",
            data: {
                username: user,
                password: pass
            }
        }).then(function (data) {
            console.log(data);
            if (data.length > 0) {
                // run signedin function
                signedIn(data);

                // hide signin window
                $("div#signin").animate({
                    height: 0,
                    width: 0,
                }, function () {
                    $("div#signin").addClass("d-none");
                })
            } else {
                // let user know password is invalid
                $("#pw-signin").attr("placeholder", "Invalid Password");
                $("#pw-signin").val("");
                $("#pw-signin").focus();
            }
        })
    } else {
        // let user know a username is expected
        $("#user-signin").attr("placeholder", "Cannot be empty!");
        $("#user-signin").focus();
    }
})

// do something when signup button is clicked
$(document).on("click", "button#signup", function (event) {
    event.preventDefault();

    // hide the signin window
    $("div#signin").animate({
        height: 0,
        width: 0,
    }, function () {
        $("div#signin").addClass("d-none");

        // show the signup window
        $("div#signup").removeClass("d-none")
        $("div#signup").animate({
            height: 200,
            width: 300,
        })
    })
})

// do something when register button is clicked
$(document).on("click", "button#register", function (event) {
    event.preventDefault();

    // register process
    var user = $("#user-register").val().trim();
    var pass = $("#pw-register").val();
    var pwConfirm = $("#pw-confirm").val();

    // compare passwords
    if (user) {
        if (pass) {

            if (pass === pwConfirm) {
                // begin registration
                $.ajax({
                    url: "/user/register",
                    type: "POST",
                    data: {
                        username: user,
                        password: pass
                    }
                }).then(function (data) {
                    // run signedin function
                    signedIn(data);

                    // make the div element animate and disappear
                    $("div#signup").animate({
                        height: 0,
                        width: 0,
                    }, function () {
                        $("div#signup").addClass("d-none");
                    })
                })
            } else {
                // let user know the passwords don't match
                $("#pw-confirm").attr("placeholder", "Password doesn't match!")
                $("#pw-confirm").val("");
                $("#pw-confirm").focus();
            }
        } else {
            // let user know the password field can't be empty
            $("#pw-register").attr("placeholder", "Cannot be empty!")
            $("#pw-register").val("");
            $("#pw-register").focus();
        }
    } else {
        // let user know the username field can't be empty
        $("#user-register").attr("placeholder", "Cannot be empty!")
        $("#user-register").val("");
        $("#user-register").focus();
    }
})

// do something when close button is clicked
$(document).on("click", "button.close", function (event) {
    event.preventDefault();
    // define element by button data-id
    var div = "div#" + $(this).data("id");

    // make the div element animate and disappear
    $(div).animate({
        height: 0,
        width: 0,
    }, function () {
        $(div).addClass("d-none");
    })
})

// do something when signout is clicked
$(document).on("click", "#signout", function (event) {
    event.preventDefault();

    // set global username
    username = ""
    userId = "";

    // enable disabled elements
    $("a.saved").addClass("disabled");
    $("a.send").addClass("disabled");
    $("a#signin").removeClass("d-none");
    $("a#signout").addClass("d-none");
})

// do something when send button is clicked
$(document).on("click", "a.send", function (event) {
    event.preventDefault();

    console.log("send button clicked");
})

var username = "";
var userId = "";

// do some fancy stuff after signing in
function signedIn(data) {
    // set global username
    username = data.username;
    userId = data._id;

    // enable disabled elements
    $("a.saved").removeClass("disabled");
    $("a.send").removeClass("disabled");
    $("a#signin").addClass("d-none");
    $("a#signout").removeClass("d-none");
}