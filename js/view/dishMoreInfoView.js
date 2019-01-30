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