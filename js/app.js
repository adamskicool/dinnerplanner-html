$(function() {
	//We instantiate our model
	var dinnerModel = new DinnerModel();
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children
	 * of the specific view you're working with (see exampleView.js).
	 */
     //setup the views.
	 new homeView ($(".lorem"), dinnerModel);
	 new sideMenuView($(".select-dish-grid"), dinnerModel);
	 new sideMenuView($(".view-dish-grid"), dinnerModel);
	 new searchBarView($(".select-dish-grid"), dinnerModel);
	 new dishesView($(".select-dish-grid"), dinnerModel);
	 new dishMoreInfoView($(".view-dish-grid"), dinnerModel);
	 new dinnerSubtitle($(".my-dinner-subtitle"), dinnerModel);
	 new dishOverviewView($(".dishes-overview"), dinnerModel);
	 new dishPrintOutView($(".dish-print-out"), dinnerModel);
	


     startMenu();
});


var startMenu = function() {
        document.getElementById("lorem").style.display = "flex";
		document.getElementById("select-dish-grid").style.display = "none";
        document.getElementById("view-dish-grid").style.display = "none";
        document.getElementById("my-dinner-subtitle").style.display = "none";
        document.getElementById("dishes-overview").style.display = "none";
        document.getElementById("dish-print-out").style.display = "none";
}

var selectDish = function() {
        document.getElementById("lorem").style.display = "none";
		document.getElementById("select-dish-grid").style.display = "grid";
        document.getElementById("view-dish-grid").style.display = "none";
        document.getElementById("my-dinner-subtitle").style.display = "none";
        document.getElementById("dishes-overview").style.display = "none";
        document.getElementById("dish-print-out").style.display = "none";
}

var viewDish = function() {
        document.getElementById("lorem").style.display = "none";
		document.getElementById("select-dish-grid").style.display = "none";
        document.getElementById("view-dish-grid").style.display = "grid";
        document.getElementById("my-dinner-subtitle").style.display = "none";
        document.getElementById("dishes-overview").style.display = "none";
        document.getElementById("dish-print-out").style.display = "none";
}

var viewDinnerOverview = function() {
        document.getElementById("lorem").style.display = "none";
		document.getElementById("select-dish-grid").style.display = "none";
        document.getElementById("view-dish-grid").style.display = "none";
        document.getElementById("my-dinner-subtitle").style.display = "flex";
        document.getElementById("dishes-overview").style.display = "flex";
        document.getElementById("dish-print-out").style.display = "none";
}

var viewDinnerPrintOut = function() {
        document.getElementById("lorem").style.display = "none";
		document.getElementById("select-dish-grid").style.display = "none";
        document.getElementById("view-dish-grid").style.display = "none";
        document.getElementById("my-dinner-subtitle").style.display = "flex";
        document.getElementById("dishes-overview").style.display = "none";
        document.getElementById("dish-print-out").style.display = "block";
}
