$("#resume-button").click(function () {
    window.open("media/resume.pdf", "_blank");
});

$("#to-intro").click(function () {
    $("html, body").animate({
        scrollTop: $("#intro").offset().top
    }, 500)
});

$("#to-profs").click(function () {
    $("html, body").animate({
        scrollTop: $("#profs").offset().top
    }, 500)
});

$("#to-contacts").click(function () {
    $("html, body").animate({
        scrollTop: $("#contacts").offset().top
    }, 500)
});