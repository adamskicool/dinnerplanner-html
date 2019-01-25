$(function() {
	//We instantiate our model
	var dinnerModel = new DinnerModel();
	var dishesToAdd = [1,2,3,100,101,102,103,200];
	dishesToAdd.forEach(function(dish) {
		dinnerModel.addDishToMenu(dish);
	});
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children
	 * of the specific view you're working with (see exampleView.js).
	 */
	 // var view1 = new SelectDishView($("body"), dinnerModel);
	 // var view2 = new OneDishSelectedView($("body"), dinnerModel);
	 // var view3 = new viewDishView($("body"), dinnerModel);
	 // var view4 = new dishPrintOutView($("body"), dinnerModel);
	 // var view5 = new dinnerOverviewView($("body"), dinnerModel);
	 new sideMenuView($(".select-dish-grid"), dinnerModel);
	 new sideMenuView($(".view-dish-grid"), dinnerModel);
	 new searchBarView($(".select-dish-grid"), dinnerModel);
	 new dishesView($(".select-dish-grid"), dinnerModel);
	 new dishMoreInfoView($(".view-dish-grid"), dinnerModel);
	 new dinnerSubtitle($("#my-dinner-subtitle"), dinnerModel);
     new dishOverviewView($("#dishes-overview"), dinnerModel);

});
