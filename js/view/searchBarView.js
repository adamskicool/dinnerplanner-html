class searchBarView {
		constructor(container, model){
			this.findDish = container.find("#find-a-dish");
			this.div = document.createElement("div");
            this.message = document.createElement("p");
            this.message.id = "message";
			this.textSelector = document.createElement("input");
			this.textSelector.type = "text";
			this.dropDownSelector = document.createElement("select");
			this.dropDownSelector.selected = "Main Course";
			this.option2 = document.createElement("option");
			this.option2.innerHTML = "Main Course";
			this.option2.id = "main dish";
			this.option4 = document.createElement("option");
			this.option4.innerHTML = "Dessert";
			this.option4.id = "dessert";
			this.option5 = document.createElement("option");
			this.option5.innerHTML = "Appetizer";
			this.option5.id = "starter";
			this.searchButton = document.createElement("button");
			this.searchButton.classList.add("button");
			this.searchButton.id = "search";
			this.searchButton.innerHTML = "Search";
			this.dropDownSelector.appendChild(this.option2);
			this.dropDownSelector.appendChild(this.option4);
			this.dropDownSelector.appendChild(this.option5);
			if(model.getFullMenu().length >0){
				this.message.innerHTML = "Select Another";
			}else{
				this.message.innerHTML = "Select A Dish";
			}
            this.div.appendChild(this.message);
			this.div.appendChild(document.createElement("br"));
			this.div.appendChild(this.textSelector);
			this.div.appendChild(this.dropDownSelector);
			this.div.appendChild(this.searchButton);

			this.findDish.append(this.div);
            searchBarViewController(this, model);
		}

		update(model, details){
            if(detail.includes("dishes")) {
                if(model.getFullMenu().length > 0){
                    this.message.innerHTML = "Select Another";
                }else{
                    this.message.innerHTML = "Select A Dish";
                }
            }
		}
	}
