(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ShoppingListToBuyController', ShoppingListToBuyController)
.controller('ShoppingListAlreadyBoughtController', ShoppingListAlreadyBoughtController)
.provider('ShoppingListToBuyService', ShoppingListServiceProvider)
.provider('ShoppingListAlreadyBoughtService', ShoppingListServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  // Save Yaakov from himself
  ShoppingListServiceProvider.defaults.maxItems = 2;
}


ShoppingListToBuyController.$inject = ['ShoppingListToBuyService','ShoppingListAlreadyBoughtController'];
function ShoppingListToBuyController(ShoppingListToBuyService, ShoppingListAlreadyBoughtController) {
  var list = this;

  list.items = ShoppingListToBuyService.getItems();

  // list.itemName = "";
  // list.itemQuantity = "";
  //
  // // list.addItem = function () {
  //   try {
  //     ShoppingListToBuyService.addItem(list.itemName, list.itemQuantity);
  //   } catch (error) {
  //     list.errorMessage = error.message;
  //   }
  // };

  list.removeItem = function (itemIndex) {
    ShoppingListToBuyService.removeItem(itemIndex);
  };

  list.boughtItem = function (itemIndex) {
    ShoppingListAlreadyBoughtController.addItem(list.items[itemIndex]);
    list.removeItem(itemIndex);
  };
}

ShoppingListAlreadyBoughtController.$inject = ['ShoppingListAlreadyBoughtService'];
function ShoppingListAlreadyBoughtController(ShoppingListAlreadyBoughtService) {
  var list = this;

  list.items = ShoppingListAlreadyBoughtService.getItems();

  list.addItem = function (name, quantity) {
    try {
      ShoppingListAlreadyBoughtService.addItem(name, quantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  // list.removeItem = function (itemIndex) {
  //   ShoppingListToBuyService.removeItem(itemIndex);
  // };

}

// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

})();
