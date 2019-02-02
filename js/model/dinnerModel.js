//DinnerModel Object constructor
var DinnerModel = function() {
    //URLS
    var getDishes = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
    var getDish = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/";
    var getRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information";
    var api_key = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
    
    
    var observers = [];

    this.addObserver = function(observer) {
        observers.push(observer);
    }

    var notifyObservers = function(changeDetails) {
        for(var i=0; i<observers.length; i++) {
            observers[i].update(this, changeDetails);
        }
    }



	//TODO Lab 1 implement the data structure that will hold number of guest
    var numberOfGuests = 1;
	// and selected dishes for the dinner menu
    var selectedDishes = [];


    //for the search bar:
    var searchType = "Main Course";
    var searchInput = "";
    var currentDish = "1";

	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
        notifyObservers("guests");
	}

	this.getNumberOfGuests = function() {
        return numberOfGuests;
	}

    this.setSearchbarInput = function(type, text) {
        searchType = type;
        searchInput = text;
        notifyObservers("searchbar");
    }
  this.getSearchInput = function() {
    return searchInput;
  }

  this.getSearchType = function() {
    return searchType;
  }

  this.setCurrentDish = function(id) {
    currentDish = id;
    notifyObservers("activeDish");
  }

  this.getCurrentDish = function() {
    return currentDish;
  }

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		selectedDishes.forEach(function(element) {
           if(element.type === type) {
               return element;
           } else {
               return null;
           }
        });
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
        return selectedDishes;
	}

    //Return entire menu
    this.getEntireMenu = function() {
        return dishes;
    }

	//Returns all ingredients for all the dishes on the menu.
    //TODO: får det finnas flera av en ingrediens?
	this.getAllIngredients = function() {
		var ingredients = [];
        selectedDishes.forEach(function(dish) {
            dish.ingredients.forEach(function(ingredient) {
                ingredients.push(ingredient);
            });
        });
        return ingredients;
	}

      //Return the price of one dish
      this.getDishPrice = function(dish) {
        var price = 0;
        dish.ingredients.forEach(function(ingredient) {
          price = price + ingredient.price * numberOfGuests;
        });
        return price;
      }

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var price = 0;
        this.getAllIngredients().forEach(function(ingredient) {
            price = price + ingredient.price*numberOfGuests;
        })
        return price;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
        var newDish = this.getDish(id);
        for(var i=0; i<selectedDishes.length; i++) {
            if(selectedDishes[i].type === newDish.type) {
                removeDishFromMenu(selectedDishes[i].id);
            }
        }
        selectedDishes.push(newDish);
        notifyObservers("addedDish");
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
        var parameters = [["number", 30],["query", filter],["type", type]];
        var URL = appendParametersURL(getDishes, parameters);
        
        
        var respons = fetch(URL, {
              headers: {
                  'X-Mashape-Key' : api_key,
                  'Accept' : "application/json"
              }
          }).then(respons => respons.json())
        //returnera en promis som viewen sen hanterar.
        return respons;
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
//	    var url = getDish + id;
//        return fetch(url)
//        .then(respons => respons.json());
//        
        for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}
    
    
    //function that returns a dish of specific ID
	this.getDish2 = function (id) {
        var url = getRecipe.replace("{id}", id);
        return fetch(url , {
              headers: {
                  'X-Mashape-Key' : api_key,
                  'Accept' : "application/json"
              }
        })
        .then(respons => respons.json())
	}
    
    /**
    Append the parameters in the list to the URL correctly...
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
