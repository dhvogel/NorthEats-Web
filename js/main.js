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

}

function getCurrentMenu() {
    ////need to make this general --> get class name as field in user object
    var CurrentOrders = Parse.Object.extend("Amicis");
    var query = new Parse.Query(CurrentOrders);
    query.find({
        success: function(results) {
           for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                var row = '<tr><td><div class="row"><input type="text" value="'+object.get("Item")+'"/></div></td>'
                row = row + '<td><div class="row"><input type="text" value="'+object.get("Description")+'"/></div></td>'
                row = row + '<td><div class="row"><div class="col s10"><input type="text" value="' + object.get("Options") + '" readonly/></div><div class="col s2"><a class="btn-floating btn-small waves-effect waves-light green" onclick="showOptionsModal();"><i class="material-icons">add</i></a></div></div></td>'
                row = row + '<td><input type="number" value="'+object.get("Price")+'"/></td></tr>';
                $('#menu-table').append(row);
           }
            var button = ''
            $('#menu-table').append(row);

        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

var onModalHide = function() {
    
};

var showOptionsModal = function() {
    $("#options").openModal({
        dismissable: false,
        complete : onModalHide
    });
}

function saveMenu() {
    //delete all old entries
    var CurrentMenu = Parse.Object.extend("Amicis");
    var query = new Parse.Query(CurrentMenu);
    query.find({
        success: function(results) {
            for (var i=0; i<results.length;i++) {
                results[i].destroy();
                alert("Destroy: " + i);
            }   

            $('#menu-table tr').each(function() {
                if (!this.rowIndex) return; 
                var item = "Test";
                console.log(item);
                var description = "Test";
                var options = ["Test"];
                var price = 69.69;

                var MenuItem = Parse.Object.extend("Amicis");
                var menuItem = new MenuItem();

                menuItem.set("Item", item);
                menuItem.set("Description", description);
                //need to do options config...
                menuItem.set("Options", options);
                menuItem.set("Price", price);

                menuItem.save(null, {
                    success: function(menuItem) {
                        alert("created!");
                    },
                    error: function (menuItem, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                })  
            })        
        },
        error: function(error) {
            alert("Error: " + error.message);
        }
    });
}

