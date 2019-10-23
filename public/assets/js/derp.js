$(document).on("click", "button.gossip", function(event) {
    event.preventDefault();

    var gossip = "#gossip[data-id='" + $(this).data("id") + "']";
    $(gossip).removeClass("d-none")
    $(gossip).animate({
        height: 466,
    })
})

$(document).on("click", "button.x", function(event) {
    event.preventDefault();

    var gossip = "#gossip[data-id='" + $(this).data("id") + "']";
    $(gossip).animate({
        height: 0
    }, function() {
        $(gossip).addClass("d-none")
    })
})