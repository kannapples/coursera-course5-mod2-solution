(function(){ //IIFE
'use strict';

	angular.module('ShoppingListCheckOff',[])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;

		// get list of items from service
		toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();
			
		// move list item from 'toBuy' to 'alreadyBought'
  		toBuy.moveToAlreadyBought = function (index){
  			//error handling - if tobuy list is empty, display error message
  			try {
  				ShoppingListCheckOffService.moveToAlreadyBought(index);
  			} catch (error) {
  				toBuy.errorMessage = error.message;
  			}
  			
  		};

	};

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var alreadyBought = this;
		// get list of items from service
		alreadyBought.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
		
		//error handling - if alreadyboughtlist is empty, display error message
		try {
			ShoppingListCheckOffService.checkForEmptyList();
		} catch(error) {
			alreadyBought.alreadyBoughtList.errorMessage = error.message;
		}
  		
	};

	function ShoppingListCheckOffService() {
		var service = this;

		// List of shopping items, visibile only within function
		// prepopulate with at least 5 items
  		var toBuyList = [
  			{
  				name: "cookies",
  				quantity: 10
  			}, {
  				name: "sodas",
  				quantity: 5
  			}, {
  				name: "peanuts",
  				quantity: 2
  			}, {
  				name: "cans of soup",
  				quantity: 12
  			}, {
  				name: "bags of cheetos",
  				quantity: 2
  			}, {
  				name: "loaf of bread",
  				quantity: 1
  			}
  		];

  		//List of bought items, visible only within function
  		var alreadyBoughtList = []

  		// expose shopping list to global context
  		service.getToBuyList = function () {
  			return toBuyList; 	
    	};

    	// expose bought list to global context
  		service.getAlreadyBoughtList = function () {
  			return alreadyBoughtList;
    	};

    	// check if alreadyBoughtList has a length of zero. If so, throw error. Otherwise, empty error message.
    	service.checkForEmptyList = function () {
    		if (alreadyBoughtList.length == 0) {
    			throw new Error("Nothing bought yet.");
    		} else {
    			alreadyBoughtList.errorMessage = "";
    		}
    	}

    	//move item from 'to buy' to 'already bought'
    	service.moveToAlreadyBought = function(index) {
    		//save the item in a variable so we can add it to already bought list
    		var shoppingListItem = toBuyList[index];

    		//add item to alreadyBoughtList
    		alreadyBoughtList.push(shoppingListItem);

    		//delete item from toBuyList
    		toBuyList.splice(index, 1);

    		// error handling - if toBuyList has length zero, display error message
    		if (toBuyList.length == 0 ){
    			throw new Error("Everything is bought!")
    		}

    		// check to see if 'bought' list is no longer zero
    		service.checkForEmptyList();

    	};
  	};	
})();