// see if user signed in before
var username = localStorage.getItem("username");
var userId = localStorage.getItem("userId");

$(document).on("ready", function () {
    if (username && userId) {
        signedIn({
            username: username,
            _id: userId
        })
    }

    // do something when sort by price link is clicked
    $(document).on("click", "a#sort-price", function (event) {
        event.preventDefault();
        var path = window.location.pathname;
        var origin = window.location.origin;
        var url = origin + path;
        url = url.replace("price/", "")
        url = url.replace("name/", "")
        url += "price/"
        console.log(path);
        console.log(url)
        // redirect
        location.replace(url)
    })

    // do something when sort by name link is clicked
    $(document).on("click", "a#sort-name", function (event) {
        event.preventDefault();
        var path = window.location.pathname;
        var origin = window.location.origin;
        var url = origin + path;
        url = url.replace("price/", "")
        url = url.replace("name/", "")
        url += "name/"
        console.log(path);
        console.log(url)
        // redirect
        location.replace(url)
    })

    // do something when wish button is clicked
    $(document).on("click", "a.wish", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        // open wish window
        var gossip = "div.wishcard[data-id='" + id + "']";
        $(gossip).removeClass("d-none")
        $(gossip).animate({
            height: 466,
            width: 355,
        })
        setTimeout(function() {
            $("div.wishes[data-id='" + id + "']").animate({
                scrollTop: $("div.wishes[data-id='" + id + "']").get(0).scrollHeight
            })
        }, 450)
    })

    // do something when update link is clicked
    $(document).on("click", "#scrape", function (event) {
        event.preventDefault();

        // ajax get scrape route
        $.ajax({
            url: "../../scrape",
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
            // initiate sign in
            $.ajax({
                url: "../../user/signin",
                type: "PUT",
                data: {
                    username: user,
                    password: pass
                }
            }).then(function (data) {
                if (data) {
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
                        url: "../../user/register",
                        type: "POST",
                        data: {
                            username: user,
                            password: pass
                        }
                    }).then(function (data) {
                        if (data) {
                            // run signedin function
                            signedIn(data);

                            // make the div element animate and disappear
                            $("div#signup").animate({
                                height: 0,
                                width: 0,
                            }, function () {
                                $("div#signup").addClass("d-none");
                            })
                        } else {
                            // let user know the username is taken
                            $("#user-register").attr("placeholder", user + " is taken!")
                            $("#user-register").val("");
                            $("#user-register").focus();
                        }
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

        // remove localstorage
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        // enable disabled elements
        $("a.saved").addClass("disabled");
        $("a.send").addClass("disabled");
        $("a#signin").removeClass("d-none");
        $("a#signout").addClass("d-none");
        $("button.favorite").addClass("d-none");
    })

    // do something when send button is clicked
    $(document).on("click", "a.send", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var message = $("input.wish[data-id='"+id+"']").val().trim();
        // text validation
        if (message) {
            // create data object
            var data = {
                username: username,
                message: message
            }
            // send the wish to the stars!
            $.ajax({
                url: "../../wish/" + id,
                type: "POST",
                data: data
            }).then(function(data) {
                if (data) {
                    $("input.wish").attr("placeholder", "")
                    $("input.wish").val("")
                    repopWishes(id)
                }
            })
        } else {
            $("input.wish").focus()
            $("input.wish").attr("placeholder", "Can't make empty wishes!")
        }

    })

    // do something when favorite button is clicked
    $(document).on("click", "button.favorite", function (event) {
        event.preventDefault();

        // make post request to server
        $.ajax({
            url: "../../favorite",
            type: "POST",
            data: {
                userId: userId,
                polishId: $(this).data("id"),
            }
        }).then(function (data) {
            console.log("Added to Favorites");
            // should probably do something so user knows
            favPop();
        })
    })

    // do something with view favorites link is clicked
    $(document).on("click", "a.saved", function (event) {
        event.preventDefault();

        location.replace("/favorite/" + userId + "/")
    })

    // close favorite popup
    $(document).on("click", ".close-fav", function (event) {
        event.preventDefault();
        $(".favorite-popup").removeClass("d-flex").addClass("d-none");
    })
})
// do some fancy stuff after signing in
function signedIn(data) {
    // set global username
    username = data.username;
    userId = data._id;

    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    // enable disabled elements
    $("a.saved").removeClass("disabled");
    $("a.send").removeClass("disabled");
    $("a#signin").addClass("d-none");
    $("a#signout").removeClass("d-none");
    $("button.favorite").removeClass("d-none");
}

function favPop() {
    $(".favorite-popup").removeClass("d-none").addClass("d-flex");
}

function repopWishes(polishId) {
    var wishlist = "ul.wish-list[data-id='" + polishId + "']";
    $.ajax({
        url: "/polish/" + polishId,
        type: "GET"
    }).then(function (data) {
        console.log(data.wish);
        $(wishlist).empty();

        data.wish.map(function (wish) {
            var li = $("<li>").addClass("list-group-item text-nebulous rounded mb-3");
            li.append(
                $("<strong>").addClass("text-fabulous").html(wish.username + ": "),
                $("<span>").html(wish.message),
            )
            $(wishlist).append(li);
            $("div.wishes[data-id='" + polishId + "']").animate({
                scrollTop: $("div.wishes[data-id='" + polishId + "']").get(0).scrollHeight
            })
        })
    })
}