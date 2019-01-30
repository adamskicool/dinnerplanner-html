	function toggle_visibility_flex(id) {
     var e = document.getElementById(id);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  }


    class homeView {
        constructor(container, model) {
            container.html("<p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut lorem est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer diam ante, commodo id dolor et, hendrerit malesuada ipsum. Nullam rutrum lorem sed arcu commodo rhoncus. Etiam sit amet molestie ligula, id dapibus est. Nullam faucibus ex ac sagittis lacinia. Vestibulum condimentum in purus non gravida. Cras tincidunt auctor erat nec commodo. In at quam at orci malesuada posuere. Sed in augue tempor, bibendum lectus et, euismod dolor. Etiam in molestie nisi, porta vestibulum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum suscipit velit ornare purus faucibus, in maximus diam feugiat.\n</p>\n      <button class=\"button\" onclick=\"selectDish()\">\n        Create new dinner\n      </button>");
        }
    }


    class sideMenuView{
        constructor(container, model) {
            this.myDinner = container.find("#my-dinner");
            this.model = model;

            var dishes = "";
            var fullMenu = this.model.getFullMenu();
            for(var i = 0; i < fullMenu.length; i++) {
                var dish = this.model.getDishPrice(fullMenu[i]);
                dishes += "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+fullMenu[i].name+"</p><p class=\"alignright\">"+dish+"</p></h3>";
            }
            var menuprice = this.model.getTotalMenuPrice();
//            var string = `
//<h3>My Dinner</h3>
//<button class="button" id="collapse-button">\uF8FF</button>
//<div id="people-select">people
//<input type="number" step="1" id="numberOfGuests">
//</div>
//<div id="column-names"><p style="text-align:left;">Dish name<span style="float: right;">Cost</span></p></div>
//<div id="selected-dishes">` + dishes+ `</div>
//<p id="total-cost">`+menuprice+`</p>
//<div style="text-align:center"><button class="button" id="confirm-order">confirm order</button></div>`;
//            this.myDinner.html(string);
//
            //create the components.
            //titeln
            var title = document.createElement('h3');
            title.innerHTML = "My Dinner";
            //knappen vid mobilskärm
            var collapsed_button = document.createElement('button');
            collapsed_button.classList.add("button");
            collapsed_button.id = "collapse-button";
            collapsed_button.innerHTML = "\uF8FF";
            //knappen för att välja antal gäster.
            var people_select_div = document.createElement("div");
            people_select_div.id = "people-select";
            this.people_select_button = document.createElement("input");
            this.people_select_button.type = "number";
            this.people_select_button.step = "1";
						this.people_select_button.min = "1";
						this.people_select_button.value = "1";
            this.people_select_button.id = "numberOfGuests";
            people_select_div.appendChild(this.people_select_button);
            //column names
            var column_names = `<div id="column-names"><p style="text-align:left;">Dish name<span style="float: right;">Cost</span></p></div>`;
            //selected dishes
            var selected_dishes = document.createElement('div');
            selected_dishes.id = "selected-dishes";
            selected_dishes.innertHTML= dishes;
            //totala kostnaden
            var total_cost = document.createElement('p');
            total_cost.id = "total-cost";
            total_cost.innerHTML = menuprice;
            //the div surrounding the confirm button
            var confirm_button_div = document.createElement('div');
            confirm_button_div.style = "text-align:center;";
            this.confirm_button = document.createElement('button');
            this.confirm_button.classList.add("button");
            this.confirm_button.id = "confirm-order";
            this.confirm_button.innerHTML = "confirm order";
            confirm_button_div.appendChild(this.confirm_button);

            //add the components to the html file.
            this.myDinner.append(title);
            this.myDinner.append(collapsed_button);
            this.myDinner.append(people_select_div);
            this.myDinner.append(column_names);
            this.myDinner.append(selected_dishes);
            this.myDinner.append(total_cost);
            this.myDinner.append(confirm_button_div);

            sideMenuViewController(this, this.model);
            //add me as an observer! YAY...
            model.addObserver(this);
        }

        update(model, details) {
					if(details==="guests")
        }
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
