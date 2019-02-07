class dishMoreInfoView {
 		constructor (container, model) {
			this.model = model;
			this.container = container;
            //leta upp de olika containers i DOM.
			this.dishInfo = container.find("#dish-info");
			this.ingredients = container.find("#dish-ingredients");
			this.preparation = container.find("#dish-preparation");
            //skapa knapparna för viewn.
			this.backToSearch = document.createElement("button");
			this.backToSearch.classList.add("button");
			this.backToSearch.innerHTML = "Back to search";
			this.backToSearch.id = "backToSearch";
			this.addToMenu = document.createElement("button");
			this.addToMenu.classList.add("button");
			this.addToMenu.innerHTML = "Add to menu";
			this.addToMenu.id = "addToMenu";
            //lägg till viewn som observer.
			model.addObserver(this);
            //lägg till controller för viewn.
			dishMoreInfoViewController(this, model);
	}

	update(model, details){
		if(details.includes("activeDish")){
			var loading_gif = document.getElementById("loading");
            //vissa loading-gif ...
            loading_gif.style.display = "flex";

            //clear the previous information
            this.dishInfo.html("");
			this.ingredients.html("");
			this.preparation.html("");

            //detta är vad vi vill göra med datan från promisen.
            var dishInfo = function(view, model, dish) {
                //sluta visa loading-gif
                console.log(dish.dishTypes);
                loading_gif.style.display = "none";
                var numberOfGuests = model.getNumberOfGuests();
                //skapa en sträng med information om receptet:
                //1. Bild
                //2. Receptets typer (t.ex. main course, dessert)
                var s = "<h3>" + dish.title + "</h3><img src=\"" + dish.image + "\">";
                for(var i = 0; i < dish.dishTypes.length; i++) {
                    s += "<p>" +dish.dishTypes[i] + "</p>";
                }
                view.dishInfo.prepend(s);
                //lägg till knappen.
                view.dishInfo.append(view.backToSearch);

                //gå igenom ingredienserna och lägg till dessa i ingrediens div:en.
                var ingredients = dish.extendedIngredients;
                for(var i=0; i < ingredients.length; i++) {
                    view.ingredients.prepend("<p>" + ingredients[i].measures.metric.amount + " " + ingredients[i].measures.metric.unitShort+ " " + ingredients[i].name + "</p>");
                }
                view.ingredients.prepend("<h3>Ingredients for " + numberOfGuests + " people:</h3>");
                //lägg till knappen för att lägga till receptet på menyn.
                view.ingredients.append(view.addToMenu);

                //lägg till instruktionerna för hur man lagar receptet.
                //Men endast om det finns instruktioner tillgängliga.
                if(dish.analyzedInstructions.length > 0) {
                    var instructions = dish.analyzedInstructions[0].steps;
                    view.preparation.append("<h3>Preparation</h3>");
                    for(var i = 0; i < instructions.length; i++) {
                        view.preparation.append("<p>" + instructions[i].number + ". " +instructions[i].step + "</p>");
                    }
                } else {
                    //annars skriv ut meddellande att det inte finns några preparation tillgängliga.
                    view.preparation.append("<h3>No Preparation Available</h3>");
                }
            }

            //innan vi gör detta, visa loading gif.
            //dish är en promise.
            var data = this.model.getDish(this.model.getCurrentDish());
            data.then(dish => dishInfo(this, this.model, dish))
            .catch()

		}
	}
}
