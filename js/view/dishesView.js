var dishesView = function (container, model) {
		var dishes = container.find("#dishes");
		model.getEntireMenu().forEach(function(dish) {

    new dishView(dishes, model, dish);
    });
	}
