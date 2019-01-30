var dinnerSubtitle = function (container, model) {
		var string = "<h3>My Dinner: " + model.getNumberOfGuests()+ " People</h3>\n<button class=\"button\" id=\"my-dinner-subtitle-button\" onClick=\"selectDish()\">Edit Dinner</button>";
		container.html(string);
	}