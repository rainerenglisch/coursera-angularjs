(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryItemListController', MainCategoryItemListController);


MainCategoryItemListController.$inject = ['items'];
function MainCategoryItemListController(items) {
  var itemList = this;
  itemList.items = items.data.menu_items;

  // mainList.$onInit = function () {
  //   ShoppingListService.getItems()
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // };
}

})();
