class dishOverviewView {
  constructor (container, model) {
  this.model = model;
  this.container = container;
	this.totalCost = container.find("#cost");
  this.dishes = container.find("#dishes-overview-dishes");
  this.printRecipe = container.find("#print-recipe");
  this.printFullRecipeButton = document.createElement("button");
  this.printFullRecipeButton.classList.add("button");
  this.printFullRecipeButton.innerHTML = "Print Full Recipe";
  this.printRecipe.append(this.printFullRecipeButton);
  this.update(model, "addedDish");
  model.addObserver(this);
  dishOverviewViewController(this, this.model);
  }

  update(model, details){
    if(details.includes("addedDish") || details.includes("guests")){
      this.totalCost.html("");
      this.dishes.html("");
      var fullMenu = this.model.getFullMenu();
      for(var i=0; i<fullMenu.length;i++){
    		var price = this.model.getDishPrice(fullMenu[i]);
    		this.dishes.prepend("<div class=\"dish-overview\" style=\"background-image: url('" + fullMenu[i].image+"');\"><div class=\"dish-name\">" + fullMenu[i].title + "</div><p class=\"dish-price\">" + price +" SEK</p></div>")
      }
      this.totalCost.append("<h3>" + this.model.getTotalMenuPrice()+ " SEK</h3>");
    }
  }

}
