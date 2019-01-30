class dishMoreInfoView {
 		constructor (container, model) {
			this.model = model;
			this.container = container;
			var dish = model.getDish(model.getCurrentDish());
			this.dishInfo = container.find("#dish-info");
			this.ingredients = container.find("#dish-ingredients");
			this.preparation = container.find("#dish-preparation");
			this.backToSearch = document.createElement("button");
			this.backToSearch.classList.add("button");
			this.backToSearch.innerHTML = "Back to search";
			this.backToSearch.id = "backToSearch";
			this.addToMenu = document.createElement("button");
			this.addToMenu.classList.add("button");
			this.addToMenu.innerHTML = "Add to menu";
			this.addToMenu.id = "addToMenu";
			model.addObserver(this);
			this.update(model,"activeDish");
			dishMoreInfoViewController(this, model);
	}

	update(model, details){
		if(details.includes("activeDish")){
			this.dishInfo.html("");
			this.ingredients.html("");
			this.preparation.html("");
			var dish = this.model.getDish(this.model.getCurrentDish());
			this.dishInfo = this.container.find("#dish-info");
			this.ingredients = this.container.find("#dish-ingredients");
			this.preparation = this.container.find("#dish-preparation");
			var numberOfGuests = this.model.getNumberOfGuests();
			this.dishInfo.append(this.backToSearch);
			this.dishInfo.prepend("<h3>" + dish.name +"</h3><img src=\"images/" + dish.image+"\"><p>" +dish.type +"</p>");
			for(var i=0; i<dish.ingredients.length; i++) {
				this.ingredients.prepend("<p>" + dish.ingredients[i].quantity + " "+ dish.ingredients[i].unit+ " "+dish.ingredients[i].name + " SEK "+ dish.ingredients[i].price*numberOfGuests + "</p>");
			}
			this.ingredients.prepend("<h3>Ingredients for " +numberOfGuests+ " people:</h3>");
			this.ingredients.append(this.addToMenu);
			this.preparation.append("<h3>Preparation</h3><p>"+dish.description+"</p>");

		}
	}
}
