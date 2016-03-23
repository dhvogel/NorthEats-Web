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


    var options=[{selector: '#what-we-do', offset: 300, callback: '$("#staggered-list").show(800);Materialize.showStaggeredList("#staggered-list")'}];
    Materialize.scrollFire(options);




})

this.optioncount = 1;

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
                        var details = object.get('details')
                        var detailStr = ""
                        for (var j=0; j<details.length; j++) {
                            detailStr+=details[j][0]
                            detailStr+="<br />"
                            for (var k=0; k<details[j][1].length; k++) {
                                detailStr+="-"
                                detailStr+=details[j][1][k][0]
                                detailStr+="<br />"
                                for (var l=0; l<details[j][1][k][1].length; l++) {
                                    detailStr+="--"
                                    detailStr+=details[j][1][k][1][l]
                                    detailStr+="<br />"
                                }
                            }
                        }
                        var addressStr = ""
                        addressStr += object.get('address')
                        addressStr += "<br />"
                        addressStr += object.get('town')
                        addressStr += "<br />"
                        addressStr += object.get('zip')
                        addressStr += "<br />"
                        if (object.get('apt') != null) {
                            addressStr += "Apt: "
                            addressStr += object.get('apt')
                        }
                        if (object.get('comments') != null) {
                            addressStr += "<br />"
                            addressStr += "Comments: "
                            addressStr += object.get('comments')
                        }
                       $('#order-table').append('<tr><td>' + object.get('createdAt') + '</td><td>' + detailStr + '</td><td>' + object.get('order_total') + '</td><td>' + object.get('delivery') + '</td><td>' + addressStr + '</td><td>' + object.get('phone') + '</td><td>' + "not yet" +'</td></tr>');
                   })(jQuery);
           }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

