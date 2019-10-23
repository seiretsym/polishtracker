// do something when wish button is clicked
$(document).on("click", "button.wish", function(event) {
    event.preventDefault();

    // open wish window
    var gossip = "#wish[data-id='" + $(this).data("id") + "']";
    $(gossip).removeClass("d-none")
    $(gossip).animate({
        height: 466,
    })
})

// do something with x button in wish window is clicked
$(document).on("click", "button.x", function(event) {
    event.preventDefault();

    // define wish window
    var gossip = "#wish[data-id='" + $(this).data("id") + "']";

    // make it disappear
    $(gossip).animate({
        height: 0
    }, function() {
        $(gossip).addClass("d-none")
    })
})

// do something when view saved link is clicked
$(document).on("click", "#viewsaved", function(event) {
    event.preventDefault();

    console.log("view saved")
})

// /do something when view all link is clicked
$(document).on("click", "#viewall", function(event) {
    event.preventDefault();

    console.log("view all")
})

// do something when signin link is clicked
$(document).on("click", "a#signin", function(event) {
    event.preventDefault();

    // show signin window
    $("div#signin").removeClass("d-none")
    $("div#signin").animate({
        height: 200,
        width: 300,
    })
})

// do something when signin button is clicked
$(document).on("click", "button#signin", function(event) {
    event.preventDefault();

    // sign in process

    // hide signin window
    $("div#signin").animate({
        height: 0,
        width: 0,
    }, function() {
        $("div#signin").addClass("d-none");
    })
})

// do something when signup button is clicked
$(document).on("click", "button#signup", function(event) {
    event.preventDefault();
    
    // hide the signin window
    $("div#signin").animate({
        height: 0,
        width: 0,
    }, function() {
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
$(document).on("click", "button#register", function(event) {
    event.preventDefault();
    
    // register process

    // make the div element animate and disappear
    $("div#signup").animate({
        height: 0,
        width: 0,
    }, function() {
        $("div#signup").addClass("d-none");
    })
})

// do something when close button is clicked
$(document).on("click", "button.close", function(event) {
    event.preventDefault();
    // define element by button data-id
    var div = "div#" + $(this).data("id");

    // make the div element animate and disappear
    $(div).animate({
        height: 0,
        width: 0,
    }, function() {
        $(div).addClass("d-none");
    })
})

// do something when signout is clicked
$(document).on("click", "#signout", function(event) {
    event.preventDefault();

    console.log("signout")
})