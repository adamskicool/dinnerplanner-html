//var dinnerSubtitle = function (container, model) {
//		var string = "<h3>My Dinner: " + model.getNumberOfGuests()+ " People</h3><button class=\"button\" id=\"my-dinner-subtitle-button\" onClick=\"selectDish()\">Edit Dinner</button>";
//		container.html(string);
//	}


class dinnerSubtitle {
    constructor(container, model) {
        this.model = model;
        this.numberOfGuestsMessage = document.createElement('h3');
        this.numberOfGuestsMessage.innerHTML = "My Dinner: " + model.getNumberOfGuests() + " People";
        this.editDinnerButton = document.createElement('button');
        this.editDinnerButton.classList.add("button");
        this.editDinnerButton.id = "my-dinner-subtitle-button";
        this.editDinnerButton.innerHTML = "Edit Dinner";
        container.append(this.numberOfGuestsMessage);
        container.append(this.editDinnerButton);
        //lägg till kontroller för dinner-subtitle
        dinnerSubtitleViewController(this, model);
        model.addObserver(this);
    }
    
    update(model, details) {
        if(details.includes("guests")) {
            this.numberOfGuestsMessage.innerHTML = "My Dinner: " + this.model.getNumberOfGuests() + " People";
        }
    }
}