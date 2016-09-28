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
  ShoppingListToBuyService.addItem("cookies","7");
  ShoppingListToBuyService.addItem("cokes","4");
  ShoppingListToBuyService.addItem("fantas","9");
  ShoppingListToBuyService.addItem("chips","4");
  ShoppingListToBuyService.addItem("french fries","3");

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

function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
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

  provider.$get = function () {
    var shoppingList = new ShoppingListService();

    return shoppingList;
  };
}

})();
