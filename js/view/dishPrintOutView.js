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
			for(var i = 0; i<this.fullMenu.length;i++){
				this.container.append("<div class=\"dish-print-out-grid\"><div class=\"print-out-image\"><img src=\"images/" + this.fullMenu[i].image +"\"></div><div class=\"print-out-description\"><h3>" + this.fullMenu[i].name + "</h3><p>" + this.fullMenu[i].type +"</p></div><div class=\"print-out-preparation\"><h3>Preparation</h3><p>" + this.fullMenu[i].description+"</p></div></div>");
			}
		}
	}
}
