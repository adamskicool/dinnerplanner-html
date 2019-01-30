var dishesView = function (container, model) {
		var string = "";
		var dishes = container.find("#dishes");
		model.getEntireMenu().forEach(function(dish) {
    string +=
       '<div class="dish" style="background-image: url(\'./images/'+dish.image+'\');">' +
       '<div class="dish-name">' +
       dish.name +
       '</div></div>';
    });
		dishes.html(string);
	}