function getOrderHistory() {
    var CurrentOrders = Parse.Object.extend("Orders");
    var query = new Parse.Query(CurrentOrders);
    query.equalTo("restaurant","Amici's Cucina");
    query.descending("createdAt");
    query.find({
        success: function(results) {
           for (var i = 0; i < results.length; i++) { 
               var object = results[i];
                   (function($) {
                        var details = object.get('details')
                        var detailStr = ""
                        for (var j=0; j<details.length; j++) {
                            detailStr+=details[j][0]
                            detailStr+="<br />"
                            for (var k=0; k<details[j][1].length; k++) {
                                detailStr+="-"
                                detailStr+=details[j][1][k][0]
                                detailStr+="<br />"
                                for (var l=0; l<details[j][1][k][1].length; l++) {
                                    detailStr+="--"
                                    detailStr+=details[j][1][k][1][l]
                                    detailStr+="<br />"
                                }
                            }
                        }
                        var addressStr = ""
                        addressStr += object.get('address')
                        addressStr += "<br />"
                        addressStr += object.get('town')
                        addressStr += "<br />"
                        addressStr += object.get('zip')
                        addressStr += "<br />"
                        if (object.get('apt') != null) {
                            addressStr += "Apt: "
                            addressStr += object.get('apt')
                        }
                        if (object.get('comments') != null) {
                            addressStr += "<br />"
                            addressStr += "Comments: "
                            addressStr += object.get('comments')
                        }
                       $('#order-history').append('<tr><td>' + object.get('createdAt') + '</td><td>' + detailStr + '</td><td>' + object.get('order_total') + '</td><td>' + object.get('delivery') + '</td><td>' + addressStr + '</td><td>' + object.get('phone') + '</td><td>' + "not yet" +'</td></tr>');
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
                var optionsHTML = '<td id="optionstd-' + $("#menu-table tr").length + '">';
                for (var k=0; k<object.get("Options").length; k++) {
                    optionsHTML = optionsHTML + '<div class="row"><div class="col s3"><input type="text" name="Name" value="' + object.get("Options")[k][1] + '" readonly/></div>';
                    optionsHTML = optionsHTML + '<div class="col s1"><input type="number" name="Min" value="' + object.get("Options")[k][0][0] + '" readonly/></div>';
                    optionsHTML = optionsHTML + '<div class="col s1"><input type="number" name="Max" value="' + object.get("Options")[k][0][1]+ '" readonly/></div>';
                    optionsHTML = optionsHTML + '<div class="col s3" id="options-table-' + $("#menu-table tr").length + '">';
                    for (var j=0; j<object.get("Options")[k][2].length; j++) {
                        optionsHTML = optionsHTML + '<input type="text" name="Option" value="' + object.get("Options")[k][2][j] + '" readonly></input>';
                    }
                    optionsHTML = optionsHTML + '</div><div class="col s2"><a class="btn-floating btn-small waves-effect waves-light red" onclick="removeOption($(this))"><i class="material-icons">close</i></a></div></div>'

                        
                }
                optionsHTML = optionsHTML + '<div class="col s2"><a  style="float:right" class="btn-floating btn-small waves-effect waves-light green"';
                        optionsHTML = optionsHTML + 'id="' + $("#menu-table tr").length +'" onclick="showOptionMenu($(this))">\
                        <i class="material-icons">add</i></a></div></div>';
                optionsHTML = optionsHTML + '</td>';
                var row = '<tr id="menu-item-'+ ($("#menu-table tr").length) +'"><td><div class="row"><input id="item-'+ ($("#menu-table tr").length) +'" type="text" value="'+object.get("Item")+'"/></div></td>'
                row = row + '<td><div class="row"><input id="desc-' + ($("#menu-table tr").length) +'"type="text" value="'+object.get("Description")+'"/></div></td>'
                row = row + optionsHTML;
                row = row + '<td><div class="row"><input id="price-' + ($("#menu-table tr").length) +'" type="number" value="'+object.get("Price")+'"/></div></td>'
                row = row + '<td><a class="btn-floating btn-small waves-effect waves-light red" name="'+ ($("#menu-table tr").length) +'" onclick="removeMenuItem($(this))"><i class="material-icons">close</i></a></td></tr>'
                $('#menu-table').append(row);
           }


        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

function addMenuItem() {
    var optionsHTML = '<td id="optionstd-' + $("#menu-table tr").length + '">';
    optionsHTML = optionsHTML + '<div class="row"><div class="col s3">&nbsp</div>';
    optionsHTML = optionsHTML + '<div class="col s2">&nbsp</div>';
    optionsHTML = optionsHTML + '<div class="col s2">&nbsp</div>';
    optionsHTML = optionsHTML + '<div class="col s3">&nbsp</div>';
    optionsHTML = optionsHTML + '<a class="btn-floating btn-small waves-effect waves-light green" style="float:right"';
    optionsHTML = optionsHTML + 'id="' + $("#menu-table tr").length +'" onclick="showOptionMenu($(this))"><i class="material-icons">add</i></a></div>';
    optionsHTML = optionsHTML + '</td>';

    var row = '<tr id="menu-item-'+ ($("#menu-table tr").length) +'"><td><div class="row"><input id="item-'+ ($("#menu-table tr").length) +'" type="text" value=""/></div></td>'
    row = row + '<td><div class="row"><input id="desc-' + ($("#menu-table tr").length) +'"type="text" value=""/></div></td>'
    row = row + optionsHTML
    row = row + '<td><div class="row"><input id="price-' + ($("#menu-table tr").length) +'" type="number" value=""/></div></td>'
    row = row + '<td><a class="btn-floating btn-small waves-effect waves-light red" name="'+ ($("#menu-table tr").length) +'" onclick="removeMenuItem($(this))"><i class="material-icons">close</i></a></td></tr>'
    $('#menu-table').append(row);
}

function removeMenuItem(sender) {
    var row = sender.attr("name");
    $("#menu-item-"+row).remove()
}

function showOptionMenu(button) {
    showOptionsModal();
    $("#option-button").attr("name", button.attr("id"));
}

function onModalHide() {
    $('#option-name').val("");
    $('#option-minimum').val("");
    $('#option-maximum').val("");
    $('#option-item-0').val("");
    while (this.optioncount != 1) {
        this.optioncount--;
        $('#option-input-' + this.optioncount).remove();
    }
};

var showOptionsModal = function() {
    $("#options").openModal({
        dismissable: false,
        complete : onModalHide()
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
            }

            var rows = $("#menu-table tr").length   

            for (var i=0; i<rows; i++){
                var item = $('#item-' + i).val();
                var description = $('#desc-' + i).val();
                var price = Number($('#price-' + i).val());
                if (item == "") {
                    alert("Error: Must enter name for all menu items");
                    return;
                }
                if (price == "") {
                    alert("Error: Must enter price for all menu items");
                    return;
                }
                var options = []
                
                $("#optionstd-" + i + "  > div").each(function() {
                    var curOpts = [];
                    var optMin = $(this).find("input[name='Min']").val();
                    var optMax = $(this).find("input[name='Max']").val();
                    var optName = $(this).find("input[name='Name']").val();
                    if (optName == null) {
                        return;
                    }
                    $(this).find("input[name='Option']").each(function() {
                        curOpts.push($(this).val());
                    });
                    options.push([[Number(optMin), Number(optMax)], optName, curOpts]);

                });
                

                var MenuItem = Parse.Object.extend("Amicis");
                var menuItem = new MenuItem();

                menuItem.set("Item", item);
                menuItem.set("Description", description);
                //need to do options config...
                menuItem.set("Options", options);
                menuItem.set("Price", price);

                menuItem.save(null, {
                   success: function(menuItem) {
                    },
                    error: function (menuItem, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                        return;
                    }
                })  
            }
            alert("Menu Updated!");        
        },
        error: function(error) {
            alert("Error: " + error.message);
        }
    });
}

function addOption() {

    var inputid = "option-item-" + this.optioncount;
    var divid = "option-input-" + this.optioncount; 
    $('#option-items').append('<div class="input-field" id ="' + divid + '"><input id="' + inputid + '" type="text" class="validate"><label for="' + inputid +'" >Option Item</label></div>');
    this.optioncount++;
}

function removeOption() {
    if (this.optioncount != 1) {
        this.optioncount--;
        $('#option-input-' + this.optioncount).remove();
    }
}

function addOptionToMenu(row) {
        var optionsHTML = '';
        optionsHTML = optionsHTML + '<div class="row" id="dfsoidjf"><div class="col s3"><input type="text" name="Name" value="' + $('#option-name').val() + '" readonly/></div>';
        optionsHTML = optionsHTML + '<div class="col s1"><input type="text" name="Min" value="' + $('#option-minimum').val() + '" readonly/></div>';
        optionsHTML = optionsHTML + '<div class="col s1"><input type="text" name="Max" value="' + $('#option-maximum').val()+ '" readonly/></div>';
        optionsHTML = optionsHTML + '<div class="col s3">';
        for (var k=0; k<this.optioncount; k++) {
            var divid = "#option-item-" + k; 
            if ($(divid).val() == "") {
                alert("Must enter a value for options");
                return
            }
            optionsHTML = optionsHTML + '<input type="text" name="Option" value="' + $(divid).val() + '" readonly></input>';
        }
        optionsHTML = optionsHTML + '</div><div class="col s2"><a class="btn-floating btn-small waves-effect waves-light red" onclick="removeOption($(this))"><i class="material-icons">close</i></a></div></div>'
    $('#optionstd-' + (row)).append(optionsHTML);

}

function removeOption(sender) {
    sender.parent().parent().remove()
}

