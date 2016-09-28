(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
//.provider('ShoppingListAlreadyBoughtService', ShoppingListServiceProvider)
.controller('AlreadyBoughtController', AlreadyBoughtController)
//.provider('ShoppingListToBuyService', ShoppingListServiceProvider)
.controller('ToBuyController', ToBuyController)
;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;


  list.items = ShoppingListCheckOffService.getItemsToBuy();

  list.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemToBuy(itemIndex);
  };

  list.boughtItem = function (itemIndex) {
    var item = list.items[itemIndex];
    ShoppingListCheckOffService.addItemBought(item.name,item.quantity);
    list.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getItemsBought();



}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    {name: "cookies", quantity: "7"},
    {name: "cokes", quantity: "4"},
    {name: "fantas", quantity: "9"},
    {name: "chips", quantity: "4"},
    {name: "french fries", quantity: "3"}
  ];
  var itemsBought = [];

  service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsToBuy.push(item);
  };

  service.removeItemToBuy = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.addItemBought = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsBought.push(item);
  };

  service.removeItemBought = function (itemIndex) {
    itemsBought.splice(itemIndex, 1);
  };

  service.getItemsBought = function () {
    return itemsBought;
  };}



})();
