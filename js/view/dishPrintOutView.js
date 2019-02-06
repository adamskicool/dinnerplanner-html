class dishPrintOutView {
	constructor (container, model) {
		this.model = model;
		this.container = container;
		this.fullMenu = this.model.getFullMenu();
		model.addObserver(this);
		dishPrintOutViewController(this,this.model);
		this.update(model, "addedDish");
	}

	update(model, details) {
		if(details.includes("addedDish")){
			this.container.html("");
			//Loop for every selected dish
			for(var i = 0; i<this.fullMenu.length;i++){
                var types = "";
                var preparation = "";
								// Build a string for all types of current dish
                for(var j = 0; j < this.fullMenu[i].dishTypes.length; j++){
                    types += this.fullMenu[i].dishTypes[j];
                }
								//Build a string for all instruction steps where every step wraps in a <p></p> element.
                for(var j = 0; j < this.fullMenu[i].analyzedInstructions[0].steps.length; j++){
                    preparation += "<p>" + this.fullMenu[i].analyzedInstructions[0].steps[j].number + ". " + this.fullMenu[i].analyzedInstructions[0].steps[j].step + "</p>";
                }

        // Add types and preparation string together with the dish image to the print out part of html       
				this.container.append("<div class=\"dish-print-out-grid\"><div class=\"print-out-image\"><img src=\"" + this.fullMenu[i].image +"\"></div><div class=\"print-out-description\"><h3>" + this.fullMenu[i].title + "</h3><p>" + types +"</p></div><div class=\"print-out-preparation\"><h3>Preparation</h3>" + preparation + "</div></div>");
			}
		}
	}
}
