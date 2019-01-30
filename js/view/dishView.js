class dishView {
  constructor(container, model, dish) {
    this.id = dish.id;
    this.dishImage = document.createElement("div");
    this.dishImage.classList.add("dish");
    this.dishImage.style = "background-image: url(\'./images/"+dish.image+"\');"
    this.dishName = document.createElement("div");
    this.dishName.classList.add("dish-name");
    this.dishName.innerHTML = dish.name;
    this.dishImage.appendChild(this.dishName);
    container.append(this.dishImage);
    dishViewController(this, model);
  }
  update(model, details){

  }
}
