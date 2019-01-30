class dishesView {
	constructor (container, model) {
		this.model = model;
		this.dishes = container.find("#dishes");
		model.getEntireMenu().forEach(function(dish) {

    new dishView(dishes, model, dish);
    });
		model.addObserver(this);
	}
	update(model,details) {
		if(details.includes("searchbar")){
			var dishes = this.model.getAllDishes(this.model.getSearchType(), this.model.getSearchInput());
			this.dishes.html("");
			for(var i = 0; i < dishes.length; i++) {
					new dishView(this.dishes, this.model, dishes[i]);
			}
		}
	}
}
