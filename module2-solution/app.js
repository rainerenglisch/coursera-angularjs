(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.provider('ShoppingListAlreadyBoughtService', ShoppingListServiceProvider)
.controller('ShoppingListAlreadyBoughtController', ShoppingListAlreadyBoughtController)
.provider('ShoppingListToBuyService', ShoppingListServiceProvider)
.controller('ShoppingListToBuyController', ShoppingListToBuyController)
;

ShoppingListToBuyController.$inject = ['ShoppingListToBuyService','ShoppingListAlreadyBoughtService'];
function ShoppingListToBuyController(ShoppingListToBuyService,ShoppingListAlreadyBoughtService) {
  var list = this;
  ShoppingListToBuyService.addItem("cookies","10");
  ShoppingListToBuyService.addItem("cokes","10");
  ShoppingListToBuyService.addItem("fantas","10");
  ShoppingListToBuyService.addItem("chips","10");
  ShoppingListToBuyService.addItem("french fries","10");

  list.items = ShoppingListToBuyService.getItems();

  list.removeItem = function (itemIndex) {
    ShoppingListToBuyService.removeItem(itemIndex);
  };

  list.boughtItem = function (itemIndex) {
    var item = list.items[itemIndex];
    ShoppingListAlreadyBoughtService.addItem(item.name,item.quantity);
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
    maxItems: undefined
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

})();
