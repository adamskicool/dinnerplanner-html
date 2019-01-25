/** ExampleView Object constructor
 *
 * This object represents the code for one specific view (in this case the Example view).
 *
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally)
 * - populating the view with the data
 * - updating the view when the data changes
 *
 * You should create a view Object like this for every view in your UI.
 *
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var ExampleView = function (container, model) {

	/**
	 * We use the @method find() on @var {jQuery object} container to look for various elements
	 * inside the view in orther to use them later on. For instance:
	 *
	 * @var {jQuery object} numberOfGuests is a reference to the <span> element that
	 * represents the placeholder for where we want to show the number of guests. It's
	 * a reference to HTML element (wrapped in jQuery object for added benefit of jQuery methods)
	 * and we can use it to modify <span>, for example to populate it with dynamic data (for now
	 * only 'Hello world', but you should change this by end of Lab 1).
	 *
	 * We use variables when we want to make the reference private (only available within) the
	 * ExampleView.
	 *
	 * IMPORTANT: Never use $('someSelector') directly in the views. Always use container.find
	 * or some other way of searching only among the containers child elements. In this way you
	 * make your view code modular and ensure it dosn't break if by mistake somebody else
	 * in some other view gives the same ID to another element.
	 *
	 */
	var numberOfGuests = container.find("h3");

	/**
	 * When we want references to some view elements to be available from outside of view, we
	 * define them as this.someName. We don't need this in Lab 1 yet, but in Lab 2 it
	 * will be important for assigning listeners to these buttons, because the listeners
	 * should not be assigned in the view, but rather in controller.
	 *
	 * We can then, in some other code, use exampleView.plusButton to reference the
	 * this button and do something with it (see Lab 2).
	 *
	 */
	//this.plusButton = container.find("#plusGuest");
	//this.minusButton = container.find("#minusGuest");

	/**
	 * Here we use @var {jQuery object} numberOfGuests that is a reference to <span>
	 * in our view to dynamically set it's value to "Hello World".
	 */
	numberOfGuests.html("Hejsan det funkar!");

}


var SelectDishView = function (container, model) {
    var dishes = container.find("#dishes");
    //fyll på dishes med det från selectedDishes i model.
    model.getEntireMenu().forEach(function(dish) {
    dishes.append(
       '<div class="dish" style="background-image: url(\'./images/'+dish.image+'\');">' +
       '<div class="dish-name">' +
       dish.name +
       '</div></div>');
    });
}

