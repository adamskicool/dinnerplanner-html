var sideMenuViewController = function(view, model) {
    //onClick=\"viewDinnerOverview()\"
    view.people_select_button.onchange = function() {
        //gör något med knappen!
        alert("Something changed");
    }
    
    view.confirm_button.onclick = function() {
        alert("Confirm order!");
    }
}