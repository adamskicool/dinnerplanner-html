class dishView {
  constructor(container, model, dish) {
    this.id = dish.id;
    this.dishImage = document.createElement("div");
    this.dishImage.classList.add("dish");
    //allt fungerar förutom bilen, antingen så sparar vi bilen i images eller så läser vi den fårn URL.
    //this.dishImage.style = "background-image: url(\'" + dish.image+"\');";//url(\'./images/"+dish.image+"\');"
    this.dishName = document.createElement("div");
    this.dishName.classList.add("dish-name");
    this.dishName.innerHTML = dish.title;
    this.dishImage.appendChild(this.dishName);
    container.append(this.dishImage);
    dishViewController(this, model);
  }
  update(model, details){

  }
}
