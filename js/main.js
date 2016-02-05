$(window).load(function() {
    $('#first-active').addClass('activeLink');
    console.log("test");

    $('.active-nav li a').bind('click', function(e) {
        $('.activeLink').removeClass('activeLink');
        $(this).addClass('activeLink');
    })
})

