$(window).load(function() {
    Parse.initialize("mU9OJrv5bhGXeIGifLASNHCu5zCubALNwBB7UGHR", "OiOugsAYuAlwCNMXOw3ln5H9B1m7JrSFLDHvQ6XD");

    if (!Parse.User.current() && window.location.pathname.split('/').pop() != "index.html") {
        window.location.href = "index.html"
    }

    $('#first-active').addClass('activeLink');

    $('.active-nav li a').bind('click', function(e) {
        $('.activeLink').removeClass('activeLink');
        $(this).addClass('activeLink');
    })


    var CurrentOrders = Parse.Object.extend("Orders");
    var query = new Parse.Query(CurrentOrders);
    query.equalTo("filled", false);
    query.equalTo("restaurant","Amici's Cucina");
    query.descending("createdAt");
    query.find({
        success: function(results) {
           for (var i = 0; i < results.length; i++) { 
               var object = results[i];
                   (function($) {
                       $('#order-table').append('<tr><td>' + object.get('createdAt') + '</td><td>' + object.get('details') + '</td><td>' + object.get('order_total') + '</td><td>' + object.get('delivery') + '</td><td>' + object.get('address') + '</td><td>' + object.get('phone') + '</td><td>' + "not yet" +'</td></tr>');
                   })(jQuery);
           }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
})

function signUp() {
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    var retypepassword = $("#signup-retypepassword").val();
    var username = $("#signup-username").val();
    if (password != retypepassword) {
        alert("Password and Retyped Password must match.")
        return
    }
    var user = new Parse.User();
    user.set("email", email);
    user.set("password", password);
    user.set("username", username);


    user.signUp(null, {
      success: function(user) {
        $('#signup').closeModal();
        window.location.href = "dashboard.html"
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function logIn() {
    var password = $("#login-password").val();
    var username = $("#login-username").val();
    console.log(password);
    console.log(username);


    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(user);
        $('#login').closeModal();
        window.location.href = "dashboard.html"
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function logOut() {
    Parse.User.logOut();
    window.location.href = "index.html"
}

function getCurrentOrders() {

}