var OneDishSelectedView = function (container, model) {
    model.addDishToMenu(1);
    var selected_dishes = container.find("#selected-dishes");
    var total_cost = container.find("#total-cost");
    var cost = 0;
    model.getFullMenu().forEach(function(dish) {
        var name = dish.name;
        var price = 0;
        dish.ingredients.forEach(function(ingredient) {
           price += ingredient.price*model.getNumberOfGuests();
        });
        cost += price;
        selected_dishes.append(
            "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+name+"</p><p class=\"alignright\">"+price+"</p></h3>"
        );
    });
    total_cost.html(""+cost+" SEK");

}

	var viewDishViewOld = function (container, model) {
		var dishId = 2;
		var dish = model.getDish(dishId);
		var dishInfo = container.find("#dish-info");
		var ingredients = container.find("#dish-ingredients");
		var preparation = container.find("#dish-preparation");
		var numberOfGuests = model.getNumberOfGuests();
		dishInfo.prepend("<h3>" + dish.name +"</h3><img src=\"images/" + dish.image+"\"><p>" +dish.type +"</p>")
		dish.ingredients.forEach(function (ingredient) {
			ingredients.prepend("<p>" + ingredient.quantity + " "+ ingredient.unit+ " "+ingredient.name + " SEK "+ ingredient.price*numberOfGuests + "</p>");
		});
		ingredients.prepend("<h3>Ingredients for " +numberOfGuests+ " people:</h3>");
		preparation.append("<p>"+dish.description+"</p>");

	}

	var dinnerOverviewViewOld = function (container, model) {
		var dinnerSubtitle = container.find("#my-dinner-subtitle");
		var dishesOverview = container.find("#dishes-overview");
		var totalCost = container.find("#cost");
		var numberOfGuests = model.getNumberOfGuests();
		var dishesToAdd = [1,2,3,100,101,102,103,200];
		dinnerSubtitle.prepend("<h3>My Dinner: " + numberOfGuests+ " People</h3>");
		dishesToAdd.forEach(function(dish) {
			model.addDishToMenu(dish);
		});
		model.getFullMenu().forEach(function(dish) {
			var price = model.getDishPrice(dish);
			dishesOverview.prepend("<div class=\"dish-overview\" style=\"background-image: url('./images/" + dish.image+"');\"><div class=\"dish-name\">" + dish.name + "</div><p class=\"dish-price\">" + price +" SEK</p></div>")
		});
		totalCost.append("<h3>" + model.getTotalMenuPrice()+ " SEK</h3>");

	}

	var dishPrintOutViewOld = function (container, model) {
		var dishPrintOut = container.find("#dish-print-out");
		var dinnerSubtitle = container.find("#my-dinner-subtitle");
		var dishesToAdd = [1,2,3,100,101,102,103,200];
		dinnerSubtitle.prepend("<h3>My Dinner: " + model.getNumberOfGuests()+ " People</h3>");
		dishesToAdd.forEach(function(dish) {
			model.addDishToMenu(dish);
		});
		model.getFullMenu().forEach(function(dish) {
			dishPrintOut.append("<div class=\"dish-print-out-grid\"><div class=\"print-out-image\"><img src=\"images/" + dish.image +"\"></div><div class=\"print-out-description\"><h3>" + dish.name + "</h3><p>" + dish.type +"</p></div><div class=\"print-out-preparation\"><h3>Preparation</h3><p>" + dish.description+"</p></div></div>");
		});
	}

	function toggle_visibility_flex(id) {
     var e = document.getElementById(id);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  }

	var homeView = function (container, model) {
		container.html("<p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut lorem est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer diam ante, commodo id dolor et, hendrerit malesuada ipsum. Nullam rutrum lorem sed arcu commodo rhoncus. Etiam sit amet molestie ligula, id dapibus est. Nullam faucibus ex ac sagittis lacinia. Vestibulum condimentum in purus non gravida. Cras tincidunt auctor erat nec commodo. In at quam at orci malesuada posuere. Sed in augue tempor, bibendum lectus et, euismod dolor. Etiam in molestie nisi, porta vestibulum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum suscipit velit ornare purus faucibus, in maximus diam feugiat.\n</p>\n      <button class=\"button\" onclick=\"selectDish()\">\n        Create new dinner\n      </button>");
        
	}


	var sideMenuView = function (container, model) {
		var myDinner = container.find("#my-dinner");
		var dishes = "";
		model.getFullMenu().forEach(function(dish) {
    	dishes += "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+dish.name+"</p><p class=\"alignright\">"+model.getDishPrice(dish)+"</p></h3>";
		});
		var string = "<h3>My Dinner</h3>\n  <button class=\"button\" id=\"collapse-button\">\uF8FF</button>\n  <div id=\"people-select\">\n    people\n    <input type=\"number\" step=\"1\" id=\"numberOfGuests\">\n  </div>\n  <div id=\"column-names\">\n    <p style=\"text-align:left;\">Dish name\n      <span style=\"float: right;\">Cost</span>\n    </p>\n  </div>\n  <div id=\"selected-dishes\">\n" + dishes+"  </div>\n  <p id=\"total-cost\">"+model.getTotalMenuPrice()+"</p>\n  <div style=\"text-align:center\">\n    <button class=\"button\" id=\"confirm-order\" onClick=\"viewDinnerOverview()\">confirm order</button>";
		myDinner.html(string);
	}

	var searchBarView = function (container, model) {
		var findDish = container.find("#find-a-dish");
		var string = "\n      <div>\n        <input type=\"text\">\n        <select selected=\"All\">\n          <option>All</option>\n          <option>Main Course</option>\n          <option>Side Dish</option>\n          <option>Dessert</option>\n          <option>Appetizer</option>\n          <option>...</option>\n        </select>\n        <button class=\"button\" id=\"search\">Search</button>\n      </div>";
		if(model.getFullMenu().length >0){
			string = "Select Another" + string;
		}else{
			string = "Select A Dish" + string;
		}
		findDish.html(string);
	}

	var dishesView = function (container, model) {
		var string = "";
		var dishes = container.find("#dishes");
		model.getEntireMenu().forEach(function(dish) {
    string +=
       '<div class="dish" style="background-image: url(\'./images/'+dish.image+'\');">' +
       '<div class="dish-name">' +
       dish.name +
       '</div></div>';
    });
		dishes.html(string);
	}

	var dishMoreInfoView = function (container, model) {
			var dishId = 2;
			var dish = model.getDish(dishId);
			var dishInfo = container.find("#dish-info");
			var ingredients = container.find("#dish-ingredients");
			var preparation = container.find("#dish-preparation");
			var numberOfGuests = model.getNumberOfGuests();
			dishInfo.prepend("<h3>" + dish.name +"</h3><img src=\"images/" + dish.image+"\"><p>" +dish.type +"</p>")
			dish.ingredients.forEach(function (ingredient) {
				ingredients.prepend("<p>" + ingredient.quantity + " "+ ingredient.unit+ " "+ingredient.name + " SEK "+ ingredient.price*numberOfGuests + "</p>");
			});
			ingredients.prepend("<h3>Ingredients for " +numberOfGuests+ " people:</h3>");
			preparation.append("<p>"+dish.description+"</p>");
	}

	var dinnerSubtitle = function (container, model) {
		var string = "<h3>My Dinner: " + model.getNumberOfGuests()+ " People</h3>\n<button class=\"button\" id=\"my-dinner-subtitle-button\" onClick=\"selectDish()\">Edit Dinner</button>";
		container.html(string);
	}

  var dishOverviewView = function (container, model) {
	var totalCost = container.find("#cost");
	model.getFullMenu().forEach(function(dish) {
		var price = model.getDishPrice(dish);
		container.prepend("<div class=\"dish-overview\" style=\"background-image: url('./images/" + dish.image+"');\"><div class=\"dish-name\">" + dish.name + "</div><p class=\"dish-price\">" + price +" SEK</p></div>")
	});
	totalCost.append("<h3>" + model.getTotalMenuPrice()+ " SEK</h3>");
  }

	var dishPrintOutView = function(container, model) {
		var string = "";
		model.getFullMenu().forEach(function(dish) {
			string += "<div class=\"dish-print-out-grid\"><div class=\"print-out-image\"><img src=\"images/" + dish.image +"\"></div><div class=\"print-out-description\"><h3>" + dish.name + "</h3><p>" + dish.type +"</p></div><div class=\"print-out-preparation\"><h3>Preparation</h3><p>" + dish.description+"</p></div></div>";
		});
		container.html(string);
	}