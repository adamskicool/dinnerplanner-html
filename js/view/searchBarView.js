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
			//Option 3: Dessert
			this.option4 = document.createElement("option");
			this.option4.innerHTML = "Dessert";
			this.option4.id = "dessert";
			//Option 4: Appetizer
			this.option5 = document.createElement("option");
			this.option5.innerHTML = "Appetizer";
			this.option5.id = "starter";
			//Search button
			this.searchButton = document.createElement("button");
			this.searchButton.classList.add("button");
			this.searchButton.id = "search";
			this.searchButton.innerHTML = "Search";
			//Append the options to the selector
			this.dropDownSelector.appendChild(this.option1);
			this.dropDownSelector.appendChild(this.option2);
			this.dropDownSelector.appendChild(this.option4);
			this.dropDownSelector.appendChild(this.option5);
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
