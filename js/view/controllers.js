var sideMenuViewController = function(view, model) {
    //onClick=\"viewDinnerOverview()\"
    view.people_select_button.onchange = function(event) {
        //gör något med knappen!
        var value = event.target.value;
        model.setNumberOfGuests(value);
    }

    view.confirm_button.onclick = function() {
        viewDinnerOverview();
    }
}

var searchBarViewController = function(view, model) {
  
}
