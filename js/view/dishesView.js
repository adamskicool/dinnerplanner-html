class dishesView {
	constructor (container, model) {
		this.container = container;
        this.model = model;
		this.dishes = container.find("#dishes");
		model.addObserver(this);
	}
    
	update(model,details) {
		if(details.includes("searchbar")){
			this.dishes.html("");
            var dishes = this.dishes;
            var loading_gif = document.getElementById("loading");
            //vissa loading-gif ...
            loading_gif.style.display = "flex";
                   
            //gå igenom alla alla dishes, lägg till ny dish-view.
            var loop = function(dishesView, model, dishes) {
                //console.log(model);
                for(var i = 0; i < dishes.length; i++) {
                    loading_gif.style.display = "none";
                    new dishView(dishesView.dishes, model, dishes[i]);
                    //console.log(dishes[i]);
                }
            }
            
            //ladda hem informationen
            this.model.getAllDishes(this.model.getSearchType(), this.model.getSearchInput())
            //gå igenom resultaten:
            .then(data => loop(this, this.model, data.results))
            .catch(error =>
            //visa felmeddelande: "server error, please try aggain shortly".
                errorMessage()
            )
            
            var errorMessage = function() {
                loading_gif.style.display = "none";
                alert("Oops something went wrong, please try again!");
            }
		}
	}
}
