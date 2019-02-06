/**
Controller for the sidemenu view, handles events for:
1. Button that selects the number of people.
2. Button that switches to the dinner-overwiev view via the GSC.
**/
var sideMenuViewController = function(view, model) {
    view.people_select_button.onchange = function(event) {
        var value = event.target.value;
        model.setNumberOfGuests(value);
    }

    view.confirm_button.onclick = function() {
        viewDinnerOverview();
    }
}

/**
Controller for the search-bar view, handles events for:
1. Button that searches.

Possible extentions: 
1. Click on enter should press the search button aswell.
**/
var searchBarViewController = function(view, model) {
    view.searchButton.onclick = function() {
        var textInput = view.textSelector.value;
        var selectedType = view.dropDownSelector[view.dropDownSelector.selectedIndex].id;
        model.setSearchbarInput(selectedType, textInput);
    }
}

/**
Controller for the dinner-subtitle view, handles events for:
1. Button that swiches to the select dish view via the GSC.
**/
var dinnerSubtitleViewController = function(view, model) {
    view.editDinnerButton.onclick = function() {
        selectDish();
    }
}

/**
Controller for the dish view, handles events for:
1. Image, when clicked should set the models current dish to the dish clicked
   and switch to the view-dish view via the GSC.
**/
var dishViewController = function(view, model) {
    view.dishImage.onclick = function() {
        model.setCurrentDish(view.id);
        viewDish();
    }
}

/**
Controller for the dish-more-info view, handles events for:
1. Button that switches back to select-dish view via the GSC.
2. Botton that adds the current dish to the menu.
**/
var dishMoreInfoViewController = function(view, model) {
    view.backToSearch.onclick = function() {
        selectDish();
    }
    view.addToMenu.onclick = function() {
        model.addDishToMenu(model.getCurrentDish());
    }
}

/**
Controller for the dish-overview view view, handles events for:
1. Button that switches to the print-full-recipe view via the GSC.
**/
var dishOverviewViewController = function(view, model) {
    view.printFullRecipeButton.onclick = function() {
        viewDinnerPrintOut();
    }
}

/**
Controller for the print-out view, handles events for:
As of yet there is no events that need to be handled for this view.
The only interaction on that page is via the dinner-subtitle controller.
**/
var dishPrintOutViewController = function(view, model) {

}
