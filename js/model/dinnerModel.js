//DinnerModel Object constructor
var DinnerModel = function() {
    ///URLs for getting resources från Spoonacular API.
    var getDishes = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
    var getDish = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/{id}";
    var getRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information";
    var api_key = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
    //json object that is passed as an argument when using fetch with the Spoonacular API.
    const API_KEY_HEADERS = {
              headers: {
                  'X-Mashape-Key' : api_key,
                  'Accept' : "application/json"
              }
        };

    //list of observers.
    var observers = [];
    
    //add an observer to the model.
    this.addObserver = function(observer) {
        observers.push(observer);
    }
    
    //Notify the observers that something in the model has changed (specfied in changeDetails).
    var notifyObservers = function(changeDetails) {
        for(var i=0; i<observers.length; i++) {
            observers[i].update(this, changeDetails);
        }
    }



	//Keep track of the number of guests.
    var numberOfGuests = 1;
	//Keep track of the dishes that the user has selected.
    var selectedDishes = [];


    //Starting values for the searh bar.
    var searchType = "Main Course";
    var searchInput = "";
    var currentDish = "1";

    //Set the number of guests to the parameter num.
	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
        notifyObservers("guests");
	}


    //Get the number of guests.
	this.getNumberOfGuests = function() {
        return numberOfGuests;
	}

    //Set the search bar input and notify the observers that it has changed.
    this.setSearchbarInput = function(type, text) {
        searchType = type;
        searchInput = text;
        notifyObservers("searchbar");
    }

    //Get the search input (textfield) from search bar.
    this.getSearchInput = function() {
        return searchInput;
    }

    //Get the search type (drop down meny) from the search bar.
    this.getSearchType = function() {
        return searchType;
    }

    //Set the current dish ID to the parameter id and notify the observers that it has changed.
    this.setCurrentDish = function(id) {
        currentDish = id;
        notifyObservers("activeDish");
    }

    ///Get the ID of the current dish.
    this.getCurrentDish = function() {
        return currentDish;
    }

//	//Returns the dish that is on the menu for selected type
//	this.getSelectedDish = function(type) {
//		selectedDishes.forEach(function(element) {
//           if(element.type === type) {
//               return element;
//           } else {
//               return null;
//           }
//        });
//	}

    //Returns all the dishes on the menu (the selected dishes that the user has picked).
	this.getFullMenu = function() {
        return selectedDishes;
	}

//    //Return entire menu
//    this.getEntireMenu = function() {
//        return dishes;
//    }

//	//Returns all ingredients for all the dishes on the menu.
//    //TODO: får det finnas flera av en ingrediens?
//	this.getAllIngredients = function() {
//		var ingredients = [];
//        selectedDishes.forEach(function(dish) {
//            dish.ingredients.forEach(function(ingredient) {
//                ingredients.push(ingredient);
//            });
//        });
//        return ingredients;
//	}


      //Return the price of one dish
      this.getDishPrice = function(dish) {
//        dish.ingredients.forEach(function(ingredient) {
//          price = price + ingredient.price * numberOfGuests;
//        });
        return (dish.pricePerServing * this.getNumberOfGuests()).toFixed(2);
      }

	//Returns the total price of the menu (all the prices of the dishes multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var price = 0;
        selectedDishes.forEach(function(dish) {
            price = price + dish.pricePerServing*numberOfGuests;
        })
        return price.toFixed(2);
	}

	//Adds the passed dish to the menu.
    //NOTE: removed functionality from lab 2:
    //now one can add multiple dishes of the same type, as stated in the lab-specification for lab 3.
	this.addDishToMenu = function(id) {
        var newDish_promise = this.getDish(id);
        newDish_promise.then(dish => addDish(dish))

        var addDish = function(dish) {
            selectedDishes.push(dish)
            notifyObservers("addedDish");
        }
	}

	//Removes dish from menu
	var removeDishFromMenu = function(id) {
		for(var i = 0; i < selectedDishes.length; i++) {
            if(selectedDishes[i].id === id) {
                selectedDishes.splice(i, 1);
            }
        }
	}

    this.svar = "";
    this.getData = function () {
        return this.svar;
    }

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
        //skapa parametrarna.
        var parameters = [["number", 30],["query", filter],["type", type]];
        //fixa url med parametrarna
        var URL = appendParametersURL(getDishes, parameters);
        //skicka iväg en request.
        var respons = fetch(URL, API_KEY_HEADERS).
        then(respons => respons.json())
        //returnera en promis som viewen sen hanterar.
        return respons;
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	    var url = getRecipe.replace("{id}", id);
        return fetch(url, API_KEY_HEADERS)
        .then(respons => respons.json());

//        for(key in dishes){
//			if(dishes[key].id == id) {
//				return dishes[key];
//			}
//		}
	}


    /**
    This function appends the specified parameters in the list 'parameters' to the URL.
    **/
    function appendParametersURL(URL, parameters) {
          //parameters ≈ {[number, 3], [query, "ice"]}
          var newURL = URL + "?";
          for(var i = 0; i < parameters.length; i++) {
              if(i < parameters.length-1) {
                    newURL += parameters[i][0] + "=" + parameters[i][1] + "&";
              } else {
                  newURL += parameters[i][0] + "=" + parameters[i][1];
              }
          }
          return newURL;
      }


	// the dishes variable contains an array of all the
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name,
	// quantity (a number), price (a number) and unit (string
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
