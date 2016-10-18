(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryItemListController', MainCategoryItemListController);


MainCategoryItemListController.$inject = ['items','$stateParams'];
function MainCategoryItemListController(items,$stateParams) {
  var itemList = this;
  itemList.items = items.data.menu_items;
  itemList.categoryName = $stateParams.categoryName;

  // mainList.$onInit = function () {
  //   ShoppingListService.getItems()
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // };
}

})();
