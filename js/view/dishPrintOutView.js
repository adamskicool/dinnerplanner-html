var dishPrintOutView = function(container, model) {
		var string = "";
		model.getFullMenu().forEach(function(dish) {
			string += "<div class=\"dish-print-out-grid\"><div class=\"print-out-image\"><img src=\"images/" + dish.image +"\"></div><div class=\"print-out-description\"><h3>" + dish.name + "</h3><p>" + dish.type +"</p></div><div class=\"print-out-preparation\"><h3>Preparation</h3><p>" + dish.description+"</p></div></div>";
		});
		container.html(string);
	}