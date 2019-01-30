 var dishOverviewView = function (container, model) {
	var totalCost = container.find("#cost");
	model.getFullMenu().forEach(function(dish) {
		var price = model.getDishPrice(dish);
		container.prepend("<div class=\"dish-overview\" style=\"background-image: url('./images/" + dish.image+"');\"><div class=\"dish-name\">" + dish.name + "</div><p class=\"dish-price\">" + price +" SEK</p></div>")
	});
	totalCost.append("<h3>" + model.getTotalMenuPrice()+ " SEK</h3>");
  }