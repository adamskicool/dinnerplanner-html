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
			this.dishes.html("");
            var dishes = this.dishes;
            //vissa loading-gif ...
            
            //ladda hem informationen
            this.model.getAllDishes(this.model.getSearchType(), this.model.getSearchInput())
            //gå igenom resultaten:
            .then(data => data.results.forEach(function(dish) {
                new dishView(dishes, model, dish);
                console.log(dish);
            }))
            .catch(
            //visa felmeddelande: "server error, please try aggain shortly".
            )
            
            
//            var dishes = this.model.getAllDishes(this.model.getSearchType(), this.model.getSearchInput());
//            console.log(dishes);
//			this.dishes.html("");
//			for(var i = 0; i < dishes.length; i++) {
//					new dishView(this.dishes, this.model, dishes[i]);
//			}
		}
	}
    
}
