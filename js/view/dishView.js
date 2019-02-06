class dishView {
  constructor(container, model, dish) {
    //image url of this dish
    var url =  'https://spoonacular.com/recipeImages/'+dish.id+'-240x150.jpg';
    this.model = model;
    //Creates an menu item with dish image as background to the element
    this.id = dish.id;
    this.dishImage = document.createElement("div");
    this.dishImage.classList.add("dish");
    this.dishImage.style = "background-image: url(\'" + url+ "\');";
    this.dishName = document.createElement("div");
    this.dishImage.id = this.id;
    this.dishName.classList.add("dish-name");
    this.dishName.innerHTML = dish.title;
    this.dishImage.appendChild(this.dishName);
    container.append(this.dishImage);
    dishViewController(this, this.model);
  }
  update(model, details){

  }
}
