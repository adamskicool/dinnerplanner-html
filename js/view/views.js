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
            this.selected_dishes = document.createElement('div');
            this.selected_dishes.id = "selected-dishes";
            this.selected_dishes.innerHTML= dishes;
            //totala kostnaden
            this.total_cost = document.createElement('p');
            this.total_cost.id = "total-cost";
            this.total_cost.innerHTML = menuprice;
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
            this.myDinner.append(this.selected_dishes);
            this.myDinner.append(this.total_cost);
            this.myDinner.append(confirm_button_div);

            sideMenuViewController(this, this.model);
            //add me as an observer! YAY...
            model.addObserver(this);
        }

        update(model, details) {
					if(details.includes("guests")) {
						var dishes = "";
            var fullMenu = this.model.getFullMenu();
            for(var i = 0; i < fullMenu.length; i++) {
                var dish = this.model.getDishPrice(fullMenu[i]);
                dishes += "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+fullMenu[i].name+"</p><p class=\"alignright\">"+dish+"</p></h3>";
            }
            var menuprice = this.model.getTotalMenuPrice();
						this.selected_dishes.innerHTML= dishes;
						this.total_cost.innerHTML=menuprice;
					}
        }
    }

	class searchBarView {
		constructor(container, model){
			this.findDish = container.find("#find-a-dish");
			this.div = document.createElement("div");
			this.textSelector = document.createElement("input");
			this.textSelector.type = "text";
			this.dropDownSelector = document.createElement("select");
			this.dropDownSelector.selected = "All";
			this.option1 = document.createElement("option");
			this.option1.innerHTML = "All";
			this.option2 = document.createElement("option");
			this.option2.innerHTML = "Main Course";
			this.option3 = document.createElement("option");
			this.option3.innerHTML = "Side Dish";
			this.option4 = document.createElement("option");
			this.option4.innerHTML = "Dessert";
			this.option5 = document.createElement("option");
			this.option5.innerHTML = "Appetizer";
			this.searchButton = document.createElement("button");
			this.searchButton.classList.add("button");
			this.searchButton.id = "search";
			this.searchButton.innerHTML = "Search";
			this.dropDownSelector.appendChild(this.option1);
			this.dropDownSelector.appendChild(this.option2);
			this.dropDownSelector.appendChild(this.option3);
			this.dropDownSelector.appendChild(this.option4);
			this.dropDownSelector.appendChild(this.option5);
			if(model.getFullMenu().length >0){
				this.div.append("Select Another");
			}else{
				this.div.append("Select A Dish");
			}
			this.div.appendChild(document.createElement("br"));
			this.div.appendChild(this.textSelector);
			this.div.appendChild(this.dropDownSelector);
			this.div.appendChild(this.searchButton);

			this.findDish.append(this.div);
		}
		update(model, details){

		}
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
