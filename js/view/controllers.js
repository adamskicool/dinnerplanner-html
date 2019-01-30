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
    view.searchButton.onclick = function() {
        var textInput = view.textSelector.value;
        var selectedType = view.dropDownSelector[view.dropDownSelector.selectedIndex].id;
        model.setSearchbarInput(selectedType, textInput);
    }
}

var dinnerSubtitleViewController = function(view, model) {
    view.editDinnerButton.onclick = function() {
        selectDish();
    }
}
