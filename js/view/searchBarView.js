class searchBarView {
		constructor(container, model){
			this.findDish = container.find("#find-a-dish");
			this.div = document.createElement("div");
            this.message = document.createElement("p");
            this.message.id = "message";
			// typing field
			this.textSelector = document.createElement("input");
			this.textSelector.type = "text";
			//Drop down selector with different options
			this.dropDownSelector = document.createElement("select");
			//Default value of the selector
			this.dropDownSelector.selected = "All";
			//Option 1: All
			this.option1 = document.createElement("option");
			this.option1.innerHTML = "All";
			this.option1.id = "";
			//Option 2: Main Course
			this.option2 = document.createElement("option");
			this.option2.innerHTML = "Main Course";
			this.option2.id = "main dish";
			//Option 3: Side dish
			this.option3 = document.createElement("option");
			this.option3.innerHTML = "Side Dish";
			this.option3.id = "side dish";
			//Option 4: Dessert
			this.option4 = document.createElement("option");
			this.option4.innerHTML = "Dessert";
			this.option4.id = "dessert";
			//Option 5: Appetizer
			this.option5 = document.createElement("option");
			this.option5.innerHTML = "Appetizer";
			this.option5.id = "starter";
			//Option 6: Lunch
			this.option6 = document.createElement("option");
			this.option6.innerHTML = "Lunch";
			this.option6.id = "lunch";
			//Option 7: Dinner
			this.option7 = document.createElement("option");
			this.option7.innerHTML = "Dinner";
			this.option7.id = "dinner";
			//Option 8: Breakfast
			this.option8 = document.createElement("option");
			this.option8.innerHTML = "Breakfast";
			this.option8.id = "breakfast";
			//Option 9: Sauce
			this.option9 = document.createElement("option");
			this.option9.innerHTML = "Sauce";
			this.option9.id = "sauce";
			//Option 10: Salad
			this.option10 = document.createElement("option");
			this.option10.innerHTML = "Salad";
			this.option10.id = "salad";
			//Option 11: Drink
			this.option11 = document.createElement("option");
			this.option11.innerHTML = "Drink";
			this.option11.id = "drink";
			//Search button
			this.searchButton = document.createElement("button");
			this.searchButton.classList.add("button");
			this.searchButton.id = "search";
			this.searchButton.innerHTML = "Search";
			//Append the options to the selector
			this.dropDownSelector.appendChild(this.option1);
			this.dropDownSelector.appendChild(this.option2);
			this.dropDownSelector.appendChild(this.option3);
			this.dropDownSelector.appendChild(this.option4);
			this.dropDownSelector.appendChild(this.option5);
			this.dropDownSelector.appendChild(this.option8);
			this.dropDownSelector.appendChild(this.option6);
			this.dropDownSelector.appendChild(this.option7);
			this.dropDownSelector.appendChild(this.option9);
			this.dropDownSelector.appendChild(this.option10);
			this.dropDownSelector.appendChild(this.option11);
			//Choose what to show depends if you already selected a dish or not.
			if(model.getFullMenu().length >0){
				this.message.innerHTML = "Select Another";
			}else{
				this.message.innerHTML = "Select A Dish";
			}
			//Wrap everything in order into a div
      this.div.appendChild(this.message);
			this.div.appendChild(document.createElement("br"));
			this.div.appendChild(this.textSelector);
			this.div.appendChild(this.dropDownSelector);
			this.div.appendChild(this.searchButton);
			//Append the content to html
			this.findDish.append(this.div);
			//Add this view to its controller
      searchBarViewController(this, model);
		}

		update(model, details){
						//Update the text if added new dish.
            if(detail.includes("addedDish")) {
                if(model.getFullMenu().length > 0){
                    this.message.innerHTML = "Select Another";
                }else{
                    this.message.innerHTML = "Select A Dish";
                }
            }
		}
	}
