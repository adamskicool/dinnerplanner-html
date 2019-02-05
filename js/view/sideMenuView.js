class sideMenuView{
        constructor(container, model) {
            this.myDinner = container.find("#my-dinner");
            this.model = model;

            var dishes = "";
            var fullMenu = this.model.getFullMenu();
            for(var i = 0; i < fullMenu.length; i++) {
                var dish = this.model.getDishPrice(fullMenu[i]);
                dishes += "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+fullMenu[i].title+"</p><p class=\"alignright\">"+dish+"</p></h3>";
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
					if(details.includes("guests") || details.includes("addedDish")) {
						var dishes = "";
            var fullMenu = this.model.getFullMenu();
            for(var i = 0; i < fullMenu.length; i++) {
                var dish = this.model.getDishPrice(fullMenu[i]);
                dishes += "<h3 class=\"picked-dish\" style=\"float: left\">"+"<p class=\"alignleft\">"+fullMenu[i].title+"</p><p class=\"alignright\">"+dish+"</p></h3>";
            }
            var menuprice = this.model.getTotalMenuPrice();
						this.selected_dishes.innerHTML= dishes;
						this.total_cost.innerHTML=menuprice;
					}
        }
    }